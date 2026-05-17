'use client';

import React, { useState } from 'react';
import { PRWithAnalysis } from '@/types';
import { parseGitHubUrl } from '@/lib/utils';
import { TopBar } from '@/components/TopBar';
import { PRList } from '@/components/PRList';
import { AnalysisPanel } from '@/components/AnalysisPanel';

export default function Dashboard() {
  const [prs, setPRs] = useState<PRWithAnalysis[]>([]);
  const [selectedPRNumber, setSelectedPRNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentRepo, setCurrentRepo] = useState<string>('');

  const selectedPR = prs.find(pr => pr.number === selectedPRNumber) || null;

  const handleLoadPRs = async (repoUrl: string) => {
    setLoading(true);
    setPRs([]);
    setSelectedPRNumber(null);

    try {
      const repo = parseGitHubUrl(repoUrl);
      setCurrentRepo(repo);

      const response = await fetch(`/api/prs?repo=${encodeURIComponent(repo)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch pull requests');
      }

      setPRs(data.prs);
    } catch (error: any) {
      alert(error.message || 'Failed to load pull requests');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPR = async (prNumber: number) => {
    setSelectedPRNumber(prNumber);

    // Find the PR
    const pr = prs.find(p => p.number === prNumber);
    if (!pr) return;

    // If already analyzed or analyzing, don't re-analyze
    if (pr.analysis || pr.isAnalyzing) return;

    // Mark as analyzing
    setPRs(prev =>
      prev.map(p =>
        p.number === prNumber ? { ...p, isAnalyzing: true } : p
      )
    );

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repo: currentRepo,
          pr_number: prNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze pull request');
      }

      // Update PR with analysis
      setPRs(prev =>
        prev.map(p =>
          p.number === prNumber
            ? { ...p, analysis: data.analysis, isAnalyzing: false }
            : p
        )
      );
    } catch (error: any) {
      // Update PR with error
      setPRs(prev =>
        prev.map(p =>
          p.number === prNumber
            ? { ...p, analysisError: error.message, isAnalyzing: false }
            : p
        )
      );
    }
  };

  return (
    <div className="relative h-screen flex flex-col bg-[#0a0a0a]">
      {/* Vertical Grid Lines */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div
          key={i}
          className="fixed top-0 h-screen w-[1px]"
          style={{
            left: `calc(${i} * 12.5vw)`,
            background: 'rgba(255, 255, 255, 0.03)',
            zIndex: 0,
          }}
        />
      ))}

      {/* Top Bar */}
      <div className="relative z-10">
        <TopBar onLoadPRs={handleLoadPRs} loading={loading} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex overflow-hidden">
        {/* PR List Panel - Fixed width */}
        <div style={{ width: '340px', flexShrink: 0 }}>
          <PRList
            prs={prs}
            selectedPR={selectedPRNumber}
            onSelectPR={handleSelectPR}
            loading={loading}
          />
        </div>

        {/* Analysis Panel - Flexible */}
        <AnalysisPanel pr={selectedPR} />
      </div>
    </div>
  );
}

// Made with Bob