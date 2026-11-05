import React from 'react';
import { motion } from 'framer-motion';

interface HostPortraitProps {
  className?: string;
}

export const HostPortrait: React.FC<HostPortraitProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background warm radial glow */}
      <div className="absolute inset-0 -m-8 rounded-full bg-primary-orange/25 blur-3xl pointer-events-none" />

      {/* Decorative Brush Stroke Arc behind the circle */}
      <svg
        viewBox="0 0 200 200"
        className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none text-primary-orange/60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 100 C20 40, 70 15, 120 18 C165 20, 185 55, 182 105 C180 155, 145 185, 95 182 C55 180, 28 150, 25 100"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="12 18"
          opacity="0.75"
        />
        {/* Subtle orange aura spray */}
        <path
          d="M175 45 Q190 65 178 95"
          stroke="#FFA63D"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M18 135 Q10 155 30 170"
          stroke="#FFA63D"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>

      {/* Playful Crown Doodle above portrait */}
      <motion.div
        animate={{ y: [0, -3, 0], rotate: [-8, -5, -8] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <svg
          width="44"
          height="32"
          viewBox="0 0 50 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_4px_8px_rgba(255,91,53,0.5)]"
        >
          {/* Hand-drawn crown doodle */}
          <path
            d="M5 28 L10 12 L22 22 L25 6 L28 22 L40 12 L45 28 Z"
            fill="#FFE853"
            stroke="#141416"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Crown jewels */}
          <circle cx="10" cy="11" r="2" fill="#FF5B35" />
          <circle cx="25" cy="5" r="2" fill="#FF5B35" />
          <circle cx="40" cy="11" r="2" fill="#FF5B35" />
          {/* Base band */}
          <path d="M5 28 Q25 32 45 28" stroke="#141416" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Main Circular Portrait Container */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-primary-orange via-[#FF7A24] to-[#FFA742] shadow-[0_10px_35px_rgba(255,91,53,0.45)] z-10"
      >
        {/* White Border Ring */}
        <div className="w-full h-full rounded-full border-[3.5px] border-white overflow-hidden bg-[#181820] shadow-inner">
          {/* Real User Photo properly cropped focusing on face */}
          <img
            src="/assets/host-portrait.jpg"
            alt="RageLab Host"
            className="w-full h-full object-cover object-[center_16%] hover:scale-105 transition-transform duration-300"
            loading="eager"
          />
        </div>
      </motion.div>
    </div>
  );
};

