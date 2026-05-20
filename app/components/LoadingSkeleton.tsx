'use client';

import React from 'react';

export default function LoadingSkeleton({ 
  height = '400px', 
  width = '100%', 
  borderRadius = '24px',
  className = "" 
}: { 
  height?: string; 
  width?: string; 
  borderRadius?: string;
  className?: string;
}) {
  return (
    <div 
      className={`skeleton-wrapper ${className}`}
      style={{ 
        height, 
        width, 
        borderRadius,
        background: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--border)'
      }}
    >
      <div className="shimmer-sweep" />
      
      <style jsx global>{`
        .skeleton-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .shimmer-sweep {
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.03) 50%, 
            transparent 100%
          );
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
