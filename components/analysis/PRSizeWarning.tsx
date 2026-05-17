import React from 'react';
import { PRSize } from '@/types';

interface PRSizeWarningProps {
  prSize: PRSize;
}

export function PRSizeWarning({ prSize }: PRSizeWarningProps) {
  const isLargePR = prSize.size_warning || false;
  const files = prSize.files_changed || 0;
  const additions = prSize.lines_added || 0;
  const deletions = prSize.lines_removed || 0;
  
  let warning = '';
  if (prSize.size_warning) {
    warning = `This PR modifies ${files > 15 ? 'more than 15 files' : 'over 500 lines'}. Consider breaking it into smaller, focused PRs for easier review.`;
  }
  if (prSize.mixed_concerns) {
    const concerns = prSize.concerns_detected?.join(', ') || '';
    warning = warning ? `${warning} This PR also contains mixed concerns: ${concerns}.` : `This PR contains mixed concerns: ${concerns}.`;
  }
  
  const suggestion = prSize.split_suggestion || '';

  return (
    <div style={{ width: '100%' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 10, 
        marginBottom: 10 
      }}>
        <p style={{ 
          fontFamily: 'var(--font-dm-mono)', 
          fontSize: 10,
          letterSpacing: '0.2em', 
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)', 
          margin: 0 
        }}>
          PR Size & Scope
        </p>
        {isLargePR && (
          <span style={{
            fontFamily: 'var(--font-dm-mono)', 
            fontSize: 10,
            letterSpacing: '0.15em', 
            textTransform: 'uppercase',
            borderRadius: 999, 
            padding: '3px 10px',
            border: '1px solid rgba(245,158,11,0.4)',
            color: '#f59e0b', 
            background: 'rgba(245,158,11,0.08)'
          }}>
            Large PR
          </span>
        )}
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 6, 
        marginBottom: 10 
      }}>
        <span style={{ 
          fontFamily: 'var(--font-dm-mono)', 
          fontSize: 12,
          color: 'rgba(255,255,255,0.5)' 
        }}>
          {files} files
        </span>
        <span style={{ 
          color: 'rgba(255,255,255,0.2)', 
          fontFamily: 'var(--font-dm-mono)', 
          fontSize: 12 
        }}>·</span>
        <span style={{ 
          fontFamily: 'var(--font-dm-mono)', 
          fontSize: 12,
          color: '#10b981' 
        }}>
          +{additions}
        </span>
        <span style={{ 
          fontFamily: 'var(--font-dm-mono)', 
          fontSize: 12,
          color: '#ef4444' 
        }}>
          −{deletions}
        </span>
      </div>

      {warning && (
        <p style={{ 
          fontFamily: 'var(--font-inter)', 
          fontSize: 12,
          color: 'rgba(255,255,255,0.4)', 
          lineHeight: 1.6,
          margin: 0, 
          fontStyle: 'italic' 
        }}>
          {warning}
        </p>
      )}

      {suggestion && (
        <p style={{ 
          fontFamily: 'var(--font-inter)', 
          fontSize: 12,
          color: 'rgba(255,255,255,0.35)', 
          lineHeight: 1.6,
          margin: '6px 0 0 0', 
          fontStyle: 'italic' 
        }}>
          {suggestion}
        </p>
      )}
    </div>
  );
}

// Made with Bob
