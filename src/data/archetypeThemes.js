/**
 * ARCHETYPE THEME SYSTEM
 *
 * 6 Financial DNA archetypes + 3 emotional drivers.
 * Each archetype defines visual identity (colors, gradients, glows)
 * that the UI dynamically adopts for the results experience.
 */

// ─────────────────────────────────────────────
// THE 6 ARCHETYPES
// ─────────────────────────────────────────────

export const archetypes = {
  architect: {
    id: 'architect',
    name: 'The Architect',
    emoji: '🏗️',
    tagline: 'You build wealth like you build empires, brick by brick.',
    description:
      "Strategic, structured, always thinking three steps ahead. You don't leave money to chance. You engineer outcomes.",
    traits: ['Disciplined', 'Strategic', 'Long-term'],
    color: {
      primary: '#3b82f6',
      light: '#60a5fa',
      dark: '#1d4ed8',
      glow: 'rgba(59, 130, 246, 0.4)',
      bg: 'rgba(59, 130, 246, 0.08)',
      border: 'rgba(59, 130, 246, 0.25)',
    },
    gradient: 'from-blue-500 to-cyan-400',
    icon: 'Ruler',
  },

  maverick: {
    id: 'maverick',
    name: 'The Maverick',
    emoji: '🚀',
    tagline: "Go big or go home. That's your financial mantra.",
    description:
      "Bold moves, high stakes, maximum returns. You trust your gut and aren't afraid to bet on yourself.",
    traits: ['Risk-taker', 'Aggressive', 'Action-driven'],
    color: {
      primary: '#ef4444',
      light: '#f87171',
      dark: '#b91c1c',
      glow: 'rgba(239, 68, 68, 0.4)',
      bg: 'rgba(239, 68, 68, 0.08)',
      border: 'rgba(239, 68, 68, 0.25)',
    },
    gradient: 'from-red-500 to-orange-400',
    icon: 'Rocket',
  },

  zenMaster: {
    id: 'zenMaster',
    name: 'The Zen Master',
    emoji: '🧘',
    tagline: 'Patience is your superpower. Steady wins the race.',
    description:
      'Balanced portfolio, balanced mind, balanced life. You play the long game and sleep well at night.',
    traits: ['Balanced', 'Calm', 'Methodical'],
    color: {
      primary: '#10b981',
      light: '#34d399',
      dark: '#047857',
      glow: 'rgba(16, 185, 129, 0.4)',
      bg: 'rgba(16, 185, 129, 0.08)',
      border: 'rgba(16, 185, 129, 0.25)',
    },
    gradient: 'from-emerald-500 to-teal-400',
    icon: 'Scale',
  },

  sleeper: {
    id: 'sleeper',
    name: 'The Sleeper',
    emoji: '💤',
    tagline: "You've got the potential. Time to wake it up.",
    description:
      "Your financial journey hasn't truly begun yet, but the raw talent is there. One good nudge could change everything.",
    traits: ['Untapped', 'Dormant', 'High-potential'],
    color: {
      primary: '#8b5cf6',
      light: '#a78bfa',
      dark: '#6d28d9',
      glow: 'rgba(139, 92, 246, 0.4)',
      bg: 'rgba(139, 92, 246, 0.08)',
      border: 'rgba(139, 92, 246, 0.25)',
    },
    gradient: 'from-violet-500 to-purple-400',
    icon: 'Moon',
  },

  explorer: {
    id: 'explorer',
    name: 'The Explorer',
    emoji: '🧭',
    tagline: "Every expert was once a beginner. You're on the right path.",
    description:
      "Curious, open-minded, and actively seeking knowledge. You know you don't know everything, and that makes you dangerous (in a good way).",
    traits: ['Curious', 'Learning', 'Open-minded'],
    color: {
      primary: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      glow: 'rgba(245, 158, 11, 0.4)',
      bg: 'rgba(245, 158, 11, 0.08)',
      border: 'rgba(245, 158, 11, 0.25)',
    },
    gradient: 'from-amber-500 to-yellow-400',
    icon: 'Compass',
  },

  firefighter: {
    id: 'firefighter',
    name: 'The Firefighter',
    emoji: '🔥',
    tagline: "You're putting out fires. Let's build a firewall instead.",
    description:
      "Reactive mode activated. Bills, debt, emergencies. You're handling it. But it's time to go from defence to offence.",
    traits: ['Reactive', 'Resilient', 'Action-oriented'],
    color: {
      primary: '#f97316',
      light: '#fb923c',
      dark: '#c2410c',
      glow: 'rgba(249, 115, 22, 0.4)',
      bg: 'rgba(249, 115, 22, 0.08)',
      border: 'rgba(249, 115, 22, 0.25)',
    },
    gradient: 'from-orange-500 to-red-400',
    icon: 'Flame',
  },
};

// ─────────────────────────────────────────────
// THE 3 EMOTIONAL DRIVERS
// ─────────────────────────────────────────────

export const emotionalDrivers = {
  guardian: {
    id: 'guardian',
    name: 'The Guardian',
    emoji: '🛡️',
    tagline: 'Protection first. You guard what matters most.',
    description: 'Security and stability drive every financial decision you make.',
    color: {
      primary: '#06b6d4',
      light: '#22d3ee',
      glow: 'rgba(6, 182, 212, 0.4)',
      bg: 'rgba(6, 182, 212, 0.08)',
    },
    gradient: 'from-cyan-500 to-blue-400',
  },

  freedomSeeker: {
    id: 'freedomSeeker',
    name: 'The Freedom Seeker',
    emoji: '🦅',
    tagline: 'Money is a tool for freedom, not a cage.',
    description: 'Independence and flexibility are your north star. You want options.',
    color: {
      primary: '#a855f7',
      light: '#c084fc',
      glow: 'rgba(168, 85, 247, 0.4)',
      bg: 'rgba(168, 85, 247, 0.08)',
    },
    gradient: 'from-purple-500 to-pink-400',
  },

  legacyBuilder: {
    id: 'legacyBuilder',
    name: 'The Legacy Builder',
    emoji: '🏛️',
    tagline: 'Building something that outlasts you.',
    description: 'Generational wealth and long-term impact fuel your decisions.',
    color: {
      primary: '#eab308',
      light: '#facc15',
      glow: 'rgba(234, 179, 8, 0.4)',
      bg: 'rgba(234, 179, 8, 0.08)',
    },
    gradient: 'from-yellow-500 to-amber-400',
  },
};

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/** Get archetype by id */
export function getArchetype(id) {
  return archetypes[id] || null;
}

/** Get all archetypes as an array */
export function getArchetypeList() {
  return Object.values(archetypes);
}

/** Get emotional driver by id */
export function getDriver(id) {
  return emotionalDrivers[id] || null;
}

/** Get all drivers as an array */
export function getDriverList() {
  return Object.values(emotionalDrivers);
}

/**
 * Build CSS custom-property style object for a given archetype.
 * Apply via `style={getArchetypeStyles('architect')}` on any container.
 */
export function getArchetypeStyles(archetypeId) {
  const a = archetypes[archetypeId];
  if (!a) return {};
  return {
    '--archetype-primary': a.color.primary,
    '--archetype-light': a.color.light,
    '--archetype-dark': a.color.dark,
    '--archetype-glow': a.color.glow,
    '--archetype-bg': a.color.bg,
    '--archetype-border': a.color.border,
  };
}
