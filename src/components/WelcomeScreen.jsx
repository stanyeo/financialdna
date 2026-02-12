import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dna, ChevronRight, ChevronLeft } from 'lucide-react';
import ArchetypeCard from './ArchetypeCard';
import { archetypes } from '../data/archetypeThemes';

/**
 * WelcomeScreen — Mobile-optimised landing with carousel archetype cards.
 */
export default function WelcomeScreen({ onStart }) {
  const [currentArchetype, setCurrentArchetype] = useState(0);
  const archetypeList = Object.values(archetypes);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12">
      {/* DNA Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mb-6"
      >
        <div
          className="w-20 h-20 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center"
          style={{ boxShadow: '0 0 40px rgba(0, 217, 255, 0.15)' }}
        >
          <Dna className="w-10 h-10 text-neon-cyan" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-tight"
      >
        What's your{' '}
        <span className="text-neon-cyan text-glow-cyan">Financial</span>{' '}
        <span className="text-white">DNA?</span>
      </motion.h1>

      {/* Tagline with emoji */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-gray-300 text-sm sm:text-base mt-3 text-center max-w-sm font-medium"
      >
        🧬 Discover your financial wiring
      </motion.p>

      {/* Descriptive subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="text-xs sm:text-sm text-gray-400 mt-2 text-center max-w-md leading-relaxed"
      >
        Your money mindset isn't random. It's hardwired. Learn what drives your financial decisions.
      </motion.p>

      {/* What to expect */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="glass-subtle p-5 mt-10 max-w-md w-full bg-gradient-to-br from-gray-800/50 to-gray-900/30 border border-gray-700/50"
      >
        <div className="space-y-3">
          {[
            { icon: '⚡', text: '21 quick questions', subtext: 'About your real money habits', color: '#f59e0b' },
            { icon: '🎭', text: '6 financial archetypes', subtext: 'See which one you are', color: '#8b5cf6' },
            { icon: '📊', text: 'Personalized insights', subtext: 'Sent straight to your inbox', color: '#00d9ff' },
          ].map((item) => (
            <div key={item.text} className="flex flex-col items-center text-center gap-1">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: item.color + '15',
                  border: `1px solid ${item.color}30`,
                }}
              >
                <span className="text-lg">{item.icon}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-100">{item.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.subtext}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-700/50 my-3"></div>
        
        {/* Time & Trust section */}
        <div className="space-y-3">
          <p className="text-xs text-gray-300 text-center font-medium">Takes 3 minutes or less. No sign-up needed. Results are instant.</p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-300">
            <span>✓ No BS</span>
            <span>✓ Private</span>
            <span>✓ Fun</span>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.75 }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0, 217, 255, 0.5)' }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="mt-10 px-12 py-4 bg-neon-cyan/20 border border-neon-cyan/60 rounded-2xl
                   text-neon-cyan font-bold text-base sm:text-lg tracking-wide
                   hover:bg-neon-cyan/30 transition-all duration-300
                   flex items-center justify-center gap-2 shadow-lg"
      >
        🚀 Start My Scan
        <ChevronRight className="w-5 h-5" />
      </motion.button>

      {/* Archetype carousel — full cards, one at a time, swipeable with arrow buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-14 w-full max-w-4xl px-4"
      >
        <div className="text-center mb-8">
          <p className="text-lg sm:text-xl font-semibold text-white mb-3">
            Meet Your Archetypes
          </p>
          <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto">
            Swipe or click to explore the 6 financial personalities. Which one fits you?
          </p>
        </div>

        {/* Carousel with arrows */}
        <div className="flex items-center justify-center gap-4 md:gap-6">
          {/* Left arrow button */}
          <motion.button
            onClick={() =>
              setCurrentArchetype((prev) =>
                prev === 0 ? archetypeList.length - 1 : prev - 1
              )
            }
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex p-2 rounded-lg border border-gray-600 hover:border-neon-cyan transition-colors"
            title="Previous archetype"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 hover:text-neon-cyan" />
          </motion.button>

          {/* Carousel container with swipe */}
          <div className="flex-1 relative overflow-hidden rounded-lg max-w-sm">
            <motion.div
              drag="x"
              dragConstraints={{ left: -200, right: 200 }}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold) {
                  // Swiped left — next archetype
                  setCurrentArchetype((prev) => (prev + 1) % archetypeList.length);
                } else if (info.offset.x > swipeThreshold) {
                  // Swiped right — previous archetype
                  setCurrentArchetype((prev) =>
                    prev === 0 ? archetypeList.length - 1 : prev - 1
                  );
                }
              }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="cursor-grab active:cursor-grabbing"
            >
              <ArchetypeCard
                archetype={archetypeList[currentArchetype]}
                size="md"
              />
            </motion.div>
          </div>

          {/* Right arrow button */}
          <motion.button
            onClick={() =>
              setCurrentArchetype((prev) => (prev + 1) % archetypeList.length)
            }
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex p-2 rounded-lg border border-gray-600 hover:border-neon-cyan transition-colors"
            title="Next archetype"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 hover:text-neon-cyan" />
          </motion.button>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center gap-2 mt-6">
          {archetypeList.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentArchetype(idx)}
              className="relative w-2 h-2 rounded-full transition-all"
              initial={false}
              animate={{
                backgroundColor:
                  idx === currentArchetype
                    ? archetypeList[currentArchetype].color.primary
                    : 'rgba(107, 114, 128, 0.3)',
                scale: idx === currentArchetype ? 1.3 : 1,
              }}
              whileHover={{ scale: 1.2 }}
              aria-label={`Go to archetype ${idx + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-xs text-gray-500 text-center mt-4">
          {currentArchetype + 1} of {archetypeList.length}
        </p>
      </motion.div>
    </div>
  );
}
