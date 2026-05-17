'use client';

import React, { useState, useEffect } from 'react';
import { isValidGitHubRepo } from '@/lib/utils';

interface TopBarProps {
  onLoadPRs: (repo: string) => void;
  loading?: boolean;
}

export function TopBar({ onLoadPRs, loading = false }: TopBarProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!repoUrl.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    if (!isValidGitHubRepo(repoUrl)) {
      setError('Invalid GitHub URL. Expected format: https://github.com/owner/repo or owner/repo');
      return;
    }

    onLoadPRs(repoUrl.trim());
  };

  return (
    <div 
      className="bg-[#0a0a0a] border-b"
      style={{ 
        padding: '16px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
      }}
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex flex-col flex-shrink-0">
          <span style={{fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em'}}>
            <span style={{color: '#8b5cf6'}}>PR</span>
            <span style={{color: '#ffffff'}}>obe</span>
          </span>
          {/* Metadata line */}
          <div 
            style={{
              fontFamily: 'DM Mono',
              fontSize: '9px',
              color: '#404040',
              letterSpacing: '0.2em',
              marginTop: '2px',
              textTransform: 'uppercase',
            }}
          >
            MAINTAINER VIEW
          </div>
        </div>

        {/* Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="https://github.com/owner/repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={loading}
            className="w-full bg-transparent text-white transition-all duration-200 font-mono"
            style={{
              padding: '10px 18px',
              fontSize: '13px',
              outline: 'none',
              borderRadius: '8px',
              border: isFocused 
                ? '1px solid rgba(139, 92, 246, 0.3)' 
                : '1px solid rgba(255, 255, 255, 0.07)',
              color: isFocused ? '#ffffff' : '#606060',
            }}
          />
          {error && (
            <p className="mt-1.5 text-xs text-[#ef4444]">{error}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex-shrink-0 cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: '#8b5cf6',
            color: '#ffffff',
            fontFamily: 'Space Grotesk',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            padding: '11px 28px',
            borderRadius: '10px',
            border: 'none',
            outline: 'none',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#7c3aed';
              e.currentTarget.style.boxShadow = '0 0 24px rgba(139, 92, 246, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#8b5cf6';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {loading ? 'LOADING...' : 'LOAD PRS →'}
        </button>
      </form>
    </div>
  );
}

// Made with Bob
