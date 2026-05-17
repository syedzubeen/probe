import { BobAnalysis } from '@/types';

/**
 * Get IBM Watson ML access token
 */
async function getWatsonAccessToken(apiKey: string): Promise<string> {
  const response = await fetch('https://iam.cloud.ibm.com/identity/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`,
  });

  if (!response.ok) {
    throw new Error(`Failed to get Watson ML access token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Generate unified prompt for PR analysis
 */
function generateBobPrompt(
  repo: string,
  title: string,
  body: string,
  files: string[],
  diff: string
): string {
  return `You are a senior software engineer reviewing a GitHub Pull Request. Analyze the PR diff and repository context below and return a single JSON object with all analysis fields. Return ONLY valid JSON, no markdown, no explanation.

Repository: ${repo}
PR Title: ${title}
PR Description: ${body || 'No description provided'}
Files Changed: ${files.join(', ')}

PR Diff:
${diff}

Return this exact JSON structure:
{
  "summary": "2-3 sentence plain English explanation of what this PR does, written for a non-technical stakeholder",
  "refactor_score": <integer 0-100>,
  "refactor_tier": "<high|medium|low>",
  "refactor_reasons": ["<reason 1>", "<reason 2>", "<reason 3>"],
  "test_coverage": {
    "verdict": "<gaps_found|well_covered>",
    "gaps": [
      { "file": "<filename>", "function": "<function name>", "severity": "<high|medium|low>" }
    ]
  },
  "security": {
    "overall_severity": "<critical|high|medium|low|clear>",
    "vulnerabilities": [
      { "package": "<name>", "version": "<version>", "cve": "<CVE-ID>", "description": "<1 line>", "severity": "<critical|high|medium|low>", "nvd_url": "<url>" }
    ],
    "secrets": [
      { "file": "<path>", "line": <number>, "type": "<type>", "preview": "<redacted>" }
    ],
    "insecure_patterns": [
      { "file": "<path>", "issue": "<description>" }
    ]
  },
  "pr_size": {
    "files_changed": <number>,
    "lines_added": <number>,
    "lines_removed": <number>,
    "size_warning": <true|false>,
    "mixed_concerns": <true|false>,
    "concerns_detected": ["<concern>"],
    "split_suggestion": "<suggestion or null>"
  },
  "labels": [
    { "label": "<label>", "confidence": "<high|medium|low>" }
  ]
}

Important guidelines:
- For refactor_score: 0-39 is low (clean code), 40-74 is medium (optional refactor), 75-100 is high (strongly consider refactoring)
- Check for cyclomatic complexity, function length (>50 lines), duplication, SRP violations, nesting depth (>4 levels)
- For test_coverage: cross-reference changed files against test files (look for _test, .test, .spec patterns)
- For security: scan for hardcoded secrets (API keys, tokens, passwords), vulnerable dependencies, SQL injection patterns
- For pr_size: trigger size_warning if >15 files OR >500 lines changed
- For mixed_concerns: detect if PR contains multiple types (bug fix + feature + refactor + config + dependency update)
- For labels: choose from: bug fix, feature, refactor, breaking change, chore, documentation, dependency update, security fix`;
}

/**
 * Call IBM Watson ML API for PR analysis using Granite model
 */
export async function analyzePRWithBob(
  repo: string,
  title: string,
  body: string,
  files: string[],
  diff: string,
  stats: { additions: number; deletions: number; changed_files: number }
): Promise<BobAnalysis> {
  const watsonUrl = process.env.WATSON_ML_URL || process.env.BOB_API_URL;
  const watsonApiKey = process.env.WATSON_ML_API_KEY || process.env.BOB_API_KEY;
  const modelId = process.env.WATSON_ML_MODEL_ID || 'ibm/granite-13b-chat-v2';
  const projectId = process.env.WATSON_ML_PROJECT_ID;

  if (!watsonUrl || !watsonApiKey) {
    throw new Error('IBM Watson ML credentials not configured. Please set WATSON_ML_URL and WATSON_ML_API_KEY in .env.local');
  }

  const prompt = generateBobPrompt(repo, title, body, files, diff);

  try {
    // Get access token
    const accessToken = await getWatsonAccessToken(watsonApiKey);

    // Prepare the request body for Watson ML
    const requestBody: any = {
      input: `<|system|>
You are a senior software engineer performing code reviews. Always respond with valid JSON only, no markdown formatting.
<|user|>
${prompt}
<|assistant|>`,
      parameters: {
        decoding_method: 'greedy',
        max_new_tokens: 4000,
        min_new_tokens: 0,
        stop_sequences: [],
        repetition_penalty: 1.0,
      },
      model_id: modelId,
    };

    // Add project_id if provided
    if (projectId) {
      requestBody.project_id = projectId;
    }

    // Call Watson ML text generation API
    const response = await fetch(`${watsonUrl}/ml/v1/text/generation?version=2023-05-29`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`IBM Watson ML API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Extract content from Watson ML response
    let analysisText = data.results?.[0]?.generated_text || '';
    
    // Try to extract JSON if wrapped in markdown code blocks
    const jsonMatch = analysisText.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (jsonMatch) {
      analysisText = jsonMatch[1];
    }

    // Parse the JSON response
    const analysis: BobAnalysis = JSON.parse(analysisText);

    // Validate required fields
    if (!analysis.summary || typeof analysis.refactor_score !== 'number') {
      throw new Error('Invalid analysis response: missing required fields');
    }

    // Ensure pr_size has actual stats
    analysis.pr_size.files_changed = stats.changed_files;
    analysis.pr_size.lines_added = stats.additions;
    analysis.pr_size.lines_removed = stats.deletions;

    return analysis;
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse AI response as JSON. The AI may have returned malformed data.');
    }
    throw error;
  }
}

/**
 * Retry wrapper for analysis with exponential backoff
 */
export async function analyzePRWithRetry(
  repo: string,
  title: string,
  body: string,
  files: string[],
  diff: string,
  stats: { additions: number; deletions: number; changed_files: number },
  maxRetries = 2
): Promise<BobAnalysis> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await analyzePRWithBob(repo, title, body, files, diff, stats);
    } catch (error: any) {
      lastError = error;
      
      // Don't retry on certain errors
      if (error.message.includes('credentials not configured') || 
          error.message.includes('401') ||
          error.message.includes('403')) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Failed to analyze PR after multiple attempts');
}

// Made with Bob
