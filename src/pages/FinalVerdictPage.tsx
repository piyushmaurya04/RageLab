import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Share2, RotateCcw, MessageCircle, Check, Award, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HostPortrait } from '../components/HostPortrait';
import { PrimaryButton } from '../components/PrimaryButton';
import { Header } from '../components/Header';
import { BottomGlowWave } from '../components/BottomGlowWave';
import { useProgress } from '../context/ProgressContext';
import { Experiment04Result } from '../types';

export const FinalVerdictPage: React.FC = () => {
  const navigate = useNavigate();
  const { progress, resetProgress } = useProgress();
  const [copied, setCopied] = useState<boolean>(false);

  // Retrieve meme experiment score from results
  const exp4Result = progress.results[4] as Experiment04Result | undefined;
  const memeScore = typeof exp4Result?.score === 'number' ? exp4Result.score : 3;

  // Fire celebratory confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FF5B35', '#FF7A24', '#FFE853', '#34C759', '#A855F7'],
      });
    } catch {
      // Ignore
    }
  }, []);

  // Determine dynamic diagnostic scenario based on performance
  const getVerdictData = () => {
    if (memeScore >= 4) {
      // High score scenario
      return {
        badge: 'FINAL VERDICT · PASSED WITH FLYING COLORS',
        badgeColor: 'border-[#34C759]/40 bg-[#34C759]/15 text-[#34C759]',
        title: 'YES, WE ARE DEFINITELY FRIENDS! 🤝✨',
        titleHighlight: 'DEFINITELY FRIENDS',
        compatibility: '98% — UNBREAKABLE VIBE 🔥',
        diagnosticSummary: 'Your luck was literally zero on the wheel, but your culture knowledge completely carried you.',
        hostAssessment: (
          <>
            Look... you had <span className="text-red-400 font-semibold">zero luck</span> on the Wheel of Regret (literally 3 spins of pure disappointment 😭), and you patiently survived 20 seconds of a fake loading bar doing absolutely nothing.
            <br /><br />
            Then came the ultimate cultural trial. Honestly? <strong>Your meme game is dangerously sharp.</strong> You recognized the golden dialogues like they’re encoded in your DNA! 🧬
            <br /><br />
            Neither fate nor luck was on your side earlier, but your elite internet instincts saved you. The council has spoken: <strong className="text-primary-orange">We are officially friends.</strong>
          </>
        ),
        friendshipPlea: 'And if we’re already friends in real life, send me a message right now! Tell me which experiment tested your patience the hardest! 💬',
      };
    } else if (memeScore >= 2) {
      // Moderate score scenario
      return {
        badge: 'FINAL VERDICT · PROBATIONARY ALLIANCE',
        badgeColor: 'border-primary-orange/40 bg-primary-orange/15 text-primary-orange',
        title: 'THE DECISION WAS TOUGH... BUT WE CAN BE FRIENDS! 🤝😏',
        titleHighlight: 'WE CAN BE FRIENDS',
        compatibility: '84% — CHAOTIC COMPATIBILITY ⚡',
        diagnosticSummary: 'Neither were you lucky on the wheel, nor are you a meme professor, but you survived.',
        hostAssessment: (
          <>
            Let’s inspect your official lab dossier:
            <br /><br />
            <strong>Neither were you blessed with luck</strong> on the Wheel of Regret (fate literally blocked you 3 times in a row 🎡🚫), <strong>nor was your meme knowledge 100% flawless</strong> today. You knew some classics, but let a few legends slip through your fingers! 💀
            <br /><br />
            So the final verdict was honestly quite difficult...
            <br /><br />
            However, <strong className="text-white">I happen to be a good man with a very generous heart.</strong> ❤️ You endured every contradictory button, 20-second troll, and dialogue trap in this lab with sheer grit. <strong>We can definitely be friends!</strong>
          </>
        ),
        friendshipPlea: 'And hey, if we are already friends, screenshot this right now and message me! How much did you actually suffer during this lab? 😂',
      };
    } else {
      // Low score scenario (merciful acceptance)
      return {
        badge: 'FINAL VERDICT · EXECUTIVE MERCY CLAUSE',
        badgeColor: 'border-yellow-500/40 bg-yellow-500/15 text-yellow-400',
        title: 'WE CAN STILL BE FRIENDS (OUT OF RESPECT)! 🤝💀',
        titleHighlight: 'STILL BE FRIENDS',
        compatibility: '71% — PURE WILLPOWER 🛡️',
        diagnosticSummary: 'Zero luck on the wheel and zero meme luck, but your commitment was legendary.',
        hostAssessment: (
          <>
            Bro... I don’t even know how to break this to you gently:
            <br /><br />
            <strong>Neither are you lucky</strong> (the Wheel of Regret gave you zero wins on 3 spins), <strong>nor are you particularly good at memes</strong> right now. You were out here guessing like you just discovered 2G internet last Tuesday! 😭
            <br /><br />
            Technically, the automated algorithm told me <em>“Run away immediately”</em>.
            <br /><br />
            But you know what? <strong className="text-primary-orange">I am a good man.</strong> You stayed through the 20-second fake loading screen, clicked through every single roast, and reached the finish line without quitting. That level of dedication deserves respect. <strong>We can be friends!</strong>
          </>
        ),
        friendshipPlea: 'And if we’re already friends in real life... bro, we need to have a serious talk. Message me right now and explain what happened in that meme quiz! 📲',
      };
    }
  };

  const verdict = getVerdictData();

  const shareText = `Bro I just completed all 4 experiments of RageLab! 🧪 The verdict is in: We can be friends! 🤝🔥 Check it out: ${window.location.origin}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RageLab Friendship Verdict',
          text: shareText,
          url: window.location.origin,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert('Link copied to clipboard!');
    }
  };

  const handleRestart = () => {
    if (window.confirm('Restart RageLab from Experiment 01?')) {
      resetProgress();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E12] text-[#F5F2EC] flex flex-col justify-between relative overflow-x-hidden select-none selection:bg-primary-orange selection:text-white pb-24">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[380px] bg-primary-orange/8 blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <Header currentExpNumber={4} totalExps={4} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-lg mx-auto w-full text-center z-10 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center w-full"
        >
          {/* Host Portrait with Crown */}
          <div className="relative mb-4">
            <HostPortrait className="w-28 h-28 sm:w-32 sm:h-32" />
          </div>

          {/* Verdict Status Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider mb-3 ${verdict.badgeColor}`}
          >
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>{verdict.badge}</span>
          </motion.div>

          {/* Big Verdict Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-2 leading-tight">
            {verdict.title}
          </h1>

          {/* Compatibility Stat Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 font-semibold mb-4">
            <span>COMPATIBILITY RATING:</span>
            <span className="text-primary-orange">{verdict.compatibility}</span>
          </div>

          {/* Main Host Letter / Roast Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="w-full bg-[#15151C] border-2 border-white/10 rounded-2xl p-5 sm:p-6 mb-4 shadow-[0_16px_45px_rgba(0,0,0,0.7)] text-left relative overflow-hidden"
          >
            {/* Subtle top corner decoration */}
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-primary-orange/10 rounded-full blur-2xl pointer-events-none" />

            {/* Diagnostic Header */}
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/10">
              <Award className="w-5 h-5 text-primary-orange" />
              <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                Official Host Statement
              </span>
            </div>

            {/* Main Statement Text */}
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
              {verdict.hostAssessment}
            </p>

            {/* Call to Action Message */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-start gap-2.5 bg-primary-orange/5 -mx-2 -mb-2 p-3 rounded-xl border border-primary-orange/20">
              <MessageCircle className="w-5 h-5 text-primary-orange flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-gray-300 font-semibold leading-snug">
                {verdict.friendshipPlea}
              </p>
            </div>
          </motion.div>

          {/* Diagnostic Mini-Stats Bar */}
          <div className="grid grid-cols-3 gap-2 w-full mb-5 font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-card border border-white/10 flex flex-col items-center">
              <span className="text-gray-500 text-[10px] uppercase">Wheel Luck</span>
              <span className="text-red-400 font-bold mt-0.5">0 / 3 💀</span>
            </div>
            <div className="p-2.5 rounded-xl bg-card border border-white/10 flex flex-col items-center">
              <span className="text-gray-500 text-[10px] uppercase">Patience</span>
              <span className="text-[#34C759] font-bold mt-0.5">Survived ⏳</span>
            </div>
            <div className="p-2.5 rounded-xl bg-card border border-white/10 flex flex-col items-center">
              <span className="text-gray-500 text-[10px] uppercase">Meme Score</span>
              <span className="text-primary-orange font-bold mt-0.5">{memeScore} / 5 🎯</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-xs sm:max-w-sm">
            <PrimaryButton
              onClick={handleShare}
              size="lg"
              rightIcon={copied ? <Check className="w-5 h-5 text-white" /> : <Share2 className="w-5 h-5 flex-shrink-0" />}
              className="w-full uppercase font-bold tracking-wider"
            >
              {copied ? 'LINK COPIED! 📋' : 'SHARE LAB EXPERIENCE 💬'}
            </PrimaryButton>

            <button
              type="button"
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-card hover:bg-white/5 text-gray-300 hover:text-white transition-all text-xs font-mono uppercase font-semibold tracking-wider"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESTART RAGELAB</span>
            </button>
          </div>
        </motion.div>
      </main>

      <BottomGlowWave />
    </div>
  );
};

