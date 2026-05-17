import { Octokit } from '@octokit/rest';
import { GitHubPR } from '@/types';

const octokit = new Octokit({
  // Add auth token if needed for private repos or higher rate limits
  auth: process.env.GITHUB_TOKEN,
});

/**
 * Fetch open pull requests for a repository
 */
export async function fetchPullRequests(owner: string, repo: string): Promise<GitHubPR[]> {
  try {
    const { data } = await octokit.pulls.list({
      owner,
      repo,
      state: 'open',
      per_page: 100,
    });

    return data.map((pr) => ({
      number: pr.number,
      title: pr.title,
      author: pr.user?.login || 'unknown',
      avatar: pr.user?.avatar_url || '',
      files_changed: 0, // Will be fetched separately if needed
      created_at: pr.created_at,
      url: pr.html_url,
      state: pr.state,
    }));
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error('Repository not found. Please check the URL and try again.');
    }
    if (error.status === 403) {
      throw new Error('GitHub rate limit exceeded. Please try again later or add a GitHub token.');
    }
    throw new Error(`Failed to fetch pull requests: ${error.message}`);
  }
}

/**
 * Fetch PR diff and metadata
 */
export async function fetchPRDiff(owner: string, repo: string, prNumber: number) {
  try {
    // Fetch PR metadata
    const { data: pr } = await octokit.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
    });

    // Fetch PR diff
    const { data: diff } = await octokit.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
      mediaType: {
        format: 'diff',
      },
    });

    // Fetch files changed
    const { data: files } = await octokit.pulls.listFiles({
      owner,
      repo,
      pull_number: prNumber,
    });

    return {
      title: pr.title,
      body: pr.body || '',
      diff: diff as unknown as string,
      files: files.map((f) => ({
        filename: f.filename,
        status: f.status,
        additions: f.additions,
        deletions: f.deletions,
        changes: f.changes,
      })),
      stats: {
        additions: pr.additions,
        deletions: pr.deletions,
        changed_files: pr.changed_files,
      },
    };
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error('Pull request not found.');
    }
    if (error.status === 403) {
      throw new Error('GitHub rate limit exceeded. Please try again later.');
    }
    throw new Error(`Failed to fetch PR diff: ${error.message}`);
  }
}

/**
 * Fetch repository file tree (for context)
 */
export async function fetchRepoTree(owner: string, repo: string) {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: '',
    });

    if (Array.isArray(data)) {
      return data.map((item) => ({
        name: item.name,
        path: item.path,
        type: item.type,
      }));
    }

    return [];
  } catch (error: any) {
    console.error('Failed to fetch repo tree:', error.message);
    return [];
  }
}

/**
 * Check GitHub API rate limit
 */
export async function checkRateLimit() {
  try {
    const { data } = await octokit.rateLimit.get();
    return {
      limit: data.rate.limit,
      remaining: data.rate.remaining,
      reset: new Date(data.rate.reset * 1000),
    };
  } catch (error: any) {
    console.error('Failed to check rate limit:', error.message);
    return null;
  }
}

// Made with Bob
