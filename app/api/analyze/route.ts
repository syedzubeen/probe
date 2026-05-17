import { NextRequest, NextResponse } from 'next/server';
import { fetchPRDiff } from '@/lib/github';
import { analyzePRWithRetry } from '@/lib/bob';
import { analysisCache } from '@/lib/cache';
import { parseGitHubUrl } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repo: repoInput, pr_number } = body;

    if (!repoInput || !pr_number) {
      return NextResponse.json(
        { error: 'Missing repo or pr_number parameter' },
        { status: 400 }
      );
    }

    // Parse and validate GitHub URL
    const repo = parseGitHubUrl(repoInput);
    const [owner, repoName] = repo.split('/');

    // Check cache first
    const cachedAnalysis = analysisCache.get(repo, pr_number);
    if (cachedAnalysis) {
      return NextResponse.json({
        repo,
        pr_number,
        analysis: cachedAnalysis,
        cached: true,
      });
    }

    // Fetch PR diff and metadata
    const prData = await fetchPRDiff(owner, repoName, pr_number);

    // Prepare file list
    const fileList = prData.files.map(f => f.filename);

    // Truncate diff if too large (Bob has token limits)
    let diff = prData.diff;
    const maxDiffLength = 50000; // ~50KB
    if (diff.length > maxDiffLength) {
      diff = diff.substring(0, maxDiffLength) + '\n\n[... diff truncated due to size ...]';
    }

    // Call Bob for analysis with retry
    const analysis = await analyzePRWithRetry(
      repo,
      prData.title,
      prData.body,
      fileList,
      diff,
      prData.stats
    );

    // Cache the result
    analysisCache.set(repo, pr_number, analysis);

    return NextResponse.json({
      repo,
      pr_number,
      analysis,
      cached: false,
    });
  } catch (error: any) {
    console.error('Error analyzing PR:', error);
    
    // Return more specific error messages
    let errorMessage = error.message || 'Failed to analyze pull request';
    let statusCode = 500;

    if (error.message.includes('not found')) {
      statusCode = 404;
    } else if (error.message.includes('rate limit')) {
      statusCode = 429;
    } else if (error.message.includes('credentials')) {
      statusCode = 503;
      errorMessage = 'Bob AI service is not configured. Please contact the administrator.';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}

// Optional: GET endpoint to check if analysis is cached
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const repoInput = searchParams.get('repo');
    const prNumber = searchParams.get('pr_number');

    if (!repoInput || !prNumber) {
      return NextResponse.json(
        { error: 'Missing repo or pr_number parameter' },
        { status: 400 }
      );
    }

    const repo = parseGitHubUrl(repoInput);
    const cached = analysisCache.has(repo, parseInt(prNumber));

    return NextResponse.json({
      repo,
      pr_number: parseInt(prNumber),
      cached,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

// Made with Bob
