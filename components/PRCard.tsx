'use client';

import React from 'react';
import { GitHubPR, AnalysisStatus } from '@/types';
import { getRelativeTime } from '@/lib/utils';

interface PRCardProps {
  pr: GitHubPR;
  status: AnalysisStatus;
  isActive: boolean;
  onClick: () => void;
}

export function PRCard({ pr, status, isActive, onClick }: PRCardProps) {
  const statusColors = {
    unanalyzed: '#808080',
    analyzing: '#808080',
    warning: '#f59e0b',
    critical: '#ef4444',
    clean: '#10b981',
  };

  const truncateTitle = (title: string) => {
    return title.length > 50 ? title.slice(0, 50) + '...' : title;
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer transition-all duration-150 mb-1.5"
      style={{
        padding: '10px 14px',
        borderRadius: isActive ? '0 10px 10px 0' : '10px',
        background: isActive ? 'rgba(255,255,255,0.04)' : '#111111',
        border: isActive
          ? '1px solid rgba(255,255,255,0.05)'
          : '1px solid rgba(255,255,255,0.05)',
        borderLeft: isActive ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.05)',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = '#151515';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = '#111111';
        }
      }}
    >
      {/* PR Number */}
      <div className="mb-1.5">
        <span
          className="font-[family-name:var(--font-dm-mono)] text-xs text-violet-400"
          style={{
            fontWeight: 600,
          }}
        >
          #{pr.number}
        </span>
      </div>

      {/* Title */}
      <div className="mb-2">
        <p
          className="font-[family-name:var(--font-space-grotesk)] text-sm font-medium text-white/80 truncate"
          style={{
            lineHeight: '1.4',
          }}
        >
          {truncateTitle(pr.title)}
        </p>
      </div>

      {/* Bottom meta row */}
      <div className="flex items-center justify-between gap-2">
        {/* Left: Avatar + Author */}
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={pr.avatar || `https://github.com/${pr.author}.png`}
            alt={pr.author}
            className="rounded-full object-cover flex-shrink-0"
            style={{
              width: '28px',
              height: '28px',
              border: '1.5px solid rgba(255,255,255,0.1)',
            }}
          />
          <span
            className="text-white/60 truncate font-[family-name:var(--font-dm-mono)] text-[10px]"
          >
            {pr.author}
          </span>
        </div>

        {/* Right: Files + Time + Status */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-white/30 font-[family-name:var(--font-dm-mono)] text-[10px]">
            {pr.files_changed || 0} files · {getRelativeTime(pr.created_at)}
          </span>
          <div
            className="rounded-full flex-shrink-0"
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: statusColors[status]
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Made with Bob
