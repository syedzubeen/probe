import { BobAnalysis } from '@/types';

// Simple in-memory cache for PR analyses
class AnalysisCache {
  private cache: Map<string, BobAnalysis>;
  private timestamps: Map<string, number>;
  private readonly TTL = 1000 * 60 * 30; // 30 minutes

  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
  }

  /**
   * Generate cache key from repo and PR number
   */
  private getKey(repo: string, prNumber: number): string {
    return `${repo}:${prNumber}`;
  }

  /**
   * Check if cache entry is expired
   */
  private isExpired(key: string): boolean {
    const timestamp = this.timestamps.get(key);
    if (!timestamp) return true;
    return Date.now() - timestamp > this.TTL;
  }

  /**
   * Get cached analysis
   */
  get(repo: string, prNumber: number): BobAnalysis | null {
    const key = this.getKey(repo, prNumber);
    
    if (this.isExpired(key)) {
      this.delete(repo, prNumber);
      return null;
    }

    return this.cache.get(key) || null;
  }

  /**
   * Set cached analysis
   */
  set(repo: string, prNumber: number, analysis: BobAnalysis): void {
    const key = this.getKey(repo, prNumber);
    this.cache.set(key, analysis);
    this.timestamps.set(key, Date.now());
  }

  /**
   * Delete cached analysis
   */
  delete(repo: string, prNumber: number): void {
    const key = this.getKey(repo, prNumber);
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
    this.timestamps.clear();
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Check if analysis is cached
   */
  has(repo: string, prNumber: number): boolean {
    const key = this.getKey(repo, prNumber);
    return this.cache.has(key) && !this.isExpired(key);
  }
}

// Export singleton instance
export const analysisCache = new AnalysisCache();

// Made with Bob
