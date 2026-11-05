export interface QuizOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  rageMessage: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export const GENZ_IQ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Your crush replies “hmm” after you send a paragraph.',
    options: [
      {
        id: 'A',
        text: 'Send another paragraph',
        rageMessage: 'Bro thinks this is a customer support ticket. Maybe the next paragraph will fix everything.',
      },
      {
        id: 'B',
        text: 'Leave them on seen',
        rageMessage: 'Acting unbothered after writing a whole emotional autobiography. Oscar-worthy performance.',
      },
      {
        id: 'C',
        text: 'Ask “Are you okay?”',
        rageMessage: "They replied with one letter and you're already applying for the therapist position.",
      },
      {
        id: 'D',
        text: 'Start planning the wedding anyway',
        rageMessage: 'Your delusion is so powerful, it deserves its own Netflix series.',
      },
    ],
  },
  {
    id: 2,
    question: 'You have 1% battery and no charger.',
    options: [
      {
        id: 'A',
        text: 'Turn on battery saver',
        rageMessage: 'Look at you, making responsible decisions. Who invited this mature person to RageLab?',
      },
      {
        id: 'B',
        text: 'Close all apps',
        rageMessage: 'You closed Instagram like your crush was going to text you through the calculator app.',
      },
      {
        id: 'C',
        text: 'Start saying your final prayers',
        rageMessage: 'Bro is preparing for the afterlife instead of finding a charger. Absolutely zero survival skills.',
      },
      {
        id: 'D',
        text: 'Keep scrolling Reels',
        rageMessage: 'Your survival instincts are weaker than your screen-time report.',
      },
    ],
  },
  {
    id: 3,
    question: 'Your story gets 12 views in 3 hours.',
    options: [
      {
        id: 'A',
        text: 'Delete it',
        rageMessage: '12 views and you’re already acting like Instagram leaked your private diary.',
      },
      {
        id: 'B',
        text: 'Post another story',
        rageMessage: 'The first story flopped, so naturally you launched Season 2.',
      },
      {
        id: 'C',
        text: 'Check viewers every 2 minutes',
        rageMessage: 'You’re not a content creator. You’re a full-time analytics intern.',
      },
      {
        id: 'D',
        text: 'Blame Instagram’s algorithm',
        rageMessage: 'The algorithm didn’t betray you. Your audience just went outside.',
      },
    ],
  },
  {
    id: 4,
    question: 'Your crush posts “Need someone who understands me.”',
    options: [
      {
        id: 'A',
        text: 'Reply “I’m here for you.”',
        rageMessage: 'Congratulations. You’ve applied for the unpaid therapist position.',
      },
      {
        id: 'B',
        text: 'Like the story',
        rageMessage: 'One like. Zero emotional progress.',
      },
      {
        id: 'C',
        text: 'Send a motivational paragraph',
        rageMessage: 'You’re writing TED Talks for someone who barely knows your surname.',
      },
      {
        id: 'D',
        text: 'Assume it’s about you',
        rageMessage: 'Bro saw a public story and unlocked a private relationship.',
      },
    ],
  },
];

