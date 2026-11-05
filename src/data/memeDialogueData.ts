export interface MemeQuestion {
  id: number;
  questionNumber: string; // e.g. "MEME 01 / 05"
  title: string;
  imageSrc: string;
  imageAlt: string;
  options: {
    id: string; // 'A' | 'B' | 'C' | 'D'
    text: string;
  }[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  correctRagebit: string;
  wrongRagebit: string;
}

export const MEME_QUESTIONS: MemeQuestion[] = [
  {
    id: 1,
    questionNumber: 'MEME 01 / 05',
    title: 'Guess the Meme Dialogue',
    imageSrc: '/assets/memes/meme1.png',
    imageAlt: 'Meme 01 - Guess the dialogue',
    options: [
      { id: 'A', text: 'Ek haath aise padega na, din me tare dikhai padenge' },
      { id: 'B', text: 'Ek G@nd me repta padega na sadak par hagta phirega' },
      { id: 'C', text: 'Dekho jada backchodi karne ki hame adat nahi hai' },
      { id: 'D', text: 'Ek jutta mara na toh soo jayega' },
    ],
    correctAnswer: 'B',
    correctRagebit: "AYOOO 💀 You didn't just recognize the dialogue, you probably have it encoded in your DNA.",
    wrongRagebit: 'You were definitely not there when Indian meme history was being written. Absolute disappointment.',
  },
  {
    id: 2,
    questionNumber: 'MEME 02 / 05',
    title: 'Guess the Meme',
    imageSrc: '/assets/memes/meme2.png',
    imageAlt: 'Meme 02 - Guess the dialogue',
    options: [
      { id: 'A', text: 'Tell Ghatam' },
      { id: 'B', text: 'Khana Khatam' },
      { id: 'C', text: 'Ghee khatam' },
      { id: 'D', text: 'Paisa Khatam' },
    ],
    correctAnswer: 'C',
    correctRagebit: 'NAH BRO 😭 You proved your meme knowledge is concerningly powerful.',
    wrongRagebit: 'How did you miss Ghee Khatam? Your internet connection might be fine, but you have zero meme connection.',
  },
  {
    id: 3,
    questionNumber: 'MEME 03 / 05',
    title: 'Guess the Dialogue',
    imageSrc: '/assets/memes/meme3.png',
    imageAlt: 'Meme 03 - Guess the dialogue',
    options: [
      { id: 'A', text: 'Bahut Badhiya' },
      { id: 'B', text: 'Ye sab ghatiya hai' },
      { id: 'C', text: 'Ye sab Doglapan hai' },
      { id: 'D', text: 'Ye hue na baat' },
    ],
    correctAnswer: 'C',
    correctRagebit: 'LEGEND. 🗿 You have officially achieved terminally online status.',
    wrongRagebit: 'You have clearly been living under a rock with airplane mode turned ON.',
  },
  {
    id: 4,
    questionNumber: 'MEME 04 / 05',
    title: 'Guess the Meme Dialogue',
    imageSrc: '/assets/memes/meme4.png',
    imageAlt: 'Meme 04 - Guess the dialogue',
    options: [
      { id: 'A', text: 'Badhiya Badhiya' },
      { id: 'B', text: 'Hehhehehe' },
      { id: 'C', text: 'Miracle ! Miracle !' },
      { id: 'D', text: 'Kya baat hai ! ky baat hai' },
    ],
    correctAnswer: 'C',
    correctRagebit: "IT'S A MIRACLE! 😭 You recognized the legendary scene instantly. Your meme instincts are unmatched.",
    wrongRagebit: "You watched Welcome with your sound muted or what? You literally missed 'Miracle ! Miracle !'",
  },
  {
    id: 5,
    questionNumber: 'MEME 05 / 05',
    title: 'Guess the Meme Dialogue',
    imageSrc: '/assets/memes/meme5.png',
    imageAlt: 'Meme 05 - Guess the dialogue',
    options: [
      { id: 'A', text: '21 Din me Paisa double' },
      { id: 'B', text: '25 Din me Paisa Double' },
      { id: 'C', text: '22 Din me Paisa Double' },
      { id: 'D', text: '26 Din me Paisa Double' },
    ],
    correctAnswer: 'B',
    correctRagebit: "ANURADHA CAN'T SCAM YOU! 💰 You remembered the exact number: 25 Din me Paisa Double!",
    wrongRagebit: "You would definitely lose your life savings to Laxmi Chit Fund. It's 25 Din, not whatever you picked.",
  },
];

export interface FinalResultTier {
  minScore: number;
  maxScore: number;
  headline: string;
  ragebit: string;
  secondaryMessage?: string;
  scoreLabel: string;
}

export const SCORE_TIERS: Record<number, FinalResultTier> = {
  5: {
    minScore: 5,
    maxScore: 5,
    headline: 'YOU ARE TERMINALLY ONLINE. 💀',
    ragebit: 'Five memes. Five correct answers. Your screen time has finally paid off, you absolute legend.',
    secondaryMessage: 'Touch grass. Immediately.',
    scoreLabel: '5 / 5 — MEME GOD',
  },
  4: {
    minScore: 4,
    maxScore: 4,
    headline: 'NOT BAD, INTERNET WARRIOR.',
    ragebit: "Four out of five. You're chronically online and your meme instincts are impressively sharp.",
    scoreLabel: '4 / 5 — MEME LEGEND',
  },
  3: {
    minScore: 3,
    maxScore: 3,
    headline: 'DECENT, BUT YOU SLIPPED.',
    ragebit: 'Three out of five. You know the classics, but you let a few iconic dialogues slip past you.',
    scoreLabel: '3 / 5 — MEME SURVIVOR',
  },
  2: {
    minScore: 2,
    maxScore: 2,
    headline: 'YOUR MEME KNOWLEDGE NEEDS CPR.',
    ragebit: 'Two out of five. You must be letting your algorithm feed you motivational reels instead of real culture.',
    scoreLabel: '2 / 5 — MEME CASUAL',
  },
  1: {
    minScore: 1,
    maxScore: 1,
    headline: 'DID YOU JUST DISCOVER THE INTERNET? 💀',
    ragebit: 'Only one correct answer. You know fewer memes than Internet Explorer.',
    scoreLabel: '1 / 5 — MEME ROOKIE',
  },
  0: {
    minScore: 0,
    maxScore: 0,
    headline: 'DID YOU JUST ARRIVE FROM 2005? 💀',
    ragebit: 'Zero out of five. You somehow missed every single iconic dialogue. Pure NPC behavior.',
    scoreLabel: '0 / 5 — MEME NPC',
  },
};
