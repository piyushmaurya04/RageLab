import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ExperimentLayout } from '../components/ExperimentLayout';
import { CountdownTimer } from '../components/experiment01/CountdownTimer';
import { TrustCharacters } from '../components/experiment01/TrustCharacters';
import { SpeechBubble, SpeechLine } from '../components/experiment01/SpeechBubble';
import { GlowingRedButton } from '../components/experiment01/GlowingRedButton';
import { TrustResult } from '../components/experiment01/TrustResult';
import { BrushUnderline } from '../components/TornPaperBanner';
import { useProgress } from '../context/ProgressContext';

interface DialoguePair {
  orange: SpeechLine;
  purple: SpeechLine;
}

const DIALOGUE_PAIRS: DialoguePair[] = [
  {
    orange: { highlight: 'Please click', main: 'the button!' },
    purple: { highlight: 'No!', prefix: 'Don’t', main: 'click the button!' },
  },
  {
    orange: { highlight: 'Trust me,', main: 'just one click!' },
    purple: { highlight: 'Please', main: 'listen to me!' },
  },
  {
    orange: { highlight: 'Come on,', main: 'nothing bad happens!' },
    purple: { highlight: 'You’ll regret', main: 'clicking it!' },
  },
  {
    orange: { highlight: 'I promise', main: 'it is 100% safe!' },
    purple: { highlight: 'I’m trying to', main: 'protect you!' },
  },
  {
    orange: { highlight: 'Why are you', main: 'ignoring me?' },
    purple: { highlight: 'Stay strong!', main: 'Don’t fall for it!' },
  },
  {
    orange: { highlight: 'Just tap it!', main: 'Nobody will know!' },
    purple: { highlight: 'Almost there!', main: 'Keep your hands off!' },
  },
];

export const Experiment01: React.FC = () => {
  const navigate = useNavigate();
  const { progress, completeExperiment, isCompleted } = useProgress();

  // If already played, retrieve saved result and lock out retries
  const savedResult = progress.results[1] as
    | { completed?: boolean; passed?: boolean; timeSurvived?: number; clicks?: number }
    | undefined;

  const [gameState, setGameState] = useState<'playing' | 'failed' | 'success'>(() => {
    if (isCompleted(1) && savedResult) {
      return savedResult.clicks && savedResult.clicks > 0 ? 'failed' : 'success';
    }
    return 'playing';
  });

  const DURATION = 20.0;

  const [timeLeft, setTimeLeft] = useState<number>(DURATION);
  const [clickCount, setClickCount] = useState<number>(() => savedResult?.clicks ?? 0);
  const [survivalTime, setSurvivalTime] = useState<number>(() => savedResult?.timeSurvived ?? 0);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const activeRef = useRef<boolean>(!isCompleted(1));

  // Clear timer safely
  const clearTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Start gameplay only once (no retry allowed)
  useEffect(() => {
    if (isCompleted(1)) {
      activeRef.current = false;
      return;
    }

    activeRef.current = true;
    startTimeRef.current = Date.now();

    timerRef.current = window.setInterval(() => {
      if (!activeRef.current) return;

      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, DURATION - elapsed);
      setTimeLeft(remaining);

      // Rotate dialogue across the duration
      const pairIdx = Math.min(
        DIALOGUE_PAIRS.length - 1,
        Math.floor((DURATION - remaining) / (DURATION / DIALOGUE_PAIRS.length))
      );
      setDialogueIndex(pairIdx);

      // Countdown finished without clicking: SUCCESS
      if (remaining <= 0) {
        clearTimer();
        activeRef.current = false;
        setSurvivalTime(DURATION);
        setGameState('success');

        completeExperiment(1, {
          completed: true,
          passed: true,
          timeSurvived: DURATION,
          clicks: 0,
        });

        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF5B35', '#FF7A24', '#8B5CF6', '#34C759'],
          });
        } catch (e) {
          // Ignore
        }
      }
    }, 100);

    return () => {
      activeRef.current = false;
      clearTimer();
    };
  }, [isCompleted, completeExperiment]);

  // Click on the red button: IMMEDIATE PERMANENT FAILURE (No Try Again)
  const handleButtonClick = () => {
    if (gameState !== 'playing' || !activeRef.current) return;

    activeRef.current = false;
    clearTimer();

    const elapsed = parseFloat(((Date.now() - startTimeRef.current) / 1000).toFixed(1));
    const newClicks = clickCount + 1;
    setClickCount(newClicks);
    setSurvivalTime(elapsed);
    setGameState('failed');

    // Permanently record failure and advance progression to unlock Exp 02 (no redos)
    completeExperiment(1, {
      completed: true,
      passed: false,
      timeSurvived: elapsed,
      clicks: newClicks,
    });
  };

  const currentDialogue = DIALOGUE_PAIRS[dialogueIndex];

  return (
    <ExperimentLayout expId={1}>
      <AnimatePresence mode="wait">
        {/* ACTIVE GAMEPLAY SCREEN — Only accessible on initial attempt */}
        {gameState === 'playing' && (
          <motion.div
            key="gameplay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center max-w-sm sm:max-w-md mx-auto w-full px-2"
          >
            {/* Top Timer Capsule */}
            <CountdownTimer timeLeft={timeLeft} />

            {/* Speech Bubbles positioned directly above the two characters */}
            <div className="w-full grid grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-3 px-1 sm:px-2 z-20">
              {/* Left Bubble (Orange) */}
              <SpeechBubble variant="orange" line={currentDialogue.orange} />

              {/* Right Bubble (Purple) */}
              <SpeechBubble variant="purple" line={currentDialogue.purple} />
            </div>

            {/* Two Innocent Characters (Orange Hoodie & Purple Hoodie with Glasses) */}
            <div className="w-full -mt-2 z-10">
              <TrustCharacters />
            </div>

            {/* Main Question Heading */}
            <div className="text-center mt-2 sm:mt-3">
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                <span className="italic">Whom You will </span>
                <span className="text-primary-orange inline-block relative font-black">
                  Trust?
                  <BrushUnderline className="w-24 sm:w-28 mt-0.5" />
                </span>
              </h1>

              {/* Subtitle badge */}
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-secondary-text mt-1.5">
                <span>You have</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-orange/20 border border-primary-orange/40 font-mono font-bold text-primary-orange text-xs">
                  {Math.ceil(timeLeft)}s.
                </span>
              </div>
            </div>

            {/* The Tempting Glowing Red Circular Button */}
            <GlowingRedButton onClick={handleButtonClick} />
          </motion.div>
        )}

        {/* RESULT SCREENS (SUCCESS OR FAILURE) — No Try Again, Only Next Experiment */}
        {gameState !== 'playing' && (
          <TrustResult
            status={gameState}
            timeSurvived={survivalTime}
            clickCount={clickCount}
            onNext={() => navigate('/experiments/iq-test')}
          />
        )}
      </AnimatePresence>
    </ExperimentLayout>
  );
};
