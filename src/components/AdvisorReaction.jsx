import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/**
 * AdvisorReaction - White speech bubble with avatar inside.
 * Avatar on left, message on right. White background matches avatar images.
 *
 * Props:
 *   phase      - 1-5 (determines which avatar to show)
 *   message    - Message text to display
 *   onDone     - Called after auto-dismiss or button click
 *   duration   - Display duration in ms (default 3200, used for auto-dismiss)
 *   showButton - If true, show "Continue" button instead of auto-dismissing (default false)
 */

const BASE_URL = import.meta.env.BASE_URL;

const AVATAR_MAP = {
  1: `${BASE_URL}avatars/avatar-intro.png`,
  2: `${BASE_URL}avatars/avatar-phase2.png`,
  3: `${BASE_URL}avatars/avatar-phase3.png`,
  4: `${BASE_URL}avatars/avatar-phase4.png`,
  5: `${BASE_URL}avatars/avatar-result.png`,
};

export default function AdvisorReaction({
  phase = 1,
  message,
  onDone,
  duration = 3200,
  showButton = false,
}) {
  const [canProceed, setCanProceed] = useState(false);
  const phaseColor = phase === 1 ? '#00d9ff' : '#fbbf24';

  // Unlock the continue button after 5 seconds (or auto-dismiss if no button)
  useEffect(() => {
    if (showButton) {
      const timer = setTimeout(() => setCanProceed(true), 5000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => onDone?.(), duration);
      return () => clearTimeout(timer);
    }
  }, [showButton, duration, onDone]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* White speech bubble with avatar inside */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md w-full"
      >
        <div
          className="relative flex items-end gap-5 px-6 py-6 rounded-2xl border overflow-hidden"
          style={{
            backgroundColor: '#ffffff',
            borderColor: 'rgba(0, 217, 255, 0.12)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 217, 255, 0.04)',
          }}
        >
          {/* Progress bar at top */}
          <motion.div
            className="absolute top-0 left-0 h-[3px] rounded-full"
            style={{
              width: '0%',
              backgroundColor: phaseColor,
            }}
            animate={{ width: showButton ? '100%' : '100%' }}
            transition={{ duration: showButton ? 5 : duration / 1000, ease: 'linear' }}
          />

          {/* Avatar on left */}
          <div className="flex-shrink-0">
            <img
              src={AVATAR_MAP[phase] || AVATAR_MAP[1]}
              alt="Advisor"
              className="w-auto h-auto max-w-[110px] max-h-[110px] rounded-xl"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
            />
          </div>

          {/* Message on right */}
          <div className="flex-1 min-w-0 text-left">
            <p className="text-[11px] font-mono uppercase tracking-widest text-gray-400 mb-2">
              Stanley says
            </p>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
              {message}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Button or dots below bubble */}
      {showButton ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <motion.button
            onClick={() => canProceed && onDone?.()}
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
                    borderColor: phaseColor + '50',
                    backgroundColor: phaseColor + '15',
                    color: phaseColor,
                    boxShadow: `0 0 20px ${phaseColor}20`,
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
                Loading
              </>
            )}
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-1.5 mt-6"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: phaseColor }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
