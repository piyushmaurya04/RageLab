export interface ExperimentDef {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  path: string;
  durationEst: string;
  difficulty: 'Easy' | 'Medium' | 'Frustrating' | 'Devilish';
}

export interface Experiment01Result {
  completed: boolean;
  timeSurvived: number; // in seconds
  clicks: number;
}

export interface Experiment02Result {
  completed: boolean;
  score?: number;
  totalQuestions?: number;
  answers?: Record<number, string | number>;
}

export interface Experiment03Result {
  completed: boolean;
  spins?: number;
  finalOutcome?: string;
}

export interface Experiment04Result {
  completed: boolean;
  score?: number;
  totalQuestions?: number;
  answers?: Record<number, string>;
  timeWaited?: number;
  glitchesEncountered?: number;
}

export type AllResults = {
  1?: Experiment01Result;
  2?: Experiment02Result;
  3?: Experiment03Result;
  4?: Experiment04Result;
};

export interface ProgressState {
  currentExperiment: number; // 1 to 4
  completedExperiments: number[]; // array of completed experiment ids
  results: AllResults;
}

