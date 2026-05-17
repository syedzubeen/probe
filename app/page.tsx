'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [liveClock, setLiveClock] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }));
      setCurrentDate(now.toLocaleDateString('en-US', { 
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }).toUpperCase().replace(',', ''));
      setLiveClock(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        router.push('/dashboard');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router]);

  const handleLaunchApp = () => {
    router.push('/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Vertical Grid Lines */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div
          key={i}
          className="fixed top-0 h-screen w-[1px] animate-fade-in"
          style={{
            left: `calc(${i} * 12.5vw)`,
            background: 'rgba(255, 255, 255, 0.06)',
            zIndex: 0,
            animationDelay: '0.3s',
          }}
        />
      ))}

      {/* Top Bar */}
      <nav
        className="relative z-10 flex items-center justify-end animate-fade-in"
        style={{ padding: '24px 48px' }}
      >
        {/* Nav Links */}
        <div
          className="flex items-center font-mono transition-colors"
          style={{
            gap: '48px',
            fontSize: '11px',
            letterSpacing: '0.15em',
          }}
        >
          <a
            href="#features"
            className="cursor-pointer transition-colors"
            style={{ color: '#505050' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#505050'}
          >
            FEATURES
          </a>
          <a
            href="#how-it-works"
            className="cursor-pointer transition-colors"
            style={{ color: '#505050' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#505050'}
          >
            HOW IT WORKS
          </a>
          <button
            onClick={handleLaunchApp}
            className="cursor-pointer transition-colors font-mono"
            style={{ 
              color: '#8b5cf6',
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: '11px',
              letterSpacing: '0.15em',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8b5cf6'}
          >
            LAUNCH APP
          </button>
        </div>
      </nav>

      {/* Metadata Block */}
      <div 
        className="absolute z-10 font-mono leading-tight animate-fade-in"
        style={{
          top: '88px',
          left: '48px',
          fontSize: '11px',
          color: '#404040',
        }}
      >
        <div>DEEP SCAN / SMART REVIEW</div>
        <div>{currentDate}</div>
        <div style={{ fontSize: '10px', color: '#303030', marginTop: '4px' }}>
          {liveClock}
        </div>
      </div>

      {/* Hero Section - Centered */}
      <main 
        className="relative z-10 flex flex-col items-center justify-center text-center"
        style={{ minHeight: '100vh' }}
      >
        {/* Hero Word */}
        <h1 
          className="font-display text-white leading-none animate-hero-slide"
          style={{
            fontSize: 'clamp(100px, 16vw, 200px)',
            letterSpacing: '-0.02em',
          }}
        >
          PROBE
        </h1>
        
        {/* Tagline */}
        <div 
          className="font-mono animate-glitch"
          style={{
            marginTop: '16px',
            color: '#555555',
            fontSize: 'clamp(14px, 2vw, 22px)',
            letterSpacing: '0.06em',
          }}
        >
          Deep scan. Smart review.
        </div>

        {/* CTA Button */}
        <button
          onClick={handleLaunchApp}
          className="cursor-pointer font-heading transition-all duration-200 animate-fade-in-cta"
          style={{
            marginTop: '48px',
            background: '#ffffff',
            color: '#0a0a0a',
            borderRadius: '100px',
            padding: '15px 44px',
            fontSize: '14px',
            fontWeight: 700,
            border: 'none',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#8b5cf6'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
        >
          LAUNCH APP →
        </button>

        {/* OR PRESS ENTER */}
        <div 
          className="font-mono animate-fade-in-cta"
          style={{
            marginTop: '16px',
            fontSize: '10px',
            color: '#333333',
            letterSpacing: '0.2em',
          }}
        >
          OR PRESS ENTER
        </div>
      </main>

      {/* Descriptor Paragraph - Absolute Right */}
      <div 
        className="absolute z-10 font-body animate-fade-in-delayed"
        style={{
          right: '48px',
          top: '50%',
          transform: 'translateY(-50%)',
          maxWidth: '260px',
          fontSize: '14px',
          color: '#606060',
          lineHeight: '1.7',
          textAlign: 'left',
          fontStyle: 'italic',
        }}
      >
        PRobe gives maintainers an instant senior engineer's eye on every pull request — before you merge.
      </div>

      {/* Bottom Scroll Indicator */}
      <div 
        className="absolute flex flex-col items-center animate-bounce-slow"
        style={{
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div 
          className="font-mono"
          style={{
            fontSize: '10px',
            color: '#333333',
            letterSpacing: '0.18em',
            marginBottom: '8px',
          }}
        >
          OR SCROLL DOWN
        </div>
        <div style={{ color: '#333333', fontSize: '12px' }}>↓</div>
      </div>

      {/* Inline Styles for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes heroSlide {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDelayed {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInCta {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes glitch {
          0%, 96%, 100% {
            clip-path: inset(0 0 0 0);
            transform: skewX(0deg);
          }
          97% {
            clip-path: inset(0 0 50% 0);
            transform: skewX(-2deg);
          }
          98% {
            clip-path: inset(50% 0 0 0);
            transform: skewX(2deg);
          }
          99% {
            clip-path: inset(0 0 0 0);
            transform: skewX(0deg);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-10px) translateX(-50%);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-hero-slide {
          animation: heroSlide 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-delayed {
          animation: fadeInDelayed 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-fade-in-cta {
          animation: fadeInCta 0.8s ease-out 1s forwards;
          opacity: 0;
        }

        .animate-glitch {
          animation: glitch 4s infinite;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Made with Bob
