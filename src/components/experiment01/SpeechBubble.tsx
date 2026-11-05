import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SpeechLine {
  highlight?: string;
  prefix?: string;
  main: string;
}

interface SpeechBubbleProps {
  variant: 'orange' | 'purple';
  line: SpeechLine;
  className?: string;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ variant, line, className = '' }) => {
  const isOrange = variant === 'orange';

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Speech bubble container */}
      <motion.div
        layout
        className={`
          relative px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl sm:rounded-3xl border-2 shadow-lg min-h-[58px] sm:min-h-[64px] flex items-center justify-center text-center
          ${
            isOrange
              ? 'bg-[#FFF7F0] border-[#FF7A24] text-[#1E1712] shadow-[0_6px_18px_rgba(255,106,26,0.25)]'
              : 'bg-[#F9F5FF] border-[#8B5CF6] text-[#1C1628] shadow-[0_6px_18px_rgba(139,92,246,0.25)]'
          }
        `}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={line.main + (line.highlight || '')}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center leading-tight font-heading"
          >
            {/* Top row */}
            <div className="text-xs sm:text-sm font-extrabold flex items-center gap-1 justify-center whitespace-nowrap">
              {line.highlight && (
                <span className={isOrange ? 'text-primary-orange' : 'text-[#FF4211]'}>
                  {line.highlight}
                </span>
              )}
              {line.prefix && <span>{line.prefix}</span>}
            </div>

            {/* Bottom/Main text */}
            <div
              className={`text-xs sm:text-sm font-extrabold whitespace-nowrap ${
                isOrange ? 'text-primary-orange' : 'text-[#1C1628]'
              }`}
            >
              {line.main}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bubble Tail pointing to the character */}
        <div
          className={`
            absolute -bottom-2 w-3.5 h-3.5 rotate-45 border-r-2 border-b-2
            ${
              isOrange
                ? 'right-6 bg-[#FFF7F0] border-[#FF7A24]'
                : 'left-6 bg-[#F9F5FF] border-[#8B5CF6]'
            }
          `}
        />
      </motion.div>
    </div>
  );
};

