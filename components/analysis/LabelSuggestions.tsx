'use client';

import React, { useState } from 'react';
import { Label } from '@/types';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface LabelSuggestionsProps {
  labels: Label[];
}

export function LabelSuggestions({ labels }: LabelSuggestionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLabels = async () => {
    const labelText = labels.map(l => l.label).join(', ');
    const success = await copyToClipboard(labelText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Get unique confidence values
  const confidences = Array.from(new Set(labels.map(l => l.confidence)));
  const confidenceDisplay = confidences.length > 0 ? confidences.join(', ') : 'N/A';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ 
        fontFamily: 'var(--font-dm-mono)', 
        fontSize: 10,
        letterSpacing: '0.2em', 
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)', 
        margin: 0 
      }}>
        Suggested Labels
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {labels.map((label, i) => (
          <span key={i} style={{ 
            fontFamily: 'var(--font-dm-mono)', 
            fontSize: 10,
            letterSpacing: '0.15em', 
            textTransform: 'uppercase',
            color: '#a78bfa', 
            border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: 999, 
            padding: '3px 10px' 
          }}>
            {label.label}
          </span>
        ))}
        <span style={{ 
          fontFamily: 'var(--font-dm-mono)', 
          fontSize: 10,
          letterSpacing: '0.15em', 
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)', 
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 999, 
          padding: '3px 10px' 
        }}>
          Confidence: {confidenceDisplay}
        </span>
      </div>
    </div>
  );
}

// Made with Bob
