/**
 * Parse GitHub URL to extract owner/repo
 * Accepts: https://github.com/owner/repo or owner/repo
 */
export function parseGitHubUrl(input: string): string {
  // Remove protocol and domain
  let cleaned = input
    .replace(/^https?:\/\//i, '')
    .replace(/^github\.com\//i, '')
    .replace(/\/+$/, ''); // Remove trailing slashes
  
  // Extract owner/repo (first two segments)
  const parts = cleaned.split('/').filter(Boolean);
  if (parts.length < 2) {
    throw new Error('Invalid GitHub URL. Expected format: https://github.com/owner/repo or owner/repo');
  }
  
  return `${parts[0]}/${parts[1]}`;
}

/**
 * Get relative time string (e.g., "2 days ago")
 */
export function getRelativeTime(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMins > 0) return `${diffMins}m ago`;
  return 'just now';
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

/**
 * Get severity color class
 */
export function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'text-status-red bg-status-red/10 border-status-red/30';
    case 'high':
      return 'text-status-red bg-status-red/10 border-status-red/30';
    case 'medium':
      return 'text-status-amber bg-status-amber/10 border-status-amber/30';
    case 'low':
      return 'text-status-emerald bg-status-emerald/10 border-status-emerald/30';
    case 'clear':
      return 'text-status-emerald bg-status-emerald/10 border-status-emerald/30';
    default:
      return 'text-text-secondary bg-black-layer2 border-default';
  }
}

/**
 * Get confidence color
 */
export function getConfidenceColor(confidence: string): string {
  switch (confidence.toLowerCase()) {
    case 'high':
      return 'bg-cyan-primary';
    case 'medium':
      return 'bg-status-amber';
    case 'low':
      return 'bg-text-muted';
    default:
      return 'bg-text-muted';
  }
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Validate GitHub repo format
 */
export function isValidGitHubRepo(input: string): boolean {
  try {
    parseGitHubUrl(input);
    return true;
  } catch {
    return false;
  }
}

// Made with Bob
