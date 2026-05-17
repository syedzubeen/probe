import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-black-layer2 rounded shimmer ${className}`} />
  );
}

export function PRListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-black-layer1 border border-default rounded-card p-4 space-y-3">
          <div className="flex items-start gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AnalysisSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Summary */}
      <div className="bg-black-layer1 border border-default rounded-card p-6 space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Score and Coverage */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-black-layer1 border border-default rounded-card p-6 space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-32 w-32 rounded-full mx-auto" />
          <Skeleton className="h-3 w-full" />
        </div>
        <div className="bg-black-layer1 border border-default rounded-card p-6 space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      {/* Security */}
      <div className="bg-black-layer1 border border-default rounded-card p-6 space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

// Made with Bob
