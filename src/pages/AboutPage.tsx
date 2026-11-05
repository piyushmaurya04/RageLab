import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Sparkles, FlaskConical } from 'lucide-react';
import { Header } from '../components/Header';
import { PrimaryButton } from '../components/PrimaryButton';
import { BottomGlowWave } from '../components/BottomGlowWave';
import { useProgress } from '../context/ProgressContext';
import { EXPERIMENTS } from '../data/experiments';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { getCurrentExperimentRoute } = useProgress();

  return (
    <div className="min-h-screen bg-background text-primary-text flex flex-col justify-between relative overflow-x-hidden pb-16 selection:bg-primary-orange selection:text-white">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-start px-4 max-w-lg mx-auto w-full z-10 py-6 text-left">
        <button
          onClick={() => navigate(-1)}
          className="self-start inline-flex items-center gap-1.5 text-xs font-mono text-secondary-text hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2 text-primary-orange font-mono text-xs uppercase tracking-wider mb-2">
          <FlaskConical className="w-4 h-4" />
          <span>About the Experiment</span>
        </div>

        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white mb-4">
          What is RageLab?
        </h1>

        <div className="space-y-4 text-secondary-text text-sm sm:text-base leading-relaxed">
          <p>
            <strong className="text-white">RageLab</strong> is a handcrafted series of 6 playful,
            sequential internet experiments engineered to test your patience, impulse control, and
            curiosity.
          </p>

          <p>
            Unlike typical web games, you cannot skip ahead or choose which test to take. Every
            visitor must earn their way through the lab one experiment at a time.
          </p>
        </div>

        {/* Experiment index list */}
        <div className="w-full my-6 bg-[#181820] border border-border-lab rounded-2xl p-5 shadow-lg">
          <h2 className="font-heading font-bold text-lg text-white mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-orange" />
            <span>The Six Protocols</span>
          </h2>

          <div className="divide-y divide-border-lab/50">
            {EXPERIMENTS.map((exp) => (
              <div key={exp.id} className="py-2.5 flex items-start gap-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#24242E] text-primary-orange flex-shrink-0">
                  0{exp.id}
                </span>
                <div>
                  <div className="font-heading font-bold text-sm text-white">{exp.title}</div>
                  <div className="text-xs text-secondary-text mt-0.5">{exp.shortDesc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="w-full p-4 rounded-xl bg-surface border border-border-lab text-xs text-secondary-text flex items-start gap-3 mb-6">
          <ShieldCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">Frontend-Only & Private</span>
            <span>
              Your progress and test results are stored locally in your browser’s LocalStorage. No
              tracking, no cookies, no accounts, and no data leaves your device.
            </span>
          </div>
        </div>

        <div className="w-full">
          <PrimaryButton size="lg" onClick={() => navigate(getCurrentExperimentRoute())}>
            Resume Your Experiment →
          </PrimaryButton>
        </div>
      </main>

      <BottomGlowWave />
    </div>
  );
};

