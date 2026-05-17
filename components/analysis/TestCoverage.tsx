import React from 'react';
import { TestCoverage as TestCoverageType } from '@/types';

interface TestCoverageProps {
  coverage: TestCoverageType;
}

export function TestCoverage({ coverage }: TestCoverageProps) {
  const isCovered = coverage.verdict === 'well_covered';
  const gapCount = coverage.gaps.length;
  const coverageLabel = isCovered ? 'Well Covered' : `${gapCount} Gap${gapCount !== 1 ? 's' : ''}`;

  return (
    <div style={{ width: '100%' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 12 
      }}>
        <p style={{ 
          fontFamily: 'var(--font-dm-mono)', 
          fontSize: 10,
          letterSpacing: '0.2em', 
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)', 
          margin: 0 
        }}>
          Test Coverage
        </p>
        <span style={{
          fontFamily: 'var(--font-dm-mono)', 
          fontSize: 10,
          letterSpacing: '0.15em', 
          textTransform: 'uppercase',
          borderRadius: 999, 
          padding: '3px 10px',
          border: isCovered 
            ? '1px solid rgba(16,185,129,0.4)' 
            : '1px solid rgba(245,158,11,0.4)',
          color: isCovered ? '#10b981' : '#f59e0b',
          background: isCovered 
            ? 'rgba(16,185,129,0.08)' 
            : 'rgba(245,158,11,0.08)'
        }}>
          {coverageLabel}
        </span>
      </div>

      {coverage.gaps && coverage.gaps.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {coverage.gaps.map((gap, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: 10 
            }}>
              <span style={{ 
                width: 2, 
                minHeight: 14, 
                borderRadius: 2,
                background: 'rgba(245,158,11,0.5)', 
                flexShrink: 0, 
                marginTop: 3, 
                display: 'block' 
              }} />
              <p style={{ 
                fontFamily: 'var(--font-inter)', 
                fontSize: 12,
                color: 'rgba(255,255,255,0.55)', 
                lineHeight: 1.5, 
                margin: 0 
              }}>
                {gap.file}: {gap.function} ({gap.severity})
              </p>
            </div>
          ))}
        </div>
      )}

      {(!coverage.gaps || coverage.gaps.length === 0) && (
        <p style={{ 
          fontFamily: 'var(--font-inter)', 
          fontSize: 12,
          color: 'rgba(255,255,255,0.4)', 
          margin: 0 
        }}>
          No coverage gaps detected.
        </p>
      )}
    </div>
  );
}

// Made with Bob
