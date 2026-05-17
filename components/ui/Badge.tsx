import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'purple';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-[family-name:var(--font-dm-mono)] uppercase tracking-[0.15em] border';
  
  const variantStyles = {
    default: 'border-white/20 text-white/50',
    success: 'border-emerald-500/40 text-emerald-400',
    warning: 'border-amber-500/40 text-amber-400',
    danger: 'border-red-500/40 text-red-400',
    purple: 'border-violet-500/40 text-violet-400',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'unanalyzed' | 'warning' | 'critical' | 'clean';
  text?: string;
  showDot?: boolean;
}

export function StatusBadge({ status, text, showDot = true }: StatusBadgeProps) {
  const statusConfig = {
    unanalyzed: {
      variant: 'default' as const,
      text: text || 'Not analyzed',
      dotClass: 'status-dot unanalyzed',
    },
    warning: {
      variant: 'warning' as const,
      text: text || 'Has warnings',
      dotClass: 'status-dot warning',
    },
    critical: {
      variant: 'danger' as const,
      text: text || 'Critical issues',
      dotClass: 'status-dot critical',
    },
    clean: {
      variant: 'success' as const,
      text: text || 'Clean',
      dotClass: 'status-dot clean',
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>
      {showDot && <span className={`${config.dotClass} mr-2`} />}
      {config.text}
    </Badge>
  );
}

// Made with Bob
