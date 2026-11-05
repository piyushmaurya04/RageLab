import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { StatCard } from '../StatCard';
import { PrimaryButton } from '../PrimaryButton';
import { CompletionBanner, HighlightedTornStrip, BrushUnderline } from '../TornPaperBanner';
import { FlaskCharacter } from '../FlaskCharacter';

interface TrustResultProps {
  status: 'success' | 'failed';
  timeSurvived: number;
  clickCount?: number;
  onNext: () => void;
}

export const TrustResult: React.FC<TrustResultProps> = ({
  status,
  timeSurvived,
  onNext,
}) => {
  const isSuccess = status === 'success';

  if (isSuccess) {
    return (
      <motion.div
        key="success-result"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="flex flex-col items-center max-w-sm mx-auto w-full text-center"
      >
        <CompletionBanner expNumber={1} title="Completed!" />

        <FlaskCharacter expression="winking" size="md" className="my-1" />

        {/* Success Headlines */}
        <div className="my-2">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
            Finally! You trusted a <br />
            <span className="text-[#34C759]">right person</span> in your life.
          </h2>
          <p className="text-secondary-text text-xs sm:text-sm mt-2 leading-relaxed">
            You listened to the one who had your back. Rare achievement.
          </p>
        </div>

        {/* Stats without any Clicks */}
        <StatCard
          className="my-3"
          left={{
            label: 'Time Survived',
            value: `${timeSurvived > 0 ? timeSurvived.toFixed(1) : '20.0'}s`,
          }}
          right={{
            icon: <ShieldCheck className="w-4 h-4 text-[#34C759]" />,
            label: 'Self-Control',
            value: '100%',
          }}
        />

        <HighlightedTornStrip
          prefix="Trust evaluation:"
          highlightedText="Sahi Ja rahe Ho"
        />

        {/* Next Experiment CTA */}
        <div className="w-full mt-4 px-2">
          <PrimaryButton
            size="lg"
            onClick={onNext}
            icon={<ArrowRight className="w-5 h-5 text-white" />}
          >
            Next Experiment →
          </PrimaryButton>
        </div>
      </motion.div>
    );
  }

  // Failure outcome (No clicks displayed, only Time Survived and Patience Level)
  return (
    <motion.div
      key="failure-result"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      className="flex flex-col items-center max-w-sm mx-auto w-full text-center"
    >
      <FlaskCharacter expression="dead" size="md" className="my-1" />

      {/* Experiment pill */}
      <div className="font-mono text-xs font-semibold px-4 py-1 rounded-full border border-border-lab text-secondary-text my-1">
        Experiment 01 • Trust Test
      </div>

      {/* Failure Headlines */}
      <div className="my-2">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
          Again, you trusted a <br />
          <span className="text-primary-orange inline-block relative">
            wrong person in your Life.
            <BrushUnderline className="w-48 sm:w-56 mt-0.5" />
          </span>
        </h2>
        <p className="text-secondary-text text-xs sm:text-sm mt-2 leading-relaxed">
          They said “just one click”… and you believed them.
        </p>
      </div>

      {/* Stats without any Clicks */}
      <StatCard
        className="my-3"
        left={{
          label: 'Time Survived',
          value: `${timeSurvived.toFixed(1)}s`,
        }}
        right={{
          icon: <AlertTriangle className="w-4 h-4 text-primary-orange" />,
          label: 'Patience Level',
          value: 'Critical',
        }}
      />

      <HighlightedTornStrip
        prefix="Trust Rating:"
        highlightedText="Aise Nahi Ho Payega"
      />

      {/* Next Experiment CTA */}
      <div className="w-full mt-4 px-2">
        <PrimaryButton
          size="lg"
          onClick={onNext}
          icon={<ArrowRight className="w-5 h-5 text-white" />}
        >
          Next Experiment →
        </PrimaryButton>
      </div>
    </motion.div>
  );
};
