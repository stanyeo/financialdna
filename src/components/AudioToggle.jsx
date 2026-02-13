import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { isMuted, toggleMute } from '../utils/audioManager';

/**
 * AudioToggle -- Persistent mute/unmute button for BGM.
 * Sits in the top-right corner of the screen.
 */
export default function AudioToggle() {
  const [muted, setMuted] = useState(isMuted());

  const handleToggle = () => {
    const newMuted = toggleMute();
    setMuted(newMuted);
  };

  return (
    <motion.button
      onClick={handleToggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-4 sm:top-4 sm:bottom-auto z-[60] w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-xl transition-colors"
      style={{
        backgroundColor: 'rgba(5, 10, 20, 0.7)',
        borderColor: muted ? 'rgba(255,255,255,0.1)' : 'rgba(0, 217, 255, 0.3)',
        boxShadow: muted ? 'none' : '0 0 15px rgba(0, 217, 255, 0.1)',
      }}
      title={muted ? 'Unmute music' : 'Mute music'}
    >
      {muted ? (
        <VolumeX className="w-4 h-4 text-gray-500" />
      ) : (
        <Volume2 className="w-4 h-4 text-cyan-400" />
      )}
    </motion.button>
  );
}
