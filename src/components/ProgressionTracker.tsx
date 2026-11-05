import React from 'react';
import { Check } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface ProgressionTrackerProps {
  variant?: 'banner' | 'rounded-banner' | 'stepper';
  activeExpId?: number;
}

export const ProgressionTracker: React.FC<ProgressionTrackerProps> = ({
  variant = 'stepper',
  activeExpId,
}) => {
  const { progress } = useProgress();
  const currentExp = activeExpId || progress.currentExperiment;
  const completedList = progress.completedExperiments;

  if (variant === 'banner' || variant === 'rounded-banner') {
    const isRounded = variant === 'rounded-banner';

    return (
      <div className="relative mx-auto my-2 px-2 max-w-sm sm:max-w-md w-full select-none">
        {/* Container */}
        <div
          className={`
            py-2.5 px-3.5 shadow-lg
            ${
              isRounded
                ? 'rounded-2xl bg-[#181820] border border-[#2E2E38]'
                : 'torn-edge bg-[#1E1E23] border-y border-[#363640]'
            }
          `}
        >
          <div className="flex items-center justify-between gap-1">
            {[1, 2, 3, 4].map((id, index) => {
              const isDone = completedList.includes(id);
              const isCurrent = id === currentExp;
              const isPastOrCurrent = isDone || isCurrent;

              return (
                <React.Fragment key={id}>
                  {/* Flask Icon with Number inside */}
                  <div className="relative flex flex-col items-center justify-center">
                    <svg
                      viewBox="0 0 32 38"
                      className={`w-7 h-8 transition-transform ${
                        isCurrent
                          ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,91,53,0.8)]'
                          : isDone
                          ? 'text-primary-orange opacity-90'
                          : 'text-secondary-text/50 opacity-35'
                      }`}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Flask outline */}
                      <path
                        d="M12 4H20M16 4V13L25 29C26.5 31.5 24.8 34 22 34H10C7.2 34 5.5 31.5 7 29L16 13"
                        stroke={isPastOrCurrent ? '#FF5B35' : '#72707B'}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill={isCurrent ? '#FF5B35' : isDone ? 'rgba(255, 91, 53, 0.35)' : 'none'}
                      />
                      {/* Number */}
                      <text
                        x="16"
                        y="27"
                        textAnchor="middle"
                        fill={isCurrent ? '#FFFFFF' : isPastOrCurrent ? '#FF9A6C' : '#888590'}
                        fontSize="11"
                        fontWeight="700"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {id}
                      </text>
                    </svg>
                  </div>

                  {/* Subtle Separator between flasks */}
                  {index < 3 && (
                    <div
                      className={`flex-1 border-t-2 border-dashed mx-1 ${
                        isDone ? 'border-primary-orange/60' : 'border-[#383844]'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Stepper variant seen on experiment pages (dots connected by horizontal line)
  return (
    <div className="w-full max-w-sm mx-auto my-3 px-4 select-none">
      <div className="relative flex items-center justify-between">
        {/* Background connector track */}
        <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-[2px] bg-[#2E2E36] z-0" />

        {/* Foreground completed track */}
        <div
          className="absolute left-2 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-primary-orange to-secondary-orange z-0 transition-all duration-300"
          style={{
            width: `${Math.min(
              100,
              Math.max(0, ((currentExp - 1) / 3) * 100)
            )}%`,
          }}
        />

        {[1, 2, 3, 4].map((id) => {
          const isDone = completedList.includes(id);
          const isCurrent = id === currentExp;

          return (
            <div key={id} className="relative z-10 flex items-center justify-center">
              {isDone ? (
                <div className="w-5 h-5 rounded-full bg-primary-orange flex items-center justify-center text-white shadow-[0_0_8px_rgba(255,91,53,0.6)]">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              ) : isCurrent ? (
                <div className="relative flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary-orange shadow-[0_0_10px_rgba(255,91,53,0.9)]" />
                  <div className="absolute inset-0 -m-1 rounded-full border border-primary-orange/60 animate-ping opacity-60" />
                </div>
              ) : (
                <div className="w-3.5 h-3.5 rounded-full bg-[#18181E] border-2 border-[#383842]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
