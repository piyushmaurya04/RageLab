import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, RotateCcw, Info, FlaskConical, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';
import { useProgress } from '../context/ProgressContext';

interface HeaderProps {
  currentExpNumber?: number;
  totalExps?: number;
}

export const Header: React.FC<HeaderProps> = ({ currentExpNumber, totalExps = 4 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { progress, resetProgress, getCurrentExperimentRoute } = useProgress();
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm('Reset all RageLab progress and start back from Experiment 01?')) {
      resetProgress();
      setMenuOpen(false);
      navigate('/');
    }
  };

  return (
    <>
      <header className="relative z-30 w-full px-5 py-4 max-w-4xl mx-auto flex items-center justify-between">
        <Logo size="md" />

        <div className="flex items-center gap-3">
          {/* Exp badge if inside experiment */}
          {currentExpNumber && (
            <div className="font-mono text-xs font-semibold px-3 py-1 rounded-full border border-primary-orange/60 text-primary-orange bg-primary-orange/10 backdrop-blur-sm">
              Exp {currentExpNumber}/{totalExps}
            </div>
          )}

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-xl bg-surface border border-border-lab flex items-center justify-center text-primary-text hover:text-primary-orange hover:border-primary-orange/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-16 right-4 left-4 sm:left-auto sm:w-80 bg-surface border border-border-lab rounded-2xl p-5 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border-lab pb-3">
              <span className="font-heading font-bold text-lg text-white">Lab Controls</span>
              <span className="text-xs font-mono text-secondary-text">
                Unlocked: {progress.completedExperiments.length}/6
              </span>
            </div>

            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-hover text-sm font-medium transition-colors"
              >
                <FlaskConical className="w-4 h-4 text-primary-orange" />
                <span>Lab Entrance</span>
              </Link>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate(getCurrentExperimentRoute());
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-hover text-sm font-medium text-left transition-colors text-primary-orange"
              >
                <span className="w-2 h-2 rounded-full bg-primary-orange animate-pulse" />
                <span>Resume Current Experiment</span>
              </button>

              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-hover text-sm font-medium transition-colors"
              >
                <Info className="w-4 h-4 text-secondary-text" />
                <span>About RageLab</span>
              </Link>
            </nav>

            <div className="border-t border-border-lab pt-3">
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-red-500/30 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Progress</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

