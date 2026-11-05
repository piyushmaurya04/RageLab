import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FlaskConical, Terminal } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { BottomGlowWave } from '../components/BottomGlowWave';
import { useProgress } from '../context/ProgressContext';

export const Experiment03To04Transition: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, canAccessExperiment } = useProgress();

  const DURATION_SECONDS = 20.0;
  const STORAGE_KEY_START = 'ragelab_exp3_to_4_start_time';
  const STORAGE_KEY_DONE = 'ragelab_exp3_to_4_transition_completed';

  // Check if transition was already finished or if start time is already in session
  const [isRoastRevealed, setIsRoastRevealed] = useState<boolean>(() => {
    const storedStart = sessionStorage.getItem(STORAGE_KEY_START);
    if (storedStart) {
      const elapsed = (Date.now() - Number(storedStart)) / 1000;
      return elapsed >= DURATION_SECONDS;
    }
    return false;
  });

  const [progressPercent, setProgressPercent] = useState<number>(() => {
    const storedStart = sessionStorage.getItem(STORAGE_KEY_START);
    if (storedStart) {
      const elapsed = (Date.now() - Number(storedStart)) / 1000;
      return Math.min(100, Math.floor((elapsed / DURATION_SECONDS) * 100));
    }
    return 0;
  });

  const [currentMessage, setCurrentMessage] = useState<string>('Preparing your next disappointment...');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  const startTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Helper to determine exact message based on elapsed wall-clock seconds
  const getMessageForTime = (elapsed: number): string => {
    if (elapsed < 4.0) return 'Preparing your next disappointment...';
    if (elapsed < 8.0) return 'Checking if you have any patience left.';
    if (elapsed < 12.0) return 'Your luck is still being investigated.';
    if (elapsed < 16.0) return 'Almost there. Just like your dreams.';
    if (elapsed < 19.0) return 'We could finish now. But why would we?';
    return 'Loading your next mistake...';
  };

  // Redirect guard: Exp 03 must be completed to access this transition
  useEffect(() => {
    if (!isCompleted(3) && !canAccessExperiment(3)) {
      navigate('/experiments/button-game', { replace: true });
    }
  }, [isCompleted, canAccessExperiment, navigate]);

  // Main 20-second wall-clock timer & smooth animation loop
  useEffect(() => {
    if (isRoastRevealed) return;

    // Anchor start timestamp in ref and sessionStorage for refresh resilience
    let initialTime = Number(sessionStorage.getItem(STORAGE_KEY_START));
    if (!initialTime || isNaN(initialTime)) {
      initialTime = Date.now();
      sessionStorage.setItem(STORAGE_KEY_START, String(initialTime));
    }
    startTimeRef.current = initialTime;

    const tick = () => {
      const now = Date.now();
      const elapsedSec = Math.max(0, (now - startTimeRef.current) / 1000);

      if (elapsedSec >= DURATION_SECONDS) {
        // Exactly reached or passed 20s
        setProgressPercent(100);
        setCurrentMessage('LOADING COMPLETE');

        // Short dramatic pause (500ms) before revealing the final roast screen
        setTimeout(() => {
          setIsRoastRevealed(true);
        }, 500);

        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
        return;
      }

      // Smooth progress calculation strictly based on elapsed time
      const calculatedPct = Math.min(99, Math.floor((elapsedSec / DURATION_SECONDS) * 100));
      setProgressPercent(calculatedPct);
      setCurrentMessage(getMessageForTime(elapsedSec));

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isRoastRevealed, DURATION_SECONDS]);

  const handleFinallyLetMeIn = () => {
    if (isNavigating) return;
    setIsNavigating(true);

    // Mark transition completed and clean up start time
    sessionStorage.setItem(STORAGE_KEY_DONE, 'true');
    sessionStorage.removeItem(STORAGE_KEY_START);

    // Navigate to Experiment 04 using standard route
    navigate('/experiments/fake-loading');
  };

  return (
    <div className="min-h-screen bg-[#0D0D11] text-[#F5F2EC] flex flex-col justify-between relative overflow-x-hidden select-none selection:bg-primary-orange selection:text-white">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[550px] h-[360px] bg-primary-orange/5 blur-[130px] pointer-events-none -z-10" />

      {/* Top Bar Branding */}
      <header className="w-full max-w-lg mx-auto pt-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary-orange/15 border border-primary-orange/30 flex items-center justify-center">
            <FlaskConical className="w-3.5 h-3.5 text-primary-orange" />
          </div>
          <span className="font-heading font-extrabold text-sm tracking-wider text-white">
            RAGELAB<span className="text-primary-orange font-mono text-[10px] ml-1">.EXE</span>
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-gray-400 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-orange animate-ping" />
          <span>EXPERIMENT 04</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-md mx-auto w-full text-center z-10 py-6">
        <AnimatePresence mode="wait">
          {/* SCREEN 1: 20-SECOND LOADING PAGE */}
          {!isRoastRevealed && (
            <motion.div
              key="loading-screen"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center w-full"
            >
              {/* Status Header */}
              <p className="text-xs font-mono uppercase tracking-widest text-primary-orange font-bold mb-4">
                LOADING YOUR NEXT DISAPPOINTMENT...
              </p>

              {/* Large Loading Percentage */}
              <div className="font-mono font-black text-6xl sm:text-7xl text-white tracking-tight mb-6 tabular-nums">
                {progressPercent}%
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3.5 bg-white/5 border border-white/10 rounded-full overflow-hidden p-0.5 shadow-inner mb-6">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-orange to-[#FF7A24] rounded-full shadow-[0_0_15px_rgba(255,91,53,0.7)]"
                  style={{ width: `${progressPercent}%` }}
                  transition={{ ease: 'linear', duration: 0.05 }}
                />
              </div>

              {/* Changing Dynamic Status Messages */}
              <div className="min-h-[50px] w-full flex items-center justify-center px-2">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentMessage}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm sm:text-base font-mono text-gray-300 font-medium"
                  >
                    “{currentMessage}”
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Minimal Terminal-Style Metadata */}
              <div className="mt-8 grid grid-cols-2 gap-y-2 gap-x-4 w-full max-w-xs font-mono text-[11px] text-gray-500 border-t border-white/5 pt-4">
                <div className="text-left flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-gray-600" />
                  <span>MEM_ALLOC:</span>
                  <span className="text-gray-400">NOMINAL</span>
                </div>
                <div className="text-right">
                  <span>LATENCY: </span>
                  <span className="text-primary-orange">420ms</span>
                </div>
                <div className="text-left">
                  <span>PATIENCE: </span>
                  <span className="text-gray-400">{Math.max(0, 100 - progressPercent)}%</span>
                </div>
                <div className="text-right">
                  <span>STATUS: </span>
                  <span className="text-primary-orange animate-pulse">PROCESSING</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: FINAL RAGEBAIT SCREEN */}
          {isRoastRevealed && (
            <motion.div
              key="roast-screen"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center w-full"
            >
              {/* Small Label */}
              <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                RAGELAB · LOADING COMPLETE
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight uppercase mb-3">
                BRO. 💀
              </h1>

              {/* Main Ragebait Roast Card */}
              <div className="w-full bg-[#16161C] border-2 border-red-500/30 rounded-2xl p-5 sm:p-6 mb-5 shadow-[0_8px_30px_rgba(220,38,38,0.18)] relative overflow-hidden">
                {/* Subtle Glow */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-28 h-28 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Main Message - Exact text */}
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed mb-3">
                  “You just <span className="text-primary-orange underline decoration-primary-orange/60 underline-offset-4">wasted 20 seconds</span> of your life doing absolutely nothing.”
                </p>

                {/* Secondary Message */}
                <p className="text-sm sm:text-base text-gray-300 font-medium">
                  And you stayed till the end.
                </p>

                {/* Footer text */}
                <p className="text-xs sm:text-sm text-gray-500 font-mono italic mt-4 pt-3 border-t border-white/5">
                  We respect the commitment. Not the decision.
                </p>
              </div>

              {/* Primary CTA */}
              <div className="w-full max-w-xs sm:max-w-sm mt-2">
                <PrimaryButton
                  onClick={handleFinallyLetMeIn}
                  disabled={isNavigating}
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5 flex-shrink-0" />}
                  className="w-full uppercase font-bold tracking-wider"
                >
                  FINALLY, LET ME IN
                </PrimaryButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomGlowWave />
    </div>
  );
};

