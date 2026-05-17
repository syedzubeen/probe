import { NextRequest, NextResponse } from 'next/server';
import { fetchPullRequests } from '@/lib/github';
import { parseGitHubUrl } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const repoInput = searchParams.get('repo');

    if (!repoInput) {
      return NextResponse.json(
        { error: 'Missing repo parameter' },
        { status: 400 }
      );
    }

    // Parse and validate GitHub URL
    const repo = parseGitHubUrl(repoInput);
    const [owner, repoName] = repo.split('/');

    // Fetch pull requests
    const prs = await fetchPullRequests(owner, repoName);

    return NextResponse.json({
      repo,
      count: prs.length,
      prs,
    });
  } catch (error: any) {
    console.error('Error fetching PRs:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch pull requests' },
      { status: error.status || 500 }
    );
  }
}

// Made with Bob
