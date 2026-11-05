import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface CountdownTimerProps {
  timeLeft: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeLeft }) => {
  return (
    <div className="relative inline-flex items-center justify-center select-none my-1">
      {/* Left little energy spark rays */}
      <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 pointer-events-none opacity-80">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <line x1="12" y1="9" x2="2" y2="5" stroke="#FF7A24" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="12" y1="12" x2="3" y2="15" stroke="#FF7A24" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Center pill capsule */}
      <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#181820] border border-[#30303A] shadow-[0_6px_20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
        <TimerIcon className="w-5 h-5 text-primary-orange animate-pulse" />
        <span className="font-heading font-extrabold text-xl sm:text-2xl text-primary-orange tracking-tight tabular-nums">
          {timeLeft.toFixed(1)}s
        </span>
      </div>

      {/* Right little energy spark rays */}
      <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 pointer-events-none opacity-80">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <line x1="2" y1="9" x2="12" y2="5" stroke="#FF7A24" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="2" y1="12" x2="11" y2="15" stroke="#FF7A24" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

