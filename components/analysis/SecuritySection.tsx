import React from 'react';
import { SecurityReport } from '@/types';

interface SecuritySectionProps {
  security: SecurityReport;
}

export function SecuritySection({ security }: SecuritySectionProps) {
  const severity = security.overall_severity || 'low';
  const isClear = severity === 'clear' || severity === 'low';
  
  // Collect all findings into a single array
  const findings: string[] = [];
  
  if (security.vulnerabilities && security.vulnerabilities.length > 0) {
    security.vulnerabilities.forEach(vuln => {
      findings.push(`${vuln.package} v${vuln.version}: ${vuln.description} (${vuln.severity})`);
    });
  }
  
  if (security.secrets && security.secrets.length > 0) {
    security.secrets.forEach(secret => {
      findings.push(`Hardcoded ${secret.type} in ${secret.file}:${secret.line}`);
    });
  }
  
  if (security.insecure_patterns && security.insecure_patterns.length > 0) {
    security.insecure_patterns.forEach(pattern => {
      findings.push(`${pattern.file}: ${pattern.issue}`);
    });
  }

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
          Security
        </p>
        <span style={{
          fontFamily: 'var(--font-dm-mono)', 
          fontSize: 10,
          letterSpacing: '0.15em', 
          textTransform: 'uppercase',
          borderRadius: 999, 
          padding: '3px 10px',
          border: severity === 'high' || severity === 'critical'
            ? '1px solid rgba(239,68,68,0.4)'
            : severity === 'medium'
            ? '1px solid rgba(245,158,11,0.4)'
            : '1px solid rgba(16,185,129,0.4)',
          color: severity === 'high' || severity === 'critical' ? '#ef4444' 
            : severity === 'medium' ? '#f59e0b' : '#10b981',
          background: severity === 'high' || severity === 'critical'
            ? 'rgba(239,68,68,0.08)'
            : severity === 'medium'
            ? 'rgba(245,158,11,0.08)'
            : 'rgba(16,185,129,0.08)'
        }}>
          {severity.toUpperCase()}
        </span>
      </div>

      {findings && findings.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {findings.map((finding, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              gap: 10 
            }}>
              <span style={{ 
                width: 2, 
                minHeight: 14, 
                borderRadius: 2,
                background: 'rgba(239,68,68,0.5)',
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
                {finding}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ 
          fontFamily: 'var(--font-inter)', 
          fontSize: 12,
          color: 'rgba(255,255,255,0.4)', 
          margin: 0 
        }}>
          No security issues detected in this PR.
        </p>
      )}
    </div>
  );
}

// Made with Bob
