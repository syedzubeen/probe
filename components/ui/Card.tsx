import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accent?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, accent = false, onClick, ...props }: CardProps) {
  const baseStyles = 'bg-[#111111] border border-white/[0.06] rounded-2xl';
  const hoverStyles = hover ? 'hover:border-white/10 cursor-pointer' : '';
  const accentStyles = accent ? 'border-l-2 border-l-violet-500' : '';
  const clickableStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${accentStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-5 py-4 border-b border-white/[0.06] ${className}`}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  );
}

// Made with Bob
