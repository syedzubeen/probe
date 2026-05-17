'use client';

import React, { useState, useEffect } from 'react';
import { PRWithAnalysis, AnalysisStatus } from '@/types';
import { PRCard } from './PRCard';
import { PRListSkeleton } from './Skeleton';
import { GitBranch } from 'lucide-react';

interface PRListProps {
  prs: PRWithAnalysis[];
  selectedPR: number | null;
  onSelectPR: (prNumber: number) => void;
  loading?: boolean;
}

function getPRStatus(pr: PRWithAnalysis): AnalysisStatus {
  if (pr.isAnalyzing) return 'analyzing';
  if (!pr.analysis) return 'unanalyzed';
  
  const { security, refactor_score } = pr.analysis;
  
  if (security.overall_severity === 'critical' || security.overall_severity === 'high') {
    return 'critical';
  }
  
  if (refactor_score >= 75 || security.overall_severity === 'medium') {
    return 'warning';
  }
  
  return 'clean';
}

export function PRList({ prs, selectedPR, onSelectPR, loading }: PRListProps) {
  const [liveClock, setLiveClock] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLiveClock(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      }));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full bg-[#0a0a0a] flex flex-col" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
        {/* Metadata Block */}
        <div
          className="font-mono leading-tight"
          style={{
            paddingLeft: '20px',
            paddingTop: '8px',
            paddingBottom: '12px',
            fontSize: '9px',
            color: '#444444',
            letterSpacing: '0.1em',
          }}
        >
          <div>DEEP SCAN / SMART REVIEW</div>
          <div style={{ color: '#8b5cf6' }}>{liveClock}</div>
        </div>

        <div style={{ padding: '20px 16px 12px' }}>
          <p 
            className="text-[#404040] uppercase"
            style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.12em',
            }}
          >
            LOADING...
          </p>
        </div>
        <div className="border-b border-white/[0.06]" />
        <div className="flex-1 overflow-y-auto px-4 pt-3">
          <PRListSkeleton />
        </div>
      </div>
    );
  }

  if (prs.length === 0) {
    return (
      <div className="w-full h-full bg-[#0a0a0a] flex flex-col" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
        {/* Metadata Block */}
        <div
          className="font-mono leading-tight"
          style={{
            paddingLeft: '20px',
            paddingTop: '8px',
            paddingBottom: '12px',
            fontSize: '9px',
            color: '#444444',
            letterSpacing: '0.1em',
          }}
        >
          <div>DEEP SCAN / SMART REVIEW</div>
          <div style={{ color: '#8b5cf6' }}>{liveClock}</div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <GitBranch className="w-4 h-4 mb-2" style={{ color: '#444444' }} />
          <p
            className="font-mono uppercase mb-1"
            style={{
              fontSize: '11px',
              color: '#666666',
              letterSpacing: '0.1em',
            }}
          >
            NO REPOSITORY LOADED
          </p>
          <p
            className="font-mono uppercase"
            style={{
              fontSize: '9px',
              color: '#444444',
              letterSpacing: '0.15em',
            }}
          >
            ENTER A GITHUB URL ABOVE
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#0a0a0a] flex flex-col" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
      {/* Metadata Block */}
      <div
        className="font-mono leading-tight"
        style={{
          paddingLeft: '20px',
          paddingTop: '8px',
          paddingBottom: '12px',
          fontSize: '9px',
          color: '#444444',
          letterSpacing: '0.1em',
        }}
      >
        <div>DEEP SCAN / SMART REVIEW</div>
        <div style={{ color: '#8b5cf6' }}>{liveClock}</div>
      </div>

      {/* Header */}
      <div style={{ padding: '20px 16px 12px' }}>
        <p 
          className="text-[#404040] uppercase"
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.12em',
          }}
        >
          {prs.length} OPEN PRS
        </p>
      </div>
      
      {/* Separator */}
      <div className="border-b border-white/[0.06]" />

      {/* PR List with custom scrollbar */}
      <div 
        className="flex-1 overflow-y-auto"
        style={{
          padding: '16px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#2a2a2a transparent',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 3px;
          }
          div::-webkit-scrollbar-track {
            background: transparent;
          }
          div::-webkit-scrollbar-thumb {
            background: #2a2a2a;
            border-radius: 2px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: #8b5cf6;
          }
        `}</style>
        {prs.map((pr) => (
          <PRCard
            key={pr.number}
            pr={pr}
            status={getPRStatus(pr)}
            isActive={selectedPR === pr.number}
            onClick={() => onSelectPR(pr.number)}
          />
        ))}
      </div>
    </div>
  );
}

// Made with Bob
