import React from 'react';

interface RefactorScoreProps {
  score: number;
  tier: 'high' | 'medium' | 'low';
  reasons: string[];
}

export function RefactorScore({ score, tier, reasons }: RefactorScoreProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const colors = {
    high: { 
      ring: '#ef4444', 
      badge: 'rgba(239,68,68,0.15)', 
      text: '#ef4444', 
      label: 'High Priority' 
    },
    medium: { 
      ring: '#f59e0b', 
      badge: 'rgba(245,158,11,0.15)', 
      text: '#f59e0b', 
      label: 'Consider Refactoring' 
    },
    low: { 
      ring: '#10b981', 
      badge: 'rgba(16,185,129,0.15)', 
      text: '#10b981', 
      label: 'Code is Clean' 
    },
  };
  const c = colors[tier];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <p style={{ 
        fontFamily: 'var(--font-dm-mono)', 
        fontSize: 10,
        letterSpacing: '0.2em', 
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)', 
        marginBottom: 16,
        margin: 0 
      }}>
        Refactor Score
      </p>

      {/* Ring */}
      <div style={{ 
        position: 'relative', 
        width: 128, 
        height: 128, 
        marginBottom: 16, 
        flexShrink: 0 
      }}>
        <svg 
          width="128" 
          height="128" 
          viewBox="0 0 128 128"
          style={{ transform: 'rotate(-90deg)', display: 'block' }}
        >
          <circle 
            cx="64" 
            cy="64" 
            r="54"
            stroke="rgba(255,255,255,0.06)" 
            strokeWidth="8" 
            fill="none" 
          />
          <circle 
            cx="64" 
            cy="64" 
            r="54"
            stroke={c.ring} 
            strokeWidth="8" 
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }} 
          />
        </svg>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <span style={{ 
            fontFamily: 'var(--font-bebas-neue)', 
            fontSize: '3.5rem', 
            lineHeight: 1, 
            color: c.ring 
          }}>
            {score}
          </span>
        </div>
      </div>

      {/* Priority badge */}
      <span style={{ 
        fontFamily: 'var(--font-dm-mono)', 
        fontSize: 10,
        letterSpacing: '0.15em', 
        textTransform: 'uppercase',
        color: c.text, 
        background: c.badge,
        border: `1px solid ${c.ring}40`,
        borderRadius: 999, 
        padding: '3px 10px', 
        marginBottom: 16 
      }}>
        {c.label}
      </span>

      {/* Reasons */}
      <div style={{ 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 8 
      }}>
        {reasons.map((reason, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: 8 
          }}>
            <span style={{ 
              width: 4, 
              height: 4, 
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', 
              marginTop: 6, 
              flexShrink: 0, 
              display: 'block' 
            }} />
            <p style={{ 
              fontFamily: 'var(--font-inter)', 
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)', 
              lineHeight: 1.6, 
              margin: 0 
            }}>
              {reason}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

// Made with Bob
