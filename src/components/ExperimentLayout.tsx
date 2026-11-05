import React from 'react';
import { Navigate } from 'react-router-dom';
import { Header } from './Header';
import { ProgressionTracker } from './ProgressionTracker';
import { BottomGlowWave } from './BottomGlowWave';
import { useProgress } from '../context/ProgressContext';

interface ExperimentLayoutProps {
  expId: number;
  children: React.ReactNode;
}

export const ExperimentLayout: React.FC<ExperimentLayoutProps> = ({ expId, children }) => {
  const { canAccessExperiment, getCurrentExperimentRoute } = useProgress();

  if (!canAccessExperiment(expId)) {
    // If not unlocked, redirect to current unlocked experiment
    return <Navigate to={getCurrentExperimentRoute()} replace />;
  }

  return (
    <div className="min-h-screen bg-background text-primary-text flex flex-col justify-between relative overflow-x-hidden pb-20 selection:bg-primary-orange selection:text-white">
      {/* Background soft ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-primary-orange/5 blur-[120px] pointer-events-none -z-10" />

      <div>
        <Header currentExpNumber={expId} totalExps={4} />
        <ProgressionTracker variant="stepper" activeExpId={expId} />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-lg mx-auto w-full text-center z-10 py-4">
        {children}
      </main>

      <BottomGlowWave />
    </div>
  );
};

