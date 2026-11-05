import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, MessageSquareQuote } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExperimentLayout } from '../components/ExperimentLayout';
import { FlaskCharacter } from '../components/FlaskCharacter';
import { PrimaryButton } from '../components/PrimaryButton';
import { CompletionBanner, HighlightedTornStrip, BrushUnderline } from '../components/TornPaperBanner';
import { useProgress } from '../context/ProgressContext';
import { GENZ_IQ_QUESTIONS, QuizOption } from '../data/iqQuizData';

export const Experiment02: React.FC = () => {
  const navigate = useNavigate();
  const { completeExperiment, isCompleted } = useProgress();

  const [isFinished, setIsFinished] = useState<boolean>(() => isCompleted(2));
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  const currentQ = GENZ_IQ_QUESTIONS[currentQIndex];
  const totalQuestions = GENZ_IQ_QUESTIONS.length;

  const handleSelectOption = (option: QuizOption) => {
    if (isLocked) return;

    setIsLocked(true);
    setSelectedOption(option);
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: option.id,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQIndex < totalQuestions - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsLocked(false);
    } else {
      // All questions completed
      setIsFinished(true);
      completeExperiment(2, {
        completed: true,
        totalQuestions,
        answers: userAnswers,
      });

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF5B35', '#FF7A24', '#E8FF5B', '#8B70FF'],
        });
      } catch (e) {
        // Ignore
      }
    }
  };

  const handleRetake = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsLocked(false);
    setUserAnswers({});
    setIsFinished(false);
  };

  return (
    <ExperimentLayout expId={2}>
      <AnimatePresence mode="wait">
        {/* ACTIVE QUIZ SCREEN */}
        {!isFinished && currentQ && (
          <motion.div
            key={`question-${currentQ.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28 }}
            className="flex flex-col items-center max-w-sm sm:max-w-md mx-auto w-full px-2"
          >
            {/* Question Counter Header */}
            <div className="flex items-center justify-between w-full mb-3 text-xs font-mono">
              <span className="font-bold text-primary-orange px-2.5 py-1 rounded-full bg-primary-orange/10 border border-primary-orange/30">
                Question {currentQIndex + 1}/{totalQuestions}
              </span>
              <span className="text-secondary-text">Psychological Diagnostic</span>
            </div>

            {/* Question Card */}
            <div className="w-full bg-[#181820] border border-border-lab rounded-2xl p-5 sm:p-6 mb-4 sm:mb-5 shadow-xl text-left">
              <span className="text-[11px] uppercase font-mono tracking-wider text-secondary-text/80 block mb-1.5">
                Scenario 0{currentQ.id}
              </span>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="w-full flex flex-col gap-2.5">
              {currentQ.options.map((option) => {
                const isSelected = selectedOption?.id === option.id;

                let buttonClasses =
                  'bg-surface border-border-lab text-primary-text hover:border-primary-orange/60 hover:bg-surface-hover';

                if (isLocked) {
                  if (isSelected) {
                    buttonClasses =
                      'bg-primary-orange/15 border-primary-orange text-white shadow-[0_0_20px_rgba(255,91,53,0.35)] ring-1 ring-primary-orange';
                  } else {
                    buttonClasses =
                      'bg-surface/40 border-border-lab/30 text-secondary-text opacity-35 cursor-not-allowed';
                  }
                }

                return (
                  <motion.button
                    key={option.id}
                    disabled={isLocked}
                    onClick={() => handleSelectOption(option)}
                    whileHover={isLocked ? undefined : { scale: 1.01 }}
                    whileTap={isLocked ? undefined : { scale: 0.99 }}
                    className={`
                      w-full py-3.5 px-4 rounded-xl border text-left font-medium text-xs sm:text-sm flex items-center justify-between transition-all duration-200 select-none cursor-pointer
                      ${buttonClasses}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`
                          w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors flex-shrink-0
                          ${
                            isSelected
                              ? 'bg-primary-orange text-white'
                              : 'bg-black/40 text-secondary-text'
                          }
                        `}
                      >
                        {option.id}
                      </span>
                      <span className="leading-snug">{option.text}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Answer-Specific Ragebait Message & Manual Next Button */}
            <div className="w-full min-h-[140px] mt-4">
              <AnimatePresence mode="wait">
                {selectedOption && (
                  <motion.div
                    key={selectedOption.id}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="w-full flex flex-col gap-3"
                  >
                    {/* Roast Card */}
                    <div className="w-full p-4 rounded-2xl bg-[#1E1A24] border border-primary-orange/40 text-left shadow-lg relative overflow-hidden">
                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-primary-orange/20 text-primary-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MessageSquareQuote className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary-orange block mb-0.5">
                            Lab Analysis
                          </span>
                          <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                            {selectedOption.rageMessage}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Manual Next Question Button */}
                    <PrimaryButton
                      size="md"
                      onClick={handleNextQuestion}
                      icon={<ArrowRight className="w-4 h-4 text-white" />}
                    >
                      {currentQIndex < totalQuestions - 1 ? 'Next Question →' : 'View Results →'}
                    </PrimaryButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* COMPLETION SCREEN */}
        {isFinished && (
          <motion.div
            key="completion"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center max-w-sm sm:max-w-md mx-auto w-full text-center px-2"
          >
            <CompletionBanner expNumber={2} title="Test Completed!" />

            <FlaskCharacter expression="mischievous" size="md" className="my-1" />

            {/* Heading & Supporting Text as specified in requirements */}
            <div className="my-2">
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                You Survived.{' '}
                <span className="text-primary-orange inline-block relative font-black">
                  Barely.
                  <BrushUnderline className="w-24 mt-0.5" />
                </span>
              </h1>
              <p className="text-secondary-text text-xs sm:text-sm mt-2 leading-relaxed max-w-xs mx-auto">
                Experiment 02 has successfully questioned your life choices.
              </p>
            </div>

            <HighlightedTornStrip
              prefix="Lab diagnosis:"
              highlightedText="Chronic Overthinker"
            />

            {/* Action Buttons: Continue to Experiment 03 & Retake */}
            <div className="w-full mt-5 flex flex-col gap-2.5 px-2">
              <PrimaryButton
                size="lg"
                onClick={() => navigate('/experiments/button-game')}
                icon={<ArrowRight className="w-5 h-5 text-white" />}
              >
                Continue to Experiment 03 →
              </PrimaryButton>

              <button
                type="button"
                onClick={handleRetake}
                className="w-full py-2 text-xs font-mono text-secondary-text hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Experiment 02</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ExperimentLayout>
  );
};
