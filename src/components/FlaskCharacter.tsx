import React from 'react';
import { motion } from 'framer-motion';

export type FlaskExpression = 'mischievous' | 'dead' | 'winking' | 'thinking' | 'frustrated' | 'devilish';

interface FlaskCharacterProps {
  expression?: FlaskExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export const FlaskCharacter: React.FC<FlaskCharacterProps> = ({
  expression = 'mischievous',
  size = 'lg',
  animated = true,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-24 h-28',
    md: 'w-36 h-44',
    lg: 'w-48 h-56',
    xl: 'w-60 h-72',
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background warm radial glow */}
      <div
        className="absolute inset-0 -m-8 rounded-full pointer-events-none opacity-60"
        style={{
          background:
            expression === 'dead'
              ? 'radial-gradient(circle, rgba(230, 50, 20, 0.35) 0%, rgba(20, 15, 25, 0) 70%)'
              : 'radial-gradient(circle, rgba(255, 91, 53, 0.4) 0%, rgba(255, 122, 36, 0.15) 45%, rgba(17, 17, 20, 0) 70%)',
        }}
      />

      <motion.div
        animate={
          animated
            ? expression === 'dead'
              ? { y: [0, 4, 0], rotate: [-2, 2, -2] }
              : { y: [0, -8, 0], rotate: [0, 1.5, 0, -1.5, 0] }
            : {}
        }
        transition={{
          duration: expression === 'dead' ? 4 : 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeMap[size]} z-10 flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 200 240"
          className="w-full h-full drop-shadow-[0_10px_20px_rgba(255,91,53,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Orange Liquid Gradient */}
            <linearGradient id="liquidGrad" x1="100" y1="80" x2="100" y2="210" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFA63D" />
              <stop offset="0.4" stopColor="#FF6A1A" />
              <stop offset="1" stopColor="#E2360E" />
            </linearGradient>

            {/* Flask Glass Outline Gradient */}
            <linearGradient id="glassOutline" x1="100" y1="20" x2="100" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.7" stopColor="#F5EFE6" />
              <stop offset="1" stopColor="#D8D2C5" />
            </linearGradient>

            {/* Inner glow mask */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Spark lines / energy rays outside the flask */}
          {expression === 'mischievous' && (
            <g stroke="#FFA63D" strokeWidth="4" strokeLinecap="round" opacity="0.9">
              <line x1="42" y1="75" x2="30" y2="70" />
              <line x1="48" y1="62" x2="38" y2="52" />
              <line x1="158" y1="75" x2="170" y2="70" />
              <line x1="152" y1="62" x2="162" y2="52" />
            </g>
          )}

          {expression === 'dead' && (
            <g stroke="#FF7A24" strokeWidth="4" strokeLinecap="round" opacity="0.8">
              <line x1="158" y1="65" x2="172" y2="60" />
              <line x1="160" y1="78" x2="175" y2="82" />
              <line x1="155" y1="50" x2="164" y2="40" />
            </g>
          )}

          {expression === 'winking' && (
            <g stroke="#FFA63D" strokeWidth="4" strokeLinecap="round" opacity="0.9">
              <line x1="42" y1="80" x2="30" y2="76" />
              <line x1="46" y1="68" x2="36" y2="58" />
              <line x1="158" y1="80" x2="170" y2="76" />
              <line x1="154" y1="68" x2="164" y2="58" />
            </g>
          )}

          {/* Glass Interior Background */}
          <path
            d="M80 30 H120 V85 L168 185 C176 202 164 220 146 220 H54 C36 220 24 202 32 185 L80 85 Z"
            fill="#18181E"
            opacity="0.85"
          />

          {/* Orange Liquid */}
          <g>
            <clipPath id="flaskClip">
              <path d="M80 30 H120 V85 L168 185 C176 202 164 220 146 220 H54 C36 220 24 202 32 185 L80 85 Z" />
            </clipPath>

            <g clipPath="url(#flaskClip)">
              {/* Liquid Body */}
              <path
                d="M10 115 Q55 125 100 115 T190 115 L190 230 L10 230 Z"
                fill="url(#liquidGrad)"
              />

              {/* Liquid surface wave highlight */}
              <path
                d="M20 118 Q60 126 100 118 T180 118"
                stroke="#FFD580"
                strokeWidth="4"
                fill="none"
                opacity="0.7"
              />

              {/* Floating Bubbles */}
              <circle cx="85" cy="140" r="5" fill="#FFEBB3" opacity="0.8" />
              <circle cx="120" cy="130" r="4" fill="#FFEBB3" opacity="0.7" />
              <circle cx="70" cy="180" r="6" fill="#FFEBB3" opacity="0.6" />
              <circle cx="135" cy="175" r="5" fill="#FFEBB3" opacity="0.7" />
              <circle cx="100" cy="195" r="4.5" fill="#FFEBB3" opacity="0.65" />

              {/* Bottom liquid dark shadow depth */}
              <ellipse cx="100" cy="216" rx="55" ry="12" fill="#8B1800" opacity="0.6" />

              {/* Facial Expressions inside the liquid */}
              {expression === 'mischievous' && (
                <g fill="#141416" stroke="#141416" strokeLinecap="round">
                  {/* Eyebrows */}
                  <path d="M68 144 L86 149" strokeWidth="4.5" />
                  <path d="M132 144 L114 149" strokeWidth="4.5" />
                  {/* Eyes - mischievous curved slits */}
                  <ellipse cx="78" cy="155" rx="5.5" ry="6" />
                  <ellipse cx="122" cy="155" rx="5.5" ry="6" />
                  {/* Smirk Mouth */}
                  <path
                    d="M84 172 Q100 185 116 172"
                    strokeWidth="5"
                    fill="none"
                  />
                  {/* Smirk side tuck */}
                  <path d="M115 170 L119 167" strokeWidth="4" />
                </g>
              )}

              {expression === 'dead' && (
                <g stroke="#141416" strokeWidth="5.5" strokeLinecap="round" fill="none">
                  {/* Left X eye */}
                  <line x1="68" y1="146" x2="84" y2="162" />
                  <line x1="84" y1="146" x2="68" y2="162" />
                  {/* Right X eye */}
                  <line x1="116" y1="146" x2="132" y2="162" />
                  <line x1="132" y1="146" x2="116" y2="162" />
                  {/* Wavy unhappy mouth */}
                  <path d="M82 178 Q92 170 100 178 T118 178" strokeWidth="5" />
                </g>
              )}

              {expression === 'winking' && (
                <g fill="#141416" stroke="#141416" strokeLinecap="round">
                  {/* Left Eye - Smug / Open */}
                  <path d="M68 144 L86 148" strokeWidth="4.5" />
                  <ellipse cx="78" cy="155" rx="5.5" ry="6" />
                  {/* Right Eye - Wink slant */}
                  <path d="M114 157 L126 150 L136 157" strokeWidth="5" fill="none" />
                  {/* Big cute smile */}
                  <path
                    d="M84 172 Q100 188 118 172"
                    strokeWidth="5"
                    fill="none"
                  />
                </g>
              )}

              {expression === 'thinking' && (
                <g fill="#141416" stroke="#141416" strokeLinecap="round">
                  {/* Left Eyebrow raised */}
                  <path d="M68 140 L86 146" strokeWidth="4.5" />
                  {/* Right Eyebrow furrowed */}
                  <path d="M132 147 L114 145" strokeWidth="4.5" />
                  {/* Eyes looking up */}
                  <ellipse cx="78" cy="153" rx="5" ry="5.5" />
                  <ellipse cx="122" cy="153" rx="5" ry="5.5" />
                  {/* Small quizzical 'o' mouth */}
                  <ellipse cx="100" cy="174" rx="4.5" ry="6" fill="#141416" />
                </g>
              )}

              {expression === 'frustrated' && (
                <g stroke="#141416" strokeWidth="5" strokeLinecap="round" fill="none">
                  {/* Furious brows */}
                  <line x1="68" y1="143" x2="88" y2="152" strokeWidth="5" />
                  <line x1="132" y1="143" x2="112" y2="152" strokeWidth="5" />
                  {/* Dot eyes */}
                  <ellipse cx="79" cy="158" rx="4" ry="4" fill="#141416" />
                  <ellipse cx="121" cy="158" rx="4" ry="4" fill="#141416" />
                  {/* Straight grimace with teeth lines */}
                  <line x1="82" y1="175" x2="118" y2="175" strokeWidth="5" />
                  <line x1="91" y1="172" x2="91" y2="178" strokeWidth="3" />
                  <line x1="100" y1="172" x2="100" y2="178" strokeWidth="3" />
                  <line x1="109" y1="172" x2="109" y2="178" strokeWidth="3" />
                </g>
              )}

              {expression === 'devilish' && (
                <g stroke="#141416" strokeLinecap="round" fill="#141416">
                  {/* Sharp horns inside or brows */}
                  <path d="M65 142 L88 150" strokeWidth="5" />
                  <path d="M135 142 L112 150" strokeWidth="5" />
                  {/* Glowing mischievous slit eyes */}
                  <ellipse cx="78" cy="156" rx="6" ry="3.5" fill="#FFEAA7" stroke="#141416" strokeWidth="3" />
                  <ellipse cx="122" cy="156" rx="6" ry="3.5" fill="#FFEAA7" stroke="#141416" strokeWidth="3" />
                  {/* Wide smirk mouth */}
                  <path d="M80 172 Q100 192 120 172" strokeWidth="5" fill="none" />
                </g>
              )}
            </g>
          </g>

          {/* Flask Outer Glass Outline (Thick, rounded, premium) */}
          <path
            d="M80 30 H120 V85 L168 185 C176 202 164 220 146 220 H54 C36 220 24 202 32 185 L80 85 Z"
            stroke="url(#glassOutline)"
            strokeWidth="9"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
          />

          {/* Flask Rim at Top */}
          <rect
            x="74"
            y="23"
            width="52"
            height="10"
            rx="5"
            fill="#FFFFFF"
            stroke="#D8D2C5"
            strokeWidth="2"
          />

          {/* Glass Surface Curved Highlight Reflection (Left flank) */}
          <path
            d="M48 185 L86 100"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.45"
          />
        </svg>
      </motion.div>
    </div>
  );
};

