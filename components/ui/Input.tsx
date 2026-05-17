import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ error, className = '', ...props }: InputProps) {
  const baseStyles = 'w-full px-3 py-2 bg-black-layer2 text-text-primary text-sm border rounded-lg transition-fast focus:outline-none focus:ring-1 focus:ring-cyan-primary/50 placeholder:text-text-muted/50';
  const errorStyles = error ? 'border-status-red' : 'border-white/5 hover:border-white/10 focus:border-cyan-primary/50';

  return (
    <div className="w-full">
      <input
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-status-red">{error}</p>
      )}
    </div>
  );
}

// Made with Bob
