import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL;

/** All avatars used across phases + intro/result */
const AVATAR_PATHS = [
  `${BASE_URL}avatars/avatar-intro.png`,
  `${BASE_URL}avatars/avatar-phase1.png`,
  `${BASE_URL}avatars/avatar-phase2.png`,
  `${BASE_URL}avatars/avatar-phase3.png`,
  `${BASE_URL}avatars/avatar-phase4.png`,
  `${BASE_URL}avatars/avatar-phase5.png`,
  `${BASE_URL}avatars/avatar-result.png`,
];

function preloadImages(paths) {
  return Promise.all(
    paths.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // don't block on failure
          img.src = src;
        })
    )
  );
}

/**
 * LoadingScreen - Preloads all avatar images, shows a DNA spinner,
 * then fades out. Minimum 2s display so the transition feels intentional.
 */
export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let done = false;

    // Animate progress bar from 0 to 90 while loading
    const interval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + Math.random() * 12 : p));
    }, 200);

    const minDelay = new Promise((r) => setTimeout(r, 2000));

    Promise.all([preloadImages(AVATAR_PATHS), minDelay]).then(() => {
      if (done) return;
      clearInterval(interval);
      setProgress(100);
      // Small pause at 100% before fading out
      setTimeout(() => onComplete(), 400);
    });

    // Safety net: proceed after 5s even if images stall
    const safety = setTimeout(() => {
      done = true;
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => onComplete(), 400);
    }, 5000);

    return () => {
      done = true;
      clearInterval(interval);
      clearTimeout(safety);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
        style={{ backgroundColor: '#0a1220' }}
      >
        {/* Spinning DNA icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="mb-6"
        >
          <Dna className="w-12 h-12 text-neon-cyan" style={{ filter: 'drop-shadow(0 0 12px rgba(0, 217, 255, 0.4))' }} />
        </motion.div>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm font-mono text-gray-400 tracking-widest uppercase mb-6"
        >
          Initializing scan...
        </motion.p>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-dna-border/40 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: '#00d9ff' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
