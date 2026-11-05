import { ExperimentDef } from '../types';

export const EXPERIMENTS: ExperimentDef[] = [
  {
    id: 1,
    slug: 'dont-click',
    title: "Whom Will You Trust?",
    subtitle: "Two innocent voices. One glowing button. You have 20 seconds.",
    shortDesc: "Choose whom to believe: the inviting boy or the pleading friend.",
    path: '/experiments/dont-click',
    durationEst: '20s',
    difficulty: 'Easy',
  },
  {
    id: 2,
    slug: 'iq-test',
    title: 'Impossible IQ Test',
    subtitle: 'Four psychological traps designed to question your life choices.',
    shortDesc: 'Four Gen-Z scenarios with zero correct answers.',
    path: '/experiments/iq-test',
    durationEst: '1m',
    difficulty: 'Medium',
  },
  {
    id: 3,
    slug: 'wheel-of-regret',
    title: 'Spin the Wheel of Regret',
    subtitle: 'Three spins. One chance to change your life.',
    shortDesc: 'Spin for a reward. Maybe today is finally your lucky day.',
    path: '/experiments/button-game',
    durationEst: '45s',
    difficulty: 'Frustrating',
  },
  {
    id: 4,
    slug: 'meme-dialogue',
    title: 'Guess the Meme Dialogue',
    subtitle: "Let's see how chronically online you actually are.",
    shortDesc: 'Match iconic Indian meme formats to their actual dialogues.',
    path: '/experiments/fake-loading',
    durationEst: '1m',
    difficulty: 'Medium',
  },
];

