'use client';

import React from 'react';
import { PRWithAnalysis } from '@/types';
import { ExternalLink, Code, AlertTriangle } from 'lucide-react';
import { getRelativeTime } from '@/lib/utils';
import { BobThinking } from './BobThinking';
import { SummarySection } from './analysis/SummarySection';
import { RefactorScore } from './analysis/RefactorScore';
import { TestCoverage } from './analysis/TestCoverage';
import { SecuritySection } from './analysis/SecuritySection';
import { PRSizeWarning } from './analysis/PRSizeWarning';
import { LabelSuggestions } from './analysis/LabelSuggestions';

interface AnalysisPanelProps {
  pr: PRWithAnalysis | null;
}

export function AnalysisPanel({ pr }: AnalysisPanelProps) {
  // Empty state
  if (!pr) {
    return (
      <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="flex flex-col items-center text-center">
          <Code className="w-8 h-8 mb-3" style={{ color: '#444444' }} />
          <p
            className="font-mono uppercase mb-2"
            style={{
              fontSize: '11px',
              color: '#666666',
              letterSpacing: '0.18em',
            }}
          >
            SELECT A PR
          </p>
          <p
            className="font-body"
            style={{
              fontSize: '12px',
              color: '#444444',
              maxWidth: '280px',
              lineHeight: '1.6',
            }}
          >
            Bob will scan it for issues, vulnerabilities, and refactor opportunities
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (pr.isAnalyzing) {
    return (
      <div className="flex-1 bg-[#0a0a0a] overflow-y-auto">
        <div className="max-w-5xl mx-auto" style={{ padding: '32px 40px' }}>
          {/* Header */}
          <div className="mb-6 pb-6 border-b border-white/[0.06] relative" style={{ marginTop: '16px' }}>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <h1 
                  className="text-white font-semibold mb-1"
                  style={{ 
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '20px',
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  <span className="text-[#505050]">#</span>{pr.number} {pr.title}
                </h1>
                <p style={{ fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>
                  <span className="text-[#505050]">opened by</span>{' '}
                  <span className="text-[#a0a0a0]">{pr.author}</span>
                  <span className="text-[#505050]"> · {getRelativeTime(pr.created_at)}</span>
                </p>
              </div>
              <a
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8b5cf6] hover:underline flex-shrink-0 cursor-pointer absolute top-0 right-0"
                style={{ fontSize: '12px' }}
              >
                View on GitHub <ExternalLink className="w-3 h-3 inline ml-0.5" />
              </a>
            </div>
          </div>

          <BobThinking />
        </div>
      </div>
    );
  }

  // Error state
  if (pr.analysisError) {
    return (
      <div className="flex-1 bg-[#0a0a0a] overflow-y-auto">
        <div className="max-w-5xl mx-auto" style={{ padding: '32px 40px' }}>
          {/* Header */}
          <div className="mb-6 pb-6 border-b border-white/[0.06] relative" style={{ marginTop: '16px' }}>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <h1 
                  className="text-white font-semibold mb-1"
                  style={{ 
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '20px',
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  <span className="text-[#505050]">#</span>{pr.number} {pr.title}
                </h1>
                <p style={{ fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>
                  <span className="text-[#505050]">opened by</span>{' '}
                  <span className="text-[#a0a0a0]">{pr.author}</span>
                  <span className="text-[#505050]"> · {getRelativeTime(pr.created_at)}</span>
                </p>
              </div>
              <a
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8b5cf6] hover:underline flex-shrink-0 cursor-pointer absolute top-0 right-0"
                style={{ fontSize: '12px' }}
              >
                View on GitHub <ExternalLink className="w-3 h-3 inline ml-0.5" />
              </a>
            </div>
          </div>

          {/* Error Card */}
          <div 
            className="mx-auto text-center"
            style={{
              maxWidth: '480px',
              margin: '40px auto',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '12px',
              padding: '20px 24px',
            }}
          >
            <AlertTriangle className="w-5 h-5 text-[#ef4444] mx-auto mb-3" />
            <h3 
              className="text-[#ef4444] mb-1"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Analysis Failed
            </h3>
            <p className="text-[#a0a0a0] mb-4" style={{ fontSize: '13px', marginTop: '4px' }}>
              {pr.analysisError}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="cursor-pointer transition-all duration-150"
              style={{
                border: '1px solid rgba(239,68,68,0.4)',
                background: 'transparent',
                color: '#ef4444',
                borderRadius: '8px',
                padding: '8px 20px',
                fontSize: '13px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state with analysis
  if (!pr.analysis) {
    return null;
  }

  const analysis = pr.analysis;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', padding: 20, gap: 16, background: '#0a0a0a' }}>
      
      {/* PR Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '1.25rem', fontWeight: 600, color: 'white', lineHeight: 1.3, margin: 0 }}>
          #{pr.number} {pr.title}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: '#a78bfa', textDecoration: 'none' }}
          >
            View on GitHub ↗
          </a>
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
            opened by {pr.author} · {getRelativeTime(pr.created_at)}
          </span>
        </div>
      </div>

      {/* 2-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16, alignItems: 'start' }}>

        {/* LEFT column: Refactor Score only */}
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 20 }}>
          <RefactorScore
            score={analysis.refactor_score}
            tier={analysis.refactor_tier}
            reasons={analysis.refactor_reasons}
          />
        </div>

        {/* RIGHT column: everything else stacked */}
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>

          <div style={{ padding: '20px 20px' }}>
            <SummarySection summary={analysis.summary} />
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px' }}>
            <TestCoverage coverage={analysis.test_coverage} />
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px' }}>
            <SecuritySection security={analysis.security} />
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px' }}>
            <PRSizeWarning prSize={analysis.pr_size} />
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px' }}>
            <LabelSuggestions labels={analysis.labels} />
          </div>

        </div>
      </div>
    </div>
  );
}

// Made with Bob
