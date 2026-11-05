import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExperimentLayout } from '../components/ExperimentLayout';
import { PrimaryButton } from '../components/PrimaryButton';
import { CompletionBanner } from '../components/TornPaperBanner';
import { useProgress } from '../context/ProgressContext';
import { MEME_QUESTIONS, SCORE_TIERS, MemeQuestion } from '../data/memeDialogueData';

export const Experiment04: React.FC = () => {
  const navigate = useNavigate();
  const { completeExperiment, isCompleted } = useProgress();

  // Guard: User must complete the 20-second loading transition before entering Exp 04
  useEffect(() => {
    const transitionDone = sessionStorage.getItem('ragelab_exp3_to_4_transition_completed');
    if (transitionDone !== 'true' && !isCompleted(4)) {
      navigate('/experiments/loading-transition', { replace: true });
    }
  }, [navigate, isCompleted]);

  // Phase: 'playing' | 'completed'
  const [gameState, setGameState] = useState<'playing' | 'completed'>(() =>
    isCompleted(4) ? 'completed' : 'playing'
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number>(0);

  const currentQuestion: MemeQuestion = MEME_QUESTIONS[currentQuestionIndex];
  const totalQuestions = MEME_QUESTIONS.length;

  const handleSelectOption = (optionId: string) => {
    if (isLocked || selectedOptionId !== null) return;

    // Lock options immediately to prevent double-clicks
    setIsLocked(true);
    setSelectedOptionId(optionId);

    const isCorrect = optionId === currentQuestion.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) {
      setScore(newScore);
    }

    const updatedAnswers = {
      ...userAnswers,
      [currentQuestion.id]: optionId,
    };
    setUserAnswers(updatedAnswers);

    // Show popup feedback modal immediately (do NOT auto-advance)
    setShowFeedbackPopup(true);
  };

  const handleNextMeme = () => {
    setShowFeedbackPopup(false);
    setSelectedOptionId(null);
    setIsLocked(false);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleFinishQuiz = () => {
    setShowFeedbackPopup(false);
    setGameState('completed');
    completeExperiment(4, {
      completed: true,
      score: score,
      totalQuestions: totalQuestions,
      answers: userAnswers,
    });

    try {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF5B35', '#34C759', '#FACC15', '#8B70FF'],
      });
    } catch {
      // Ignore confetti errors if unsupported
    }
  };

  const handleReplay = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsLocked(false);
    setShowFeedbackPopup(false);
    setUserAnswers({});
    setScore(0);
    setGameState('playing');
  };

  const handleContinueToNext = () => {
    navigate('/verdict');
  };

  const currentTier = SCORE_TIERS[score] || SCORE_TIERS[0];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <ExperimentLayout expId={4}>
      <AnimatePresence mode="wait">
        {/* 1. PLAYING SCREEN */}
        {gameState === 'playing' && currentQuestion && (
          <motion.div
            key={`meme-question-${currentQuestion.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center w-full max-w-lg mx-auto select-none"
          >
            {/* Header / Tracker Bar */}
            <div className="flex items-center justify-between w-full px-1 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                {currentQuestion.questionNumber}
              </span>
              <span className="text-xs font-mono text-primary-orange font-semibold">
                SCORE: {score} / {totalQuestions}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="text-center mb-3">
              <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white">
                {currentQuestion.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Let's see how chronically online you actually are.
              </p>
            </div>

            {/* Meme Image Container */}
            <div className="w-full max-w-md rounded-2xl overflow-hidden border-2 border-white/10 bg-[#0E0E12] shadow-[0_12px_35px_rgba(0,0,0,0.6)] mb-3 relative flex items-center justify-center p-2">
              <img
                src={currentQuestion.imageSrc}
                alt={currentQuestion.imageAlt}
                className="w-full max-h-56 sm:max-h-64 object-contain rounded-xl select-none"
                loading="eager"
              />
            </div>

            {/* Four Clickable Options */}
            <div className="w-full max-w-md flex flex-col gap-2 mb-2">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrect = option.id === currentQuestion.correctAnswer;

                let buttonStyle = 'bg-card border-white/10 text-gray-200 hover:border-primary-orange/50 hover:bg-white/5';
                let indicatorIcon = null;

                if (selectedOptionId !== null) {
                  if (isSelected) {
                    if (isCorrect) {
                      buttonStyle = 'bg-[#34C759]/15 border-[#34C759] text-white ring-1 ring-[#34C759] shadow-[0_0_15px_rgba(52,199,89,0.3)]';
                      indicatorIcon = <CheckCircle2 className="w-4 h-4 text-[#34C759] flex-shrink-0" />;
                    } else {
                      buttonStyle = 'bg-red-500/15 border-red-500 text-white ring-1 ring-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
                      indicatorIcon = <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />;
                    }
                  } else {
                    buttonStyle = 'bg-card/40 border-white/5 text-gray-500 opacity-40 pointer-events-none';
                  }
                }

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isLocked}
                    whileHover={!isLocked ? { scale: 1.01 } : undefined}
                    whileTap={!isLocked ? { scale: 0.99 } : undefined}
                    className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl border text-left transition-all duration-150 ${buttonStyle}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 ${
                        isSelected && isCorrect
                          ? 'bg-[#34C759] text-black'
                          : isSelected && !isCorrect
                          ? 'bg-red-500 text-white'
                          : 'bg-white/10 text-gray-300'
                      }`}>
                        {option.id}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-snug">
                        {option.text}
                      </span>
                    </div>
                    {indicatorIcon}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 2. FINAL RESULT / COMPLETION SCREEN */}
        {gameState === 'completed' && (
          <motion.div
            key="final-screen"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-2 select-none"
          >
            {/* Completion Tag */}
            <div className="mb-3">
              <CompletionBanner expNumber={4} title="RAGELAB COMPLETE!" />
            </div>

            {/* Score Label Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-orange/15 border border-primary-orange/30 text-primary-orange font-mono font-bold text-xs uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentTier.scoreLabel}</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-3">
              {currentTier.headline}
            </h1>

            {/* Main Ragebit Card */}
            <div className="w-full bg-card/90 border border-white/10 rounded-2xl p-5 mb-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                “{currentTier.ragebit}”
              </p>

              {currentTier.secondaryMessage && (
                <p className="text-xs sm:text-sm text-primary-orange font-mono font-semibold mt-3 pt-3 border-t border-white/5">
                  {currentTier.secondaryMessage}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full max-w-xs sm:max-w-sm mt-1">
              <PrimaryButton
                onClick={handleContinueToNext}
                size="lg"
                rightIcon={<Sparkles className="w-5 h-5 flex-shrink-0" />}
                className="w-full uppercase font-bold tracking-wider"
              >
                REVEAL FINAL VERDICT
              </PrimaryButton>

              <button
                type="button"
                onClick={handleReplay}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-card hover:bg-white/5 text-gray-300 hover:text-white transition-all text-xs font-mono uppercase font-semibold tracking-wider"
              >
                <RotateCcw className="w-4 h-4" />
                <span>REPLAY</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. POPUP MODAL OVERLAY FOR MEME FEEDBACK */}
      <AnimatePresence>
        {showFeedbackPopup && selectedOptionId !== null && currentQuestion && (
          <motion.div
            key="feedback-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              key="feedback-popup-card"
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className={`w-full max-w-sm sm:max-w-md rounded-2xl p-5 sm:p-6 text-center shadow-[0_25px_65px_rgba(0,0,0,0.9)] border-2 ${
                selectedOptionId === currentQuestion.correctAnswer
                  ? 'bg-[#121A15] border-[#34C759]/40'
                  : 'bg-[#1C1316] border-red-500/40'
              }`}
            >
              {/* Result Badge */}
              <div className="mb-3">
                {selectedOptionId === currentQuestion.correctAnswer ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34C759]/20 border border-[#34C759]/40 text-[#34C759] text-xs font-mono font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CORRECT DIALOGUE 🎯</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
                    <XCircle className="w-4 h-4" />
                    <span>WRONG DIALOGUE 💀</span>
                  </div>
                )}
              </div>

              {/* Meme Ragebit Roast Message */}
              <div className="my-3 p-4 rounded-xl bg-black/50 border border-white/10">
                <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  “{selectedOptionId === currentQuestion.correctAnswer
                    ? currentQuestion.correctRagebit
                    : currentQuestion.wrongRagebit}”
                </p>
              </div>

              {/* Action Button: Next Meme or View Final Results */}
              <div className="w-full mt-4">
                <PrimaryButton
                  onClick={isLastQuestion ? handleFinishQuiz : handleNextMeme}
                  size="lg"
                  rightIcon={isLastQuestion ? <Sparkles className="w-5 h-5 flex-shrink-0" /> : <ArrowRight className="w-5 h-5 flex-shrink-0" />}
                  className="w-full uppercase font-bold tracking-wider"
                >
                  {isLastQuestion ? 'SEE FINAL RESULTS' : 'NEXT MEME'}
                </PrimaryButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ExperimentLayout>
  );
};
