import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight, FlaskConical, Lock, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { HostPortrait } from '../components/HostPortrait';
import { ProgressionTracker } from '../components/ProgressionTracker';
import { PrimaryButton } from '../components/PrimaryButton';
import { BrushUnderline } from '../components/TornPaperBanner';
import { BottomGlowWave } from '../components/BottomGlowWave';
import { useProgress } from '../context/ProgressContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { progress, getCurrentExperimentRoute } = useProgress();

  const handleEnterLab = () => {
    navigate(getCurrentExperimentRoute());
  };

  const hasProgress = progress.completedExperiments.length > 0;

  return (
    <div className="min-h-screen bg-background text-primary-text flex flex-col justify-between relative overflow-x-hidden pb-16 selection:bg-primary-orange selection:text-white">
      {/* Background ambient radial glow centered behind portrait */}
      <div className="fixed top-10 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-primary-orange/15 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Header */}
      <Header />

      {/* Main Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-md mx-auto w-full text-center z-10 py-3 sm:py-6">
        {/* Personal Portrait with Crown Doodle & Brush Stroke Aura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-1 mb-3 sm:mb-4"
        >
          <HostPortrait />
        </motion.div>

        {/* Hero Heading: "Let’s see if we can be friends or not." */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="my-2"
        >
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white leading-[1.15]">
            Let’s see if we can be <br />
            <span className="text-primary-orange italic inline-block relative font-black">
              friends
              <BrushUnderline className="w-24 sm:w-28 mt-0.5" />
            </span>{' '}
            or not.
          </h1>
        </motion.div>

        {/* Supporting Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-secondary-text text-xs sm:text-sm md:text-base font-normal max-w-xs sm:max-w-sm mx-auto my-2 sm:my-3 leading-relaxed"
        >
          A series of 4 experiments that get progressively more annoying, confusing, and personal.
        </motion.p>

        {/* 4 Flasks Progression Preview in Rounded Container */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="w-full my-1 sm:my-2"
        >
          <ProgressionTracker variant="rounded-banner" activeExpId={progress.currentExperiment} />
        </motion.div>

        {/* Primary CTA: "▶ Enter the Lab →" */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="w-full max-w-xs sm:max-w-sm mt-3 sm:mt-4 px-2"
        >
          <PrimaryButton
            size="lg"
            onClick={handleEnterLab}
            icon={<Play className="w-5 h-5 fill-white text-white" />}
            rightIcon={<ArrowRight className="w-5 h-5 text-white" />}
          >
            {hasProgress ? `Resume Lab (Exp 0${progress.currentExperiment})` : 'Enter the Lab'}
          </PrimaryButton>
        </motion.div>

        {/* Supporting Information (3 items: 6 Experiments, One by One, No Cheating) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-4 sm:mt-5 flex items-center justify-center gap-3 sm:gap-4 text-xs font-mono text-secondary-text select-none"
        >
          <div className="flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5 text-primary-orange flex-shrink-0" />
            <span className="text-secondary-text">6 Experiments</span>
          </div>

          <span className="text-border-lab">•</span>

          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-primary-orange flex-shrink-0" />
            <span className="text-secondary-text">One by One</span>
          </div>

          <span className="text-border-lab">•</span>

          <div className="flex items-center gap-1.5">
            <Gamepad2 className="w-3.5 h-3.5 text-primary-orange flex-shrink-0" />
            <span className="text-secondary-text">No Cheating</span>
          </div>
        </motion.div>
      </main>

      {/* Atmospheric Neon Orange Glowing Curved Bottom Wave */}
      <BottomGlowWave />
    </div>
  );
};
