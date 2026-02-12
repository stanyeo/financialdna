import { motion } from 'framer-motion';
import { PHASES } from '../data/quizData';

/**
 * ProgressBar — DNA Decoding progress indicator
 *
 * Shows phase-local progress: the bar fills within each phase,
 * resetting when a new phase begins.
 *
 * @param {number} current       — current question index (1-based)
 * @param {number} total         — total questions
 * @param {number} phase         — current phase (1-4)
 * @param {number} phaseStart    — index (1-based) of first question in current phase
 * @param {number} phaseEnd      — index (1-based) of last question in current phase
 */
export default function ProgressBar({
  current = 1,
  total = 22,
  phase = 1,
  phaseStart = 1,
  phaseEnd = 3,
}) {
  const phaseData = PHASES[phase] || PHASES[1];
  const color = phaseData.color;

  // Phase-local progress (0-100%)
  const phaseQuestionCount = phaseEnd - phaseStart + 1;
  const questionsCompletedInPhase = current - phaseStart;
  const phaseProgress = Math.min(
    Math.max((questionsCompletedInPhase / phaseQuestionCount) * 100, 0),
    100
  );

  const phaseLabels = ['Identity', 'Systems', 'Core', 'Mission', 'Details'];

  return (
    <div className="w-full space-y-2.5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.span
            className="text-base"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            🧬
          </motion.span>
          <span
            className="text-[11px] font-mono uppercase tracking-widest font-medium"
            style={{ color }}
          >
            {phaseData.title}
          </span>
        </div>
        <span className="text-[11px] font-mono text-gray-500">
          Phase {phase}/5 · Q{questionsCompletedInPhase + 1}/{phaseQuestionCount}
        </span>
      </div>

      {/* Bar — resets per phase */}
      <div className="relative h-1.5 bg-dna-surface/80 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}50, ${color})`,
            boxShadow: `0 0 16px ${color}40`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${phaseProgress}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
        {/* Shimmer effect on the fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${phaseProgress}%`,
            background: `linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)`,
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Phase nodes */}
      <div className="flex items-center justify-between px-0.5">
        {[1, 2, 3, 4, 5].map((phaseNum) => {
          const decoded = phase > phaseNum;
          const active = phase === phaseNum;
          const nodeColor = PHASES[phaseNum]?.color || '#1a2d54';

          return (
            <div key={phaseNum} className="flex flex-col items-center gap-1">
              <motion.div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
                style={{
                  backgroundColor: decoded || active ? nodeColor + '25' : 'rgba(26, 45, 84, 0.3)',
                  borderWidth: '1.5px',
                  borderStyle: 'solid',
                  borderColor: active ? nodeColor : decoded ? nodeColor + '60' : 'rgba(26, 45, 84, 0.4)',
                  boxShadow: active ? `0 0 10px ${nodeColor}50` : 'none',
                }}
                animate={active ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {decoded ? (
                  <span style={{ color: nodeColor }}>✓</span>
                ) : active ? (
                  <motion.span
                    style={{ color: nodeColor }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ●
                  </motion.span>
                ) : (
                  <span className="text-gray-700">○</span>
                )}
              </motion.div>
              <span
                className="text-[8px] font-mono uppercase tracking-wider"
                style={{
                  color: active ? nodeColor : decoded ? nodeColor + '80' : '#374151',
                }}
              >
                {phaseLabels[phaseNum - 1]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
