import React from 'react';

export const BottomGlowWave: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0 overflow-hidden select-none h-24">
      {/* Background radial glow */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-primary-orange/20 via-primary-orange/5 to-transparent blur-xl" />
      
      {/* SVG glowing curved wave */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full filter drop-shadow-[0_-4px_12px_rgba(255,91,53,0.7)]"
      >
        <path
          d="M0,65 C150,110 320,115 500,75 C700,30 920,35 1200,75 L1200,120 L0,120 Z"
          fill="#111114"
        />
        {/* Luminous stroke line */}
        <path
          d="M0,65 C150,110 320,115 500,75 C700,30 920,35 1200,75"
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="3.5"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF7A24" stopOpacity="0.4" />
            <stop offset="35%" stopColor="#FF5B35" stopOpacity="1" />
            <stop offset="65%" stopColor="#FF7A24" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF4211" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

