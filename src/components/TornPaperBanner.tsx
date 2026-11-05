import React from 'react';
import { Check } from 'lucide-react';

interface CompletionBannerProps {
  expNumber: number;
  title?: string;
}

export const CompletionBanner: React.FC<CompletionBannerProps> = ({
  expNumber,
  title = 'Completed!',
}) => {
  return (
    <div className="relative mx-auto my-2 px-4 max-w-xs sm:max-w-sm w-full select-none">
      {/* Confetti sprinkle marks around banner */}
      <div className="absolute -top-3 -left-2 w-3 h-1 bg-lab-purple rotate-45 rounded-full" />
      <div className="absolute -top-4 left-6 w-2.5 h-1 bg-primary-orange -rotate-12 rounded-full" />
      <div className="absolute top-2 -left-3 w-3 h-1 bg-acid-yellow rotate-90 rounded-full" />
      <div className="absolute -top-3 -right-2 w-3 h-1 bg-primary-orange -rotate-45 rounded-full" />
      <div className="absolute -top-4 right-6 w-2 h-1 bg-acid-yellow rotate-12 rounded-full" />
      <div className="absolute top-2 -right-3 w-3 h-1 bg-lab-purple -rotate-90 rounded-full" />

      {/* Torn Parchment Paper */}
      <div className="torn-edge bg-[#ECE5D4] text-[#141416] py-3.5 px-6 shadow-[0_12px_28px_rgba(0,0,0,0.5)] transform -rotate-1">
        <div className="flex items-center justify-center gap-3">
          {/* Green Check circle */}
          <div className="w-8 h-8 rounded-full bg-[#34C759] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
            <Check className="w-5 h-5 stroke-[3]" />
          </div>

          <div className="flex flex-col text-left">
            <span className="font-mono text-xs uppercase tracking-wider text-[#4A473E] font-bold">
              Experiment 0{expNumber}
            </span>
            <span className="font-heading font-extrabold text-2xl text-[#141416] tracking-tight leading-none mt-0.5">
              {title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TornNoteProps {
  prefix: string;
  highlightedText: string;
}

export const HighlightedTornStrip: React.FC<TornNoteProps> = ({ prefix, highlightedText }) => {
  return (
    <div className="relative mx-auto my-2 px-2 max-w-sm w-full select-none">
      <div className="torn-edge bg-[#1E1E23] border-y border-[#363640] py-2.5 px-5 shadow-lg flex items-center justify-center">
        <p className="font-sans font-medium text-sm sm:text-base text-[#F0EDE6] tracking-wide text-center">
          {prefix}{' '}
          <span className="relative inline-block px-1.5 py-0.5 font-bold text-background font-mono bg-acid-yellow rounded-sm transform -rotate-1 shadow-sm">
            {highlightedText}
          </span>
        </p>
      </div>
    </div>
  );
};

export const BrushUnderline: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 160 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-32 sm:w-40 h-3 text-primary-orange mx-auto -mt-1 ${className}`}
    >
      <path
        d="M3 11C35 4 80 14 157 6C130 9 70 8 20 13"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

