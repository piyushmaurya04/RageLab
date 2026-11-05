import React from 'react';
import { motion } from 'framer-motion';

interface GlowingRedButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const GlowingRedButton: React.FC<GlowingRedButtonProps> = ({ onClick, disabled }) => {
  return (
    <div className="relative flex items-center justify-center my-3 sm:my-5 select-none">
      {/* Outer ambient red radial glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.65, 0.9, 0.65],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-red-600/35 blur-2xl pointer-events-none"
      />

      {/* Button Bevel Ring & Dome */}
      <motion.button
        type="button"
        disabled={disabled}
        onClick={onClick}
        whileHover={disabled ? undefined : { scale: 1.03 }}
        whileTap={disabled ? undefined : { scale: 0.94 }}
        aria-label="Press Here"
        className="
          relative w-48 h-48 sm:w-56 sm:h-56 rounded-full cursor-pointer
          p-2.5 sm:p-3
          bg-gradient-to-b from-[#FF4D3E] via-[#D81E15] to-[#8C0C04]
          shadow-[0_14px_35px_rgba(230,30,20,0.65),0_0_50px_rgba(255,50,30,0.4)]
          border border-red-400/40
          transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-orange
          flex items-center justify-center
        "
      >
        {/* Inner 3D spherical dome with specular gradient */}
        <div
          className="
            w-full h-full rounded-full
            bg-gradient-to-b from-[#FF5C4D] via-[#E82B1E] to-[#B3140A]
            shadow-[inset_0_4px_12px_rgba(255,255,255,0.4),inset_0_-8px_16px_rgba(0,0,0,0.5)]
            relative overflow-hidden flex items-center justify-center
          "
        >
          {/* Subtle top crescent reflection */}
          <div className="absolute top-2 left-6 right-6 h-14 rounded-full bg-gradient-to-b from-white/35 to-transparent blur-[1px] pointer-events-none" />

          {/* "Press Here" Text */}
          <span className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] z-10 select-none">
            Press Here
          </span>
        </div>
      </motion.button>
    </div>
  );
};
