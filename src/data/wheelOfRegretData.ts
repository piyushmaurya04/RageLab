export interface WheelSegment {
  id: number;
  label: string;
  bgColor: string;
  textColor: string;
  accentColor?: string;
  isTarget?: boolean;
}

export const WHEEL_SEGMENTS: WheelSegment[] = [
  { id: 0, label: '₹10,000', bgColor: '#1E1E28', textColor: '#FACC15', accentColor: '#EAB308' },
  { id: 1, label: 'iPhone', bgColor: '#FF5B35', textColor: '#FFFFFF', accentColor: '#FF7A24' },
  { id: 2, label: 'JACKPOT', bgColor: '#7C3AED', textColor: '#FDE047', accentColor: '#A78BFA' },
  { id: 3, label: 'FREE GIFT', bgColor: '#0F172A', textColor: '#38BDF8', accentColor: '#0284C7' },
  { id: 4, label: 'BETTER LUCK', bgColor: '#272732', textColor: '#D1D5DB', accentColor: '#4B5563' },
  { id: 5, label: 'TRY AGAIN', bgColor: '#DC2626', textColor: '#FFFFFF', accentColor: '#EF4444', isTarget: true },
  { id: 6, label: 'ALMOST!', bgColor: '#EA580C', textColor: '#FFFFFF', accentColor: '#FB923C' },
  { id: 7, label: 'ONE MORE CHANCE', bgColor: '#18181B', textColor: '#E4E4E7', accentColor: '#52525B' },
];

export interface SpinStageConfig {
  spinNumber: number;
  ctaText: string;
  feedback: string;
}

export const SPIN_STAGES: Record<number, SpinStageConfig> = {
  1: {
    spinNumber: 1,
    ctaText: 'SPIN AGAIN',
    feedback: 'Relax. Everyone gets unlucky sometimes.',
  },
  2: {
    spinNumber: 2,
    ctaText: 'ONE LAST SPIN',
    feedback: 'You actually thought your luck would improve? That’s cute.',
  },
  3: {
    spinNumber: 3,
    ctaText: 'VIEW OUTCOME',
    feedback: 'At this point, it’s not bad luck. It’s a personality trait.',
  },
};

