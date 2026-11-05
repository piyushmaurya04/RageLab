import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Frown, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExperimentLayout } from '../components/ExperimentLayout';
import { WheelOfRegret } from '../components/experiment03/WheelOfRegret';
import { PrimaryButton } from '../components/PrimaryButton';
import { CompletionBanner, BrushUnderline } from '../components/TornPaperBanner';
import { useProgress } from '../context/ProgressContext';
import { SPIN_STAGES } from '../data/wheelOfRegretData';

export const Experiment03: React.FC = () => {
  const navigate = useNavigate();
  const { completeExperiment, isCompleted } = useProgress();

  // If already completed in history, lock to completed state permanently (1 play only)
  const alreadyCompleted = isCompleted(3);

  // Game phases: 'intro' | 'playing' | 'completed'
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'completed'>(() =>
    alreadyCompleted ? 'completed' : 'intro'
  );

  useEffect(() => {
    if (isCompleted(3) && gameState !== 'completed') {
      setGameState('completed');
    }
  }, [isCompleted, gameState]);

  // Spin tracking: 0 = not spun yet, 1 = completed spin 1, 2 = completed spin 2, 3 = completed spin 3
  const [currentSpin, setCurrentSpin] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showResultBadge, setShowResultBadge] = useState<boolean>(false);

  const transitionTimeoutRef = useRef<number | null>(null);

  // Targets deterministic landing on segment 5 ("TRY AGAIN")
  // Midpoint of segment 5 is at 247.5 degrees.
  // With pointer at 0 (top), rotation theta satisfies: (247.5 + theta) % 360 = 0 => theta % 360 = 112.5 deg.
  const calculateNextRotation = (targetSpinNumber: number, currentRot: number): number => {
    const BASE_TARGET_DEG = 112.5;

    // Small deterministic micro-offsets for natural realism while strictly within TRY AGAIN segment (45 deg wide)
    const JITTERS: Record<number, number> = {
      1: 0.5,
      2: -1.0,
      3: 0.8,
    };
    const jitter = JITTERS[targetSpinNumber] || 0;

    // Minimum full revolutions per spin: Spin 1: 5 revs, Spin 2: 5 revs, Spin 3: 6 revs
    const fullRevs = targetSpinNumber === 3 ? 6 : 5;
    const additionalDegrees = fullRevs * 360;

    // Find the next target angle > currentRot with modulo matching (BASE_TARGET_DEG + jitter)
    const baseNext = currentRot + additionalDegrees;
    const currentModulo = baseNext % 360;
    const targetModulo = (BASE_TARGET_DEG + jitter + 360) % 360;
    const adjustment = (targetModulo - currentModulo + 360) % 360;

    return baseNext + adjustment;
  };

  const handleStartSpin = () => {
    if (isSpinning || currentSpin >= 3) return;

    const nextSpinNumber = currentSpin + 1;
    setIsSpinning(true);
    setShowResultBadge(false);
    setFeedback(null);

    const nextRot = calculateNextRotation(nextSpinNumber, rotation);
    setRotation(nextRot);
  };

  const handleSpinEnd = () => {
    const completedSpinNumber = currentSpin + 1;
    setCurrentSpin(completedSpinNumber);
    setIsSpinning(false);
    setShowResultBadge(true);

    const stageConfig = SPIN_STAGES[completedSpinNumber];
    if (stageConfig) {
      setFeedback(stageConfig.feedback);
    }

    if (completedSpinNumber >= 3) {
      // Pause ~1.2s then transition to final ragebait screen
      transitionTimeoutRef.current = window.setTimeout(() => {
        setGameState('completed');
        completeExperiment(3, {
          completed: true,
          spins: 3,
          finalOutcome: 'TRY AGAIN',
        });

        try {
          confetti({
            particleCount: 80,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#FF5B35', '#DC2626', '#FACC15', '#8B70FF'],
          });
        } catch {
          // Ignore confetti errors if unsupported
        }
      }, 1250);
    }
  };

  const handleContinueToNext = () => {
    navigate('/experiments/loading-transition');
  };

  return (
    <ExperimentLayout expId={3}>
      <AnimatePresence mode="wait">
        {/* 1. INTRO SCREEN */}
        {gameState === 'intro' && (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-2"
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-orange/10 border border-primary-orange/30 text-primary-orange text-xs font-mono font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary-orange animate-pulse" />
              <span>EXPERIMENT 03 / 04</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-2">
              SPIN THE WHEEL
              <br />
              <span className="text-primary-orange relative inline-block">
                OF REGRET
                <BrushUnderline className="text-primary-orange -bottom-2" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 font-medium text-base sm:text-lg mt-3 mb-2">
              Three spins. One chance to change your life.
            </p>

            {/* Description */}
            <p className="text-gray-400 text-sm max-w-sm mb-8 leading-relaxed">
              Spin for a reward. Maybe today is finally your lucky day.
            </p>

            {/* Primary CTA */}
            <div className="w-full max-w-xs sm:max-w-sm">
              <PrimaryButton
                onClick={() => setGameState('playing')}
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5 flex-shrink-0" />}
                className="w-full uppercase font-bold tracking-wider"
              >
                SPIN THE WHEEL
              </PrimaryButton>
            </div>
          </motion.div>
        )}

        {/* 2. PLAYING / WHEEL SCREEN */}
        {gameState === 'playing' && (
          <motion.div
            key="wheel-screen"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex flex-col items-center justify-center w-full max-w-lg mx-auto"
          >
            {/* Spin Counter Indicator */}
            <div className="flex items-center justify-center w-full px-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                SPIN {Math.min(currentSpin + (isSpinning ? 1 : currentSpin < 3 ? 1 : 0), 3)} OF 3
              </span>
            </div>

            {/* Wheel Canvas */}
            <div className="w-full flex justify-center my-0 sm:my-1">
              <WheelOfRegret
                rotation={rotation}
                isSpinning={isSpinning}
                onSpinEnd={handleSpinEnd}
              />
            </div>

            {/* Result & Feedback Area */}
            <div className="min-h-[100px] w-full flex flex-col items-center justify-center mt-2 mb-2">
              <AnimatePresence mode="wait">
                {showResultBadge && feedback && !isSpinning && (
                  <motion.div
                    key={`feedback-${currentSpin}`}
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="flex flex-col items-center text-center w-full px-3"
                  >
                    {/* Outcome Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-500/20 border border-red-500/40 text-red-400 font-mono font-bold text-xs uppercase tracking-wider mb-2">
                      <Frown className="w-3.5 h-3.5" />
                      <span>Result: TRY AGAIN</span>
                    </div>

                    {/* Ragebait roast feedback */}
                    <div className="relative max-w-sm px-4 py-2.5 rounded-xl bg-card border border-white/10 shadow-lg">
                      <p className="text-sm sm:text-base font-semibold text-white">
                        {feedback}
                      </p>
                    </div>
                  </motion.div>
                )}

                {!showResultBadge && !isSpinning && currentSpin === 0 && (
                  <motion.p
                    key="initial-hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs sm:text-sm text-gray-400 font-medium"
                  >
                    Press the button below to claim your destiny.
                  </motion.p>
                )}

                {isSpinning && (
                  <motion.div
                    key="spinning-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-primary-orange text-sm font-mono font-semibold"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-orange animate-bounce" />
                    <span>Spinning for prizes...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action CTA Button */}
            <div className="w-full max-w-xs sm:max-w-sm mt-1">
              {currentSpin === 0 && (
                <PrimaryButton
                  onClick={handleStartSpin}
                  disabled={isSpinning}
                  size="lg"
                  rightIcon={<Sparkles className="w-5 h-5 flex-shrink-0" />}
                  className="w-full uppercase font-bold tracking-wider"
                >
                  SPIN THE WHEEL
                </PrimaryButton>
              )}

              {currentSpin === 1 && (
                <PrimaryButton
                  onClick={handleStartSpin}
                  disabled={isSpinning}
                  size="lg"
                  rightIcon={<RotateCcw className="w-4 h-4 flex-shrink-0" />}
                  className="w-full uppercase font-bold tracking-wider"
                >
                  SPIN AGAIN
                </PrimaryButton>
              )}

              {currentSpin === 2 && (
                <PrimaryButton
                  onClick={handleStartSpin}
                  disabled={isSpinning}
                  size="lg"
                  rightIcon={<Sparkles className="w-4 h-4 flex-shrink-0" />}
                  className="w-full uppercase font-bold tracking-wider bg-gradient-to-r from-primary-orange to-red-600 hover:from-primary-orange/90 hover:to-red-700"
                >
                  ONE LAST SPIN
                </PrimaryButton>
              )}

              {currentSpin >= 3 && (
                <div className="flex items-center justify-center gap-2 py-3 text-xs font-mono text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Calculating final outcome...</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 3. FINAL COMPLETION / RAGEBAIT SCREEN */}
        {gameState === 'completed' && (
          <motion.div
            key="completed-screen"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-2"
          >
            {/* Completion Tag */}
            <div className="mb-4">
              <CompletionBanner expNumber={3} title="COMPLETE" />
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-1">
              YOUR LUCK HAS LEFT THE CHAT.
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 font-mono text-xs sm:text-sm tracking-wide uppercase mb-6">
              Three spins. Zero wins.
            </p>

            {/* Main Ragebait Message Card - Exact required sentence */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="w-full bg-card/90 border-2 border-red-500/30 rounded-2xl p-5 mb-5 shadow-[0_8px_30px_rgba(220,38,38,0.15)] relative overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                LUCK EVALUATION
              </div>

              {/* Exact unshortened sentence */}
              <p className="text-base sm:text-lg font-bold text-white leading-relaxed mb-3">
                “You’ve spent your entire life waiting for luck. Meanwhile, luck has blocked you.”
              </p>

              {/* Secondary text */}
              <p className="text-xs sm:text-sm text-gray-400 font-mono">
                Some things never change.
              </p>
            </motion.div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-3 w-full max-w-[340px] sm:max-w-sm mt-2">
              <PrimaryButton
                onClick={handleContinueToNext}
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5 flex-shrink-0" />}
                className="w-full uppercase font-bold tracking-wider text-sm sm:text-base"
              >
                CONTINUE TO EXPERIMENT 04
              </PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ExperimentLayout>
  );
};
