import React from 'react';
import { Card, CardContent } from '../ui/Card';

interface SummarySectionProps {
  summary: string;
}

export function SummarySection({ summary }: SummarySectionProps) {
  return (
    <Card accent className="animate-fade-slide">
      <CardContent>
        <p className="text-[10px] font-[family-name:var(--font-dm-mono)] uppercase tracking-[0.2em] text-white/40 mb-3">
          What This PR Does
        </p>
        <p className="text-sm font-[family-name:var(--font-inter)] text-white/70 leading-relaxed">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
}

// Made with Bob
