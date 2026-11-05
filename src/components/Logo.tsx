import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', to = '/' }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2.5 group select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-lg transition-transform active:scale-95"
      aria-label="RageLab Home"
    >
      {/* Mini Flask Icon */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0`}>
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(255,91,53,0.5)] transition-transform group-hover:rotate-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Flask Outer Glass */}
          <path
            d="M17 4H23M20 4V14L28.5 29C29.8 31.2 28.2 34 25.6 34H14.4C11.8 34 10.2 31.2 11.5 29L20 14"
            stroke="#F5F2EC"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Orange Liquid Fill */}
          <path
            d="M14 26L14.4 33C14.4 33 17 33.5 20 33.5C23 33.5 25.6 33 25.6 33L26 26C24 27.2 22 25.8 20 26.5C18 27.2 16 25.5 14 26Z"
            fill="url(#miniFlaskLiquid)"
          />
          {/* Liquid Highlights / Bubbles */}
          <circle cx="18" cy="29" r="1.2" fill="#FFEAA7" opacity="0.9" />
          <circle cx="22" cy="27" r="0.9" fill="#FFEAA7" opacity="0.8" />
          <circle cx="21" cy="31" r="0.8" fill="#FFEAA7" opacity="0.7" />

          {/* Gradients */}
          <defs>
            <linearGradient id="miniFlaskLiquid" x1="14" y1="26" x2="26" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7A24" />
              <stop offset="1" stopColor="#FF4211" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wordmark */}
      <span className={`font-heading font-extrabold tracking-tight ${textSizes[size]}`}>
        <span className="text-white">Rage</span>
        <span className="text-primary-orange">Lab</span>
      </span>
    </Link>
  );
};

