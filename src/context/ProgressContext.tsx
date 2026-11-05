import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProgressState, AllResults } from '../types';
import { EXPERIMENTS } from '../data/experiments';

interface ProgressContextValue {
  progress: ProgressState;
  canAccessExperiment: (id: number) => boolean;
  completeExperiment: (id: number, result: unknown) => void;
  recordExperimentResult: (id: number, result: unknown) => void;
  resetProgress: () => void;
  getCurrentExperimentRoute: () => string;
  isCompleted: (id: number) => boolean;
  isAllCompleted: () => boolean;
}

const STORAGE_KEY = 'ragelab_progress_v1';

const defaultState: ProgressState = {
  currentExperiment: 1,
  completedExperiments: [],
  results: {},
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse saved RageLab progress', e);
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save RageLab progress', e);
    }
  }, [progress]);

  const canAccessExperiment = (id: number): boolean => {
    if (id === 1) return true;
    // To access experiment N, experiment N-1 must be completed
    return progress.completedExperiments.includes(id - 1);
  };

  const isCompleted = (id: number): boolean => {
    return progress.completedExperiments.includes(id);
  };

  const isAllCompleted = (): boolean => {
    return [1, 2, 3, 4].every((id) => progress.completedExperiments.includes(id));
  };

  const completeExperiment = (id: number, result: unknown) => {
    setProgress((prev) => {
      const completedSet = new Set(prev.completedExperiments);
      completedSet.add(id);
      const nextExp = Math.min(id + 1, 4);
      return {
        ...prev,
        currentExperiment: nextExp,
        completedExperiments: Array.from(completedSet),
        results: {
          ...prev.results,
          [id]: result,
        },
      };
    });
  };

  const recordExperimentResult = (id: number, result: unknown) => {
    setProgress((prev) => ({
      ...prev,
      results: {
        ...prev.results,
        [id]: result,
      },
    }));
  };

  const resetProgress = () => {
    setProgress(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getCurrentExperimentRoute = (): string => {
    // Find first uncompleted experiment or currentExperiment
    const firstUncompleted = EXPERIMENTS.find((exp) => !progress.completedExperiments.includes(exp.id));
    if (firstUncompleted) {
      return firstUncompleted.path;
    }
    return EXPERIMENTS[EXPERIMENTS.length - 1].path;
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        canAccessExperiment,
        completeExperiment,
        recordExperimentResult,
        resetProgress,
        getCurrentExperimentRoute,
        isCompleted,
        isAllCompleted,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

