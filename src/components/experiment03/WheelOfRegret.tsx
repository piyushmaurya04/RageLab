import React from 'react';
import { motion } from 'framer-motion';
import { WHEEL_SEGMENTS, WheelSegment } from '../../data/wheelOfRegretData';

interface WheelOfRegretProps {
  rotation: number;
  isSpinning: boolean;
  onSpinEnd?: () => void;
  className?: string;
}

export const WheelOfRegret: React.FC<WheelOfRegretProps> = ({
  rotation,
  isSpinning,
  onSpinEnd,
  className = '',
}) => {
  const CENTER = 160;
  const RADIUS = 140;
  const NUM_SEGMENTS = 8;
  const ANGLE_PER_SEGMENT = 360 / NUM_SEGMENTS; // 45 degrees

  // Helper to calculate SVG arc path for a sector
  const getSectorPath = (index: number) => {
    const startAngle = index * ANGLE_PER_SEGMENT;
    const endAngle = (index + 1) * ANGLE_PER_SEGMENT;

    const rad1 = (startAngle * Math.PI) / 180;
    const rad2 = (endAngle * Math.PI) / 180;

    const x1 = CENTER + RADIUS * Math.sin(rad1);
    const y1 = CENTER - RADIUS * Math.cos(rad1);

    const x2 = CENTER + RADIUS * Math.sin(rad2);
    const y2 = CENTER - RADIUS * Math.cos(rad2);

    return `M ${CENTER} ${CENTER} L ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 -m-8 rounded-full bg-primary-orange/20 blur-3xl pointer-events-none" />

      {/* Outer Wheel Container */}
      <div className="relative w-[320px] h-[320px] xs:w-[350px] xs:h-[350px] sm:w-[400px] sm:h-[400px] max-w-[92vw] aspect-square flex items-center justify-center">
        {/* Fixed Needle Pointer at the Top */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]">
          <svg width="38" height="44" viewBox="0 0 34 40" fill="none">
            {/* Pointer shadow/mount */}
            <circle cx="17" cy="9" r="7" fill="#1C1820" stroke="#FF5B35" strokeWidth="2.5" />
            <circle cx="17" cy="9" r="3" fill="#FF7A24" />
            {/* Arrow needle pointing downward */}
            <path
              d="M17 38 L9 13 C9 9 25 9 25 13 Z"
              fill="url(#needleGrad)"
              stroke="#FFF"
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient id="needleGrad" x1="17" y1="9" x2="17" y2="38" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF7A24" />
                <stop offset="0.7" stopColor="#FF4211" />
                <stop offset="1" stopColor="#D92805" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Rotating Wheel Disc */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{
            duration: 4.4,
            ease: [0.12, 0.8, 0.22, 1], // Smooth progressive deceleration
          }}
          onAnimationComplete={() => {
            if (isSpinning && onSpinEnd) {
              onSpinEnd();
            }
          }}
          className="relative w-full h-full rounded-full shadow-[0_12px_45px_rgba(0,0,0,0.7),0_0_30px_rgba(255,91,53,0.2)]"
        >
          <svg viewBox="0 0 320 320" className="w-full h-full">
            <defs>
              {/* Outer rim metallic gradient */}
              <linearGradient id="rimGrad" x1="0" y1="0" x2="320" y2="320" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3A3A46" />
                <stop offset="50%" stopColor="#1E1E24" />
                <stop offset="100%" stopColor="#2A2A34" />
              </linearGradient>

              {/* Hub center gradient */}
              <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#30303A" />
                <stop offset="70%" stopColor="#16161B" />
                <stop offset="100%" stopColor="#0E0E12" />
              </radialGradient>
            </defs>

            {/* Outer Rim Ring */}
            <circle cx={CENTER} cy={CENTER} r={RADIUS + 8} fill="url(#rimGrad)" stroke="#4A4A58" strokeWidth="3" />

            {/* 8 Wheel Sectors */}
            {WHEEL_SEGMENTS.map((seg, index) => {
              const midAngle = index * ANGLE_PER_SEGMENT + ANGLE_PER_SEGMENT / 2;

              return (
                <g key={seg.id}>
                  {/* Sector Wedge */}
                  <path
                    d={getSectorPath(index)}
                    fill={seg.bgColor}
                    stroke="#111116"
                    strokeWidth="2.5"
                  />

                  {/* Highlight overlay for target "TRY AGAIN" */}
                  {seg.isTarget && (
                    <path
                      d={getSectorPath(index)}
                      fill="#FF0000"
                      opacity="0.1"
                    />
                  )}

                  {/* Radially oriented content: Icons for all, TEXT for "TRY AGAIN" */}
                  <g transform={`rotate(${midAngle}, ${CENTER}, ${CENTER})`}>
                    {/* Small decorative dot near rim */}
                    <circle cx={CENTER} cy={CENTER - RADIUS + 14} r="2.5" fill={seg.accentColor || '#FFF'} opacity="0.8" />

                    {/* Keep TEXT only for TRY AGAIN (segment 5) */}
                    {seg.id === 5 ? (
                      <text
                        x={CENTER}
                        y={CENTER - RADIUS + 46}
                        fill="#FFFFFF"
                        fontSize="13"
                        fontWeight="900"
                        fontFamily="Space Grotesk, sans-serif"
                        letterSpacing="0.05em"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase"
                      >
                        TRY AGAIN
                      </text>
                    ) : (
                      /* Icons for all other segments */
                      <g
                        transform={`translate(${CENTER}, ${CENTER - RADIUS + 46})`}
                        className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
                      >
                        {/* 0: ₹10,000 (Gold Coin with Rupee) */}
                        {seg.id === 0 && (
                          <g>
                            <circle cx="0" cy="0" r="13.5" fill="#FACC15" fillOpacity="0.2" stroke="#FACC15" strokeWidth="2" />
                            <circle cx="0" cy="0" r="10.5" fill="none" stroke="#FACC15" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.7" />
                            <text
                              x="0"
                              y="1"
                              fill="#FACC15"
                              fontSize="15"
                              fontWeight="900"
                              fontFamily="Space Grotesk, sans-serif"
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              ₹
                            </text>
                          </g>
                        )}

                        {/* 1: iPhone (Smartphone) */}
                        {seg.id === 1 && (
                          <g>
                            <rect x="-8.5" y="-14" width="17" height="28" rx="3.5" fill="#FFFFFF" fillOpacity="0.18" stroke="#FFFFFF" strokeWidth="2" />
                            <line x1="-3" y1="-10.5" x2="3" y2="-10.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                            <circle cx="0" cy="9.5" r="1.5" fill="#FFFFFF" />
                            <line x1="-5.5" y1="-7" x2="5.5" y2="-7" stroke="#FF5B35" strokeWidth="1" strokeOpacity="0.5" />
                          </g>
                        )}

                        {/* 2: JACKPOT (Royal Crown) */}
                        {seg.id === 2 && (
                          <g>
                            <path d="M-13 7 L-11 -6 L-3 1 L0 -9 L3 1 L11 -6 L13 7 Z" fill="#FDE047" fillOpacity="0.22" stroke="#FDE047" strokeWidth="2" strokeLinejoin="round" />
                            <circle cx="-11" cy="-6" r="1.8" fill="#FDE047" />
                            <circle cx="0" cy="-9" r="1.8" fill="#FDE047" />
                            <circle cx="11" cy="-6" r="1.8" fill="#FDE047" />
                            <rect x="-13" y="7" width="26" height="3" rx="1" fill="#FDE047" />
                          </g>
                        )}

                        {/* 3: FREE GIFT (Gift Box) */}
                        {seg.id === 3 && (
                          <g>
                            <rect x="-11" y="-3" width="22" height="15" rx="1.5" fill="#38BDF8" fillOpacity="0.18" stroke="#38BDF8" strokeWidth="2" />
                            <rect x="-13" y="-8" width="26" height="5" rx="1" fill="#38BDF8" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="2" />
                            <line x1="0" y1="-8" x2="0" y2="12" stroke="#38BDF8" strokeWidth="2" />
                            <path d="M-5 -12 C-7 -15 -1 -15 0 -8 C1 -15 7 -15 5 -12" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                          </g>
                        )}

                        {/* 4: BETTER LUCK (Broken Heart) */}
                        {seg.id === 4 && (
                          <g>
                            <path d="M0 11 L-9 2 C-13 -2 -8 -10 -1 -6 L1 -3 L-2 0 L3 4 L0 7 L1 8 Z" fill="#D1D5DB" fillOpacity="0.2" stroke="#D1D5DB" strokeWidth="1.8" strokeLinejoin="round" />
                            <path d="M0 11 L9 2 C13 -2 8 -10 1 -6 L-1 -3 L2 0 L-3 4 L0 7 L-1 8 Z" fill="#D1D5DB" fillOpacity="0.2" stroke="#D1D5DB" strokeWidth="1.8" strokeLinejoin="round" />
                          </g>
                        )}

                        {/* 6: ALMOST! (Bullseye Target) */}
                        {seg.id === 6 && (
                          <g>
                            <circle cx="0" cy="0" r="12" fill="#FB923C" fillOpacity="0.18" stroke="#FB923C" strokeWidth="2" />
                            <circle cx="0" cy="0" r="7" fill="none" stroke="#FB923C" strokeWidth="1.8" />
                            <circle cx="0" cy="0" r="2.8" fill="#FB923C" />
                            <line x1="-15" y1="0" x2="-11" y2="0" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
                            <line x1="11" y1="0" x2="15" y2="0" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
                            <line x1="0" y1="-15" x2="0" y2="-11" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
                            <line x1="0" y1="11" x2="0" y2="15" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
                          </g>
                        )}

                        {/* 7: ONE MORE CHANCE (Lucky Dice) */}
                        {seg.id === 7 && (
                          <g>
                            <rect x="-11" y="-11" width="22" height="22" rx="4" fill="#E4E4E7" fillOpacity="0.18" stroke="#E4E4E7" strokeWidth="2" />
                            <circle cx="-5" cy="-5" r="1.8" fill="#E4E4E7" />
                            <circle cx="5" cy="-5" r="1.8" fill="#E4E4E7" />
                            <circle cx="0" cy="0" r="1.8" fill="#E4E4E7" />
                            <circle cx="-5" cy="5" r="1.8" fill="#E4E4E7" />
                            <circle cx="5" cy="5" r="1.8" fill="#E4E4E7" />
                          </g>
                        )}
                      </g>
                    )}
                  </g>
                </g>
              );
            })}

            {/* Rim Golden Pegs (8 pegs on boundaries) */}
            {WHEEL_SEGMENTS.map((_, i) => {
              const angle = (i * ANGLE_PER_SEGMENT * Math.PI) / 180;
              const pegX = CENTER + (RADIUS + 2) * Math.sin(angle);
              const pegY = CENTER - (RADIUS + 2) * Math.cos(angle);

              return (
                <circle
                  key={`peg-${i}`}
                  cx={pegX}
                  cy={pegY}
                  r="3.5"
                  fill="#FFD700"
                  stroke="#78350F"
                  strokeWidth="1"
                  className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                />
              );
            })}

            {/* Center Decorative Hub */}
            <circle cx={CENTER} cy={CENTER} r="34" fill="url(#hubGrad)" stroke="#FF5B35" strokeWidth="3.5" />
            <circle cx={CENTER} cy={CENTER} r="28" fill="#141418" stroke="#33333F" strokeWidth="1.5" />

            {/* Center Flask Icon / Emblem */}
            <g transform={`translate(${CENTER - 11}, ${CENTER - 12})`} className="opacity-95 pointer-events-none">
              <path
                d="M8 2H14M11 2V7L17 18C17.8 19.5 16.7 21.5 15 21.5H7C5.3 21.5 4.2 19.5 5 18L11 7"
                stroke="#FF5B35"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M7 16L7.5 20.5C7.5 20.5 9 21 11 21C13 21 14.5 20.5 14.5 20.5L15 16Z"
                fill="#FF7A24"
              />
            </g>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

