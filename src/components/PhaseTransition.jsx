import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { PHASES, PHASE_TRANSITIONS } from '../data/quizData';

/**
 * PhaseTransition -- Full-screen interstitial between quiz phases.
 *
 * Features:
 * - Advisor avatar with speech bubble (reflecting on previous phase)
 * - Phase icon, title, teaser
 * - "Continue" button that unlocks after 5 seconds with countdown bar
 */

const PHASE_TEASERS = {
  1: 'Let me get to know you a little first.',
  2: 'Time to scan your financial engine.',
  3: 'Now we decode your money wiring at a deeper level.',
  4: 'Time to define your goals.',
  5: 'Just need a few details so we can send your report.',
};

const ADVISOR_MESSAGES = {
  1: 'Great, let\'s get started. I\'ll begin with a few quick questions about who you are and where you\'re at right now.',
  2: 'Okay, I can see your financial profile taking shape. You\'re telling me important things about where you sit right now.',
  3: 'I can see how you actually approach money day-to-day. There are patterns here that are worth exploring deeper.',
  4: 'Your real money wiring is coming through. Now let\'s lock in what you actually want to achieve.',
  5: 'Perfect. Your goals are locked in. Just a few last details and I can generate your full report.',
};

const BASE_URL = import.meta.env.BASE_URL;

const AVATAR_MAP = {
  1: `${BASE_URL}avatars/avatar-phase1.png`,
  2: `${BASE_URL}avatars/avatar-phase2.png`,
  3: `${BASE_URL}avatars/avatar-phase3.png`,
  4: `${BASE_URL}avatars/avatar-phase4.png`,
  5: `${BASE_URL}avatars/avatar-phase5.png`,
};

export default function PhaseTransition({ phase, onComplete }) {
  const [canProceed, setCanProceed] = useState(false);
  const data = PHASE_TRANSITIONS[phase] || PHASE_TRANSITIONS[1];
  const phaseInfo = PHASES[phase] || PHASES[1];
  const teaser = PHASE_TEASERS[phase];
  const advisorMsg = ADVISOR_MESSAGES[phase];
  const avatarSrc = AVATAR_MAP[phase];

  // Unlock the continue button after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setCanProceed(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Phase icon badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        className="mb-4"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center border"
          style={{
            backgroundColor: phaseInfo.color + '12',
            borderColor: phaseInfo.color + '30',
            boxShadow: `0 0 30px ${phaseInfo.color}20`,
          }}
        >
          <span className="text-2xl">{data.icon}</span>
        </div>
      </motion.div>

      {/* Phase label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span
          className="text-[11px] font-mono uppercase tracking-[0.3em]"
          style={{ color: phaseInfo.color }}
        >
          Phase {phase} of 5
        </span>
      </motion.div>

      {/* Phase title */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="text-2xl sm:text-3xl font-bold text-white mt-3"
      >
        {phaseInfo.title}
      </motion.h2>

      {/* Teaser message */}
      {teaser && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-gray-400 mt-3 max-w-xs text-sm leading-relaxed"
        >
          {teaser}
        </motion.p>
      )}

      {/* Advisor speech bubble */}
      {advisorMsg && avatarSrc && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
          className="max-w-md w-full mt-8 mb-8"
        >
          <div
            className="relative flex items-end gap-5 px-6 py-6 rounded-2xl border overflow-hidden"
            style={{
              backgroundColor: '#ffffff',
              borderColor: 'rgba(0, 217, 255, 0.12)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 217, 255, 0.04)',
            }}
          >
            {/* Countdown bar at top */}
            <motion.div
              className="absolute top-0 left-0 h-[3px] rounded-full"
              style={{ width: '0%', backgroundColor: '#00d9ff' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={avatarSrc}
                alt="Advisor"
                className="w-auto h-auto max-w-[110px] max-h-[110px] rounded-xl"
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                }}
              />
            </div>
            {/* Message */}
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                Stanley says
              </p>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                {advisorMsg}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Continue button (unlocks after 5s) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-2"
      >
        <motion.button
          onClick={() => canProceed && onComplete()}
          disabled={!canProceed}
          whileHover={canProceed ? { scale: 1.03 } : {}}
          whileTap={canProceed ? { scale: 0.97 } : {}}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-500 ${
            canProceed
              ? 'border text-white cursor-pointer'
              : 'bg-dna-card/40 border border-dna-border/20 text-gray-600 cursor-not-allowed'
          }`}
          style={
            canProceed
              ? {
                  borderColor: phaseInfo.color + '50',
                  backgroundColor: phaseInfo.color + '15',
                  color: phaseInfo.color,
                  boxShadow: `0 0 20px ${phaseInfo.color}20`,
                }
              : {}
          }
        >
          {canProceed ? (
            <>
              Continue
              <ChevronRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <motion.div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-gray-500"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </motion.div>
              Loading next phase
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
