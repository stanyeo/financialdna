/**
 * CONSULTANT PLAYBOOK
 * 
 * Strategic guidance for each archetype.
 * Used to provide personalized coaching language based on user profile.
 * Adapted from the Apps Script consultant playbook.
 */

export const archetypePlaybook = {
  Explorer: {
    archetype: 'Explorer',
    emoji: '🧭',
    truth:
      'You feel "broke" because you measure wealth in cash. But you are "rich" in time horizon.',
    blindSpot: 'Procrastination. You think "I\'ll start when I work," missing the compounding curve.',
    microAction: 'Start a small, automated monthly saving habit (The Plumbing).',
    psychology: 'Eager but intimidated. They don\'t want to be sold; they want Mentorship.',
    pitch: 'Insurability Lock-In. Secure health status while you have no pre-existing conditions.',
    objection: '"I have no cash flow."',
    counter:
      'That\'s why we use Medisave/Government schemes first. We need to lock in your clean bill of health before you join the workforce.',
    strategyNote: 'Focus on "Adulting" mentorship. Don\'t talk products, talk about the "Rules of the Game".',
  },

  Firefighter: {
    archetype: 'Firefighter',
    emoji: '🚒',
    truth: 'You are in survival mode. Your brain is wired to put out fires, making it impossible to plan.',
    blindSpot:
      'The "Hail Mary". Taking high risks to get out of debt fast usually burns the house down.',
    microAction: 'Cut one subscription today. Build a tiny Emergency Fund.',
    psychology: 'Shame. They feel judged. Be the non-judgmental doctor.',
    pitch: 'Pure Protection. Cover liabilities at lowest cost. No lock-in savings yet.',
    objection: '"I can\'t afford insurance, I have debt."',
    counter:
      'If you struggle now with income, imagine your family struggling with debt and NO income. We need a firewall.',
    strategyNote:
      'Do NOT sell savings plans. Sell Term Plans to protect the income source. Focus on "Balance Sheet Repair".',
  },

  Sleeper: {
    archetype: 'Sleeper',
    emoji: '🛌',
    truth: 'You aren\'t lazy; you are "Cognitively Overloaded". You value simplicity over optimization.',
    blindSpot:
      'The Inertia Tax. Leaving cash idle is paying a monthly fee for the luxury of doing nothing.',
    microAction: 'Set up an auto-transfer to a separate accumulation account on payday.',
    psychology:
      'Decision Fatigue. Do not give 3 options. Give 1 recommendation and handle the admin.',
    pitch: 'Automated Solutions. Outsourcing discipline to the system (RSP/Auto-Sweeps).',
    objection: '"Let me think about it."',
    counter:
      'Thinking is what cost you growth last year. Let\'s set up the "Starter Engine" today. We can adjust the speed later.',
    strategyNote:
      'The win here is Automation. If they have to log in monthly, they will fail. Sell the "Set & Forget" benefit.',
  },

  'Zen Master': {
    archetype: 'Zen Master',
    emoji: '🧘',
    truth: 'You are the rock. You will never be poor. Your discipline is your superpower.',
    blindSpot: 'The Silent Thief (Inflation). You preserve the number, but lose the value.',
    microAction: 'Move "Do Nothing" cash into lower-risk, interest-bearing instruments.',
    psychology: 'Fear of Loss. Do not show squiggly lines. Show staircase graphs.',
    pitch: 'Capital Preservation Tools (Annuities/Endowments/Bonds). Locking in yields.',
    objection: '"The returns are too low."',
    counter:
      'Yes, but they are stable. We aren\'t beating the market; we are beating inflation while letting you sleep.',
    strategyNote:
      'Validate their savings first. Then frame the new product as a "Better Bank Account" rather than an "Investment".',
  },

  Maverick: {
    archetype: 'Maverick',
    emoji: '🚀',
    truth: 'You have the "Hunter" mindset. You are built for wealth creation.',
    blindSpot: 'The Glass Cannon. High damage, low health. One recession could wipe you out.',
    microAction: 'Create a "Do Not Touch" account (6 months expenses). Risk the rest.',
    psychology: 'Overconfidence. Validate their skill, then sell the hedge.',
    pitch: 'Core-Satellite Strategy. You handle the Satellite (Trading); I manage the Core (Solvency).',
    objection: '"I can trade better than a manager."',
    counter:
      "I know you can. But even F1 drivers wear seatbelts. The Core ensures that a bad trading year doesn't crash your lifestyle.",
    strategyNote:
      "Don't fight them on Alpha. Let them win on the 20%. Fight for the 80% Core (Solvency/Protection).",
  },

  Architect: {
    archetype: 'Architect',
    emoji: '🏗️',
    truth: 'You treat finance like engineering. You optimize for efficiency.',
    blindSpot:
      'Complexity Risk. Your family wouldn\'t know how to unlock your system if you passed away.',
    microAction: 'Create a "Master File" (Death Folder) with all accounts and logins.',
    psychology: 'Intellect/Ego. Use "Consultative Frameworks", not sales scripts.',
    pitch: 'Legacy & Estate Planning. Tax efficiency, Trust structures, Will writing.',
    objection: '"I already have investments."',
    counter:
      "That's accumulation. Now we need Transferability. How do we bypass probate and ensure efficiency for your heirs?",
    strategyNote:
      'Move the conversation from "Accumulation" (making money) to "Distribution" (passing it on). That is the Architect\'s final frontier.',
  },
};

/**
 * Get playbook for an archetype
 */
export function getPlaybook(archetype) {
  return archetypePlaybook[archetype] || archetypePlaybook.Sleeper;
}

/**
 * Get all playbooks
 */
export function getAllPlaybooks() {
  return archetypePlaybook;
}

export default archetypePlaybook;
