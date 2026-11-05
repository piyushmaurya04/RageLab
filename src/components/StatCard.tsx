import React from 'react';
import { Timer, MousePointer2 } from 'lucide-react';

interface StatItem {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}

interface StatCardProps {
  left: StatItem;
  right: StatItem;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ left, right, className = '' }) => {
  return (
    <div
      className={`w-full max-w-sm mx-auto bg-[#18181E] border border-border-lab rounded-2xl p-4 shadow-lg ${className}`}
    >
      <div className="grid grid-cols-2 divide-x divide-border-lab">
        {/* Left Stat */}
        <div className="flex flex-col items-start px-3">
          <div className="flex items-center gap-2 text-primary-orange text-xs sm:text-sm font-medium">
            {left.icon || <Timer className="w-4 h-4" />}
            <span className="text-secondary-text font-sans">{left.label}</span>
          </div>
          <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
            {left.value}
          </span>
        </div>

        {/* Right Stat */}
        <div className="flex flex-col items-start px-4">
          <div className="flex items-center gap-2 text-primary-orange text-xs sm:text-sm font-medium">
            {right.icon || (
              <div className="relative">
                <MousePointer2 className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 text-[10px] text-primary-orange">✦</span>
              </div>
            )}
            <span className="text-secondary-text font-sans">{right.label}</span>
          </div>
          <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
            {right.value}
          </span>
        </div>
      </div>
    </div>
  );
};

