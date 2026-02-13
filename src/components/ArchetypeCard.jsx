import { motion } from 'framer-motion';

/**
 * ArchetypeCard — Displays a financial archetype with themed styling.
 *
 * @param {Object}   archetype — archetype definition from archetypeThemes.js
 * @param {boolean}  active    — whether this card is selected / highlighted
 * @param {function} onClick   — click handler
 * @param {string}   size      — 'sm' | 'md' | 'lg'
 */
export default function ArchetypeCard({
  archetype,
  active = false,
  onClick,
  size = 'md',
}) {
  const { emoji, name, tagline, traits, color, description } = archetype;

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-2xl border cursor-pointer
        transition-all duration-300 group
        ${sizeClasses[size]}
        ${active ? 'bg-dna-card/85 backdrop-blur-xl' : 'bg-dna-card/50 backdrop-blur-md'}
      `}
      style={{
        borderColor: active ? color.border : 'rgba(26, 45, 84, 0.4)',
        boxShadow: active
          ? `0 0 30px ${color.glow}, inset 0 1px 0 ${color.border}`
          : '0 8px 32px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Background glow on hover / active */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color.bg}, transparent 70%)`,
        }}
      />
      {active && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: `radial-gradient(circle at 30% 30%, ${color.bg}, transparent 60%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Emoji + Name */}
        <div className="flex items-start gap-3">
          <span className={size === 'lg' ? 'text-5xl' : 'text-3xl'}>
            {emoji}
          </span>
          <div className="min-w-0">
            <h3
              className={`font-bold leading-tight ${
                size === 'lg' ? 'text-2xl' : 'text-lg'
              }`}
              style={{ color: color.primary }}
            >
              {name}
            </h3>
            <p className="text-sm text-gray-400 mt-1 leading-snug">{tagline}</p>
          </div>
        </div>

        {/* Description (lg only) */}
        {size === 'lg' && (
          <p className="text-sm text-gray-400/80 mt-4 leading-relaxed">
            {description}
          </p>
        )}

        {/* Trait badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          {traits.map((trait) => (
            <span
              key={trait}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full tracking-wide"
              style={{
                backgroundColor: color.bg,
                color: color.light,
                border: `1px solid ${color.border}`,
              }}
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Active indicator */}
        {active && (
          <motion.div
            className="absolute top-3 right-3 w-2 h-2 rounded-full"
            style={{ backgroundColor: color.primary }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}
