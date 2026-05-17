'use client';

import React, { useState, useEffect } from 'react';

const thinkingMessages = [
  'Bob is reading the diff...',
  'Checking for vulnerabilities...',
  'Calculating refactor score...',
  'Analysing test coverage...',
];

export function BobThinking() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Rotate messages every 3 seconds
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % thinkingMessages.length);
    }, 3000);

    // Update elapsed time every second
    const timeInterval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div 
        className="bg-[#111111] rounded-xl flex flex-col items-center justify-center"
        style={{
          padding: '32px',
          borderRadius: '12px',
        }}
      >
        {/* Animated dots */}
        <div className="flex gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full bg-[#8b5cf6]"
              style={{
                width: '8px',
                height: '8px',
                animation: `pulse 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Status message */}
        <p 
          className="text-[#a0a0a0] mb-3 transition-opacity duration-300"
          style={{ fontSize: '14px' }}
        >
          {thinkingMessages[messageIndex]}
        </p>

        {/* Elapsed time */}
        <p 
          className="text-[#505050] font-mono"
          style={{ fontSize: '12px' }}
        >
          {formatTime(elapsedTime)} elapsed
        </p>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(0.8);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

// Made with Bob
