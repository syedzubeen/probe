// GitHub PR types
export interface GitHubPR {
  number: number;
  title: string;
  author: string;
  avatar: string;
  files_changed: number;
  created_at: string;
  url: string;
  state?: string;
}

// Bob Analysis types
export interface BobAnalysis {
  summary: string;
  refactor_score: number;
  refactor_tier: 'high' | 'medium' | 'low';
  refactor_reasons: string[];
  test_coverage: TestCoverage;
  security: SecurityReport;
  pr_size: PRSize;
  labels: Label[];
}

export interface TestCoverage {
  verdict: 'gaps_found' | 'well_covered';
  gaps: TestGap[];
}

export interface TestGap {
  file: string;
  function: string;
  severity: 'high' | 'medium' | 'low';
}

export interface SecurityReport {
  overall_severity: 'critical' | 'high' | 'medium' | 'low' | 'clear';
  vulnerabilities: Vulnerability[];
  secrets: Secret[];
  insecure_patterns: InsecurePattern[];
}

export interface Vulnerability {
  package: string;
  version: string;
  cve: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  nvd_url: string;
}

export interface Secret {
  file: string;
  line: number;
  type: string;
  preview: string;
}

export interface InsecurePattern {
  file: string;
  issue: string;
}

export interface PRSize {
  files_changed: number;
  lines_added: number;
  lines_removed: number;
  size_warning: boolean;
  mixed_concerns: boolean;
  concerns_detected: string[];
  split_suggestion: string | null;
}

export interface Label {
  label: string;
  confidence: 'high' | 'medium' | 'low';
}

// UI State types
export interface PRWithAnalysis extends GitHubPR {
  analysis?: BobAnalysis;
  isAnalyzing?: boolean;
  analysisError?: string;
}

export type AnalysisStatus = 'unanalyzed' | 'analyzing' | 'warning' | 'critical' | 'clean';

// Made with Bob
