/**
 * FINANCIAL DNA QUIZ DATA -- Gamified Edition
 *
 * 22 questions across 5 phases, mapped to Google Form entry IDs.
 * Each option has a `value` field (sent to Google Form) and
 * a `label`/`description`/`emoji` for UI display.
 */

// ─────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────

/** Safely extract the submission value from an answer (string or option object). */
export function getAnswerValue(answer) {
  if (!answer) return '';
  if (typeof answer === 'string') return answer;
  if (answer.value !== undefined) return String(answer.value);
  if (answer.label) return String(answer.label);
  return String(answer);
}

// ─────────────────────────────────────────────
// PHASES
// ─────────────────────────────────────────────

export const PHASES = {
  1: {
    id: 1,
    title: 'Identity Scan',
    subtitle: "Let's figure out who you are",
    icon: '🔍',
    color: '#00d9ff',
    tailwind: 'cyan',
  },
  2: {
    id: 2,
    title: 'System Diagnostics',
    subtitle: 'Checking your financial vitals',
    icon: '⚡',
    color: '#fbbf24',
    tailwind: 'amber',
  },
  3: {
    id: 3,
    title: 'Core Analysis',
    subtitle: 'Decoding your money wiring',
    icon: '🧬',
    color: '#10b981',
    tailwind: 'emerald',
  },
  4: {
    id: 4,
    title: 'Mission Lock',
    subtitle: 'Define your mission',
    icon: '🎯',
    color: '#8b5cf6',
    tailwind: 'violet',
  },
  5: {
    id: 5,
    title: 'Final Details',
    subtitle: 'Almost there, let us wrap it up',
    icon: '✅',
    color: '#ec4899',
    tailwind: 'pink',
  },
};

export const PHASE_TRANSITIONS = {
  1: { message: "Let's start with who you are...", icon: '🔍' },
  2: { message: 'Identity locked. Running system diagnostics...', icon: '⚡' },
  3: { message: 'Vitals checked. Decoding your core DNA...', icon: '🧬' },
  4: { message: 'Core decoded. Time to lock in your mission.', icon: '🎯' },
  5: { message: 'Mission locked. Just a few final details.', icon: '✅' },
};

// ─────────────────────────────────────────────
// QUESTIONS
// ─────────────────────────────────────────────

export const quizData = [
  // ═══════════════════════════════════════════
  //  PHASE 1 -- IDENTITY SCAN  (Q1-Q4)
  // ═══════════════════════════════════════════
  {
    id: 'q1_lifeStage',
    level: 1,
    phase: 1,
    question: 'First up: where are you on the map? 🗺️',
    subtitle: 'Pick the character class that fits your current chapter.',
    type: 'single',
    options: [
      { label: 'The Explorer', value: '🎓 The Explorer: Student / NSF / Intern.', description: 'Student / NSF / Intern, still loading…', emoji: '🎓' },
      { label: 'The Starter', value: '🚀 The Starter: Fresh Grad / First Jobber.', description: 'Fresh grad / First jobber, tutorial complete', emoji: '🚀' },
      { label: 'The Builder', value: '🏗️ The Builder: Mid-Career / Climbing the ladder.', description: 'Mid-career, grinding & climbing', emoji: '🏗️' },
      { label: 'The Optimizer', value: '💎 The Optimizer: High Earner / Specialist.', description: 'High earner / Specialist, leveled up', emoji: '💎' },
      { label: 'The Owner', value: '👑 The Owner: Business Owner / Self-Employed.', description: 'Business owner / Self-employed, wrote my own game', emoji: '👑' },
      { label: 'The Preserver', value: '🛡️ The Preserver: Pre-Retiree or Retiree.', description: 'Pre-retiree / Retiree, endgame vibes', emoji: '🛡️' },
    ],
    googleEntryId: '1348151212',
    mapToKey: 'lifeStage',
  },
  {
    id: 'q2_boat',
    level: 2,
    phase: 1,
    question: "Who's riding in your financial boat? 🚣",
    subtitle: "Your money doesn't just support you. Who else is on board?",
    type: 'single',
    options: [
      { label: 'Just Me', value: '🛶 Just Me: I cover my own bills.', description: 'I cover my own bills, no passengers', emoji: '🛶' },
      { label: 'My Parents (In)', value: '🛥️ My Parents (In): They support me.', description: 'They still support me (no shame, just facts)', emoji: '🛥️' },
      { label: 'The Sandwich', value: '🥪 The Sandwich: I support kids AND parents.', description: 'I support kids AND parents, squeezed in the middle', emoji: '🥪' },
      { label: 'The Provider', value: '👶 The Provider: I support kids/partner.', description: 'I support my kids / partner', emoji: '👶' },
      { label: 'The Contributor', value: '🤝 The Contributor: I give allowance to parents.', description: 'I give allowance to parents', emoji: '🤝' },
    ],
    googleEntryId: '358864386',
    mapToKey: 'boat',
  },
  {
    id: 'q3_fuel',
    level: 3,
    phase: 1,
    question: "What's fueling your engine? ⛽",
    subtitle: 'Every ship needs fuel. What powers your finances?',
    type: 'single',
    options: [
      { label: 'The Allowance', value: '🍬 The Allowance: Fixed amount from parents/Government.', description: 'Fixed amount from parents / Government', emoji: '🍬' },
      { label: 'The Paycheck', value: '💼 The Paycheck: Steady monthly salary.', description: 'Steady monthly salary', emoji: '💼' },
      { label: 'The Hustle', value: '⚡ The Hustle: Variable income (Commission/Own Business).', description: 'Commission / Own business, variable income', emoji: '⚡' },
      { label: 'The Yield', value: '🐢 The Yield: Passive income / CPF Life / Pension.', description: 'Passive income / CPF Life / Pension', emoji: '🐢' },
    ],
    googleEntryId: '2100947495',
    mapToKey: 'fuel',
  },
  {
    id: 'q4_health',
    level: 4,
    phase: 1,
    question: "Quick body scan: how's the hardware? 🏥",
    subtitle: 'Your health affects your wealth plan. Quick status check.',
    type: 'single',
    options: [
      { label: 'Low Maintenance', value: '🟢 Low Maintenance: Clean bill of health.', description: 'Clean bill of health, all systems go', emoji: '🟢' },
      { label: 'Routine Servicing', value: '🟡 Routine Servicing: Minor common issues (e.g., Gastric/Cholesterol).', description: 'Minor stuff (gastric, cholesterol, the usual)', emoji: '🟡' },
      { label: 'High Maintenance', value: '🔴 High Maintenance: Chronic condition or regular specialist visits.', description: 'Chronic condition / regular specialist visits', emoji: '🔴' },
      { label: 'Unknown', value: '❓ Unknown: Haven\'t checked in years.', description: "Haven't checked in years (living on vibes)", emoji: '❓' },
    ],
    googleEntryId: '33349731',
    mapToKey: 'healthStatus',
  },

  // ═══════════════════════════════════════════
  //  PHASE 2 -- SYSTEM DIAGNOSTICS  (Q5-Q8)
  // ═══════════════════════════════════════════
  {
    id: 'q5_firstResponder',
    level: 5,
    phase: 2,
    question: 'Money SOS: who do you call? 📞',
    subtitle: "When you hit a confusing financial wall, who's your go-to?",
    type: 'single',
    options: [
      { label: 'Google / Reddit', value: '🔍 Google / Reddit: I trust the internet.', description: 'The internet is my financial advisor', emoji: '🔍' },
      { label: 'Friends / Family', value: '🤝 Friends / Family: I rely on my circle.', description: 'I trust my circle', emoji: '🤝' },
      { label: 'My Advisor', value: '📞 My Advisor: I have a pro on speed dial.', description: "I've got a pro on speed dial", emoji: '📞' },
      { label: 'No One', value: '🤷 No One: I\'d just guess or ignore it.', description: "I just guess... or ignore it", emoji: '🤷' },
    ],
    googleEntryId: '271569536',
    mapToKey: 'firstResponder',
  },
  {
    id: 'q6_cpfCheck',
    level: 6,
    phase: 2,
    question: "Real talk: what's your CPF vibe? 🏦",
    subtitle: 'No judgement zone. How do you actually treat your CPF?',
    type: 'single',
    options: [
      { label: 'Ignore it', value: '🙈 Ignore it: I pretend it doesn\'t exist.', description: "CPF? I pretend it doesn't exist", emoji: '🙈' },
      { label: 'My House', value: '🏠 My House: It\'s only for property.', description: "It's basically just for my property", emoji: '🏠' },
      { label: 'My Safety Net', value: '🏥 My Safety Net: It\'s just for medical/retirement.', description: "For medical / retirement, that's about it", emoji: '🏥' },
      { label: 'My Gold Mine', value: '💰 My Gold Mine: It\'s a key bond component of my wealth.', description: 'Key part of my wealth strategy', emoji: '💰' },
    ],
    googleEntryId: '209568483',
    mapToKey: 'cpfCheck',
  },
  {
    id: 'q7_walletFeel',
    level: 7,
    phase: 2,
    question: 'End of the month, wallet check 👛',
    subtitle: 'Rate the vibe of your wallet when payday is still days away.',
    type: 'single',
    options: [
      { label: 'The Squeeze', value: '🍋 The Squeeze: Tight. Counting days to payday.', description: 'Tight. Counting days to payday', emoji: '🍋' },
      { label: 'The Breather', value: '😮‍💨 The Breather: Okay, but vulnerable to surprises.', description: 'Okay, but one surprise could wreck me', emoji: '😮‍💨' },
      { label: 'The Cushion', value: '🛋️ The Cushion: Comfortable surplus.', description: 'Comfortable surplus, no stress', emoji: '🛋️' },
      { label: 'The Overflow', value: '🌊 The Overflow: Don\'t know where to put the extra cash.', description: "Don't even know where to put the extra", emoji: '🌊' },
    ],
    googleEntryId: '256146686',
    mapToKey: 'walletFeel',
  },
  {
    id: 'q8_frustration',
    level: 8,
    phase: 2,
    question: 'Pick your biggest money villain 🦹',
    subtitle: 'Every hero has a nemesis. What bugs you the most?',
    type: 'single',
    options: [
      { label: 'The Leak', value: '🕳️ The Leak: "I don\'t know where it all goes."', description: "I don't know where my money goes", emoji: '🕳️' },
      { label: 'The Snail', value: '🐌 The Snail: "I save, but it\'s not growing."', description: "I save, but it's growing soooo slow", emoji: '🐌' },
      { label: 'The Fog', value: '🌫️ The Fog: "My policies are a mess."', description: 'My policies & finances are a mess', emoji: '🌫️' },
      { label: 'The FOMO', value: '😱 The FOMO: "I\'m missing out on the market."', description: "Everyone's making money except me", emoji: '😱' },
      { label: 'The Debt', value: '💣 The Debt: "Loans are stressing me out."', description: 'Loans are stressing me out', emoji: '💣' },
    ],
    googleEntryId: '30442816',
    mapToKey: 'frustration',
  },

  // ═══════════════════════════════════════════
  //  PHASE 3 -- CORE ANALYSIS  (Q9-Q13)
  // ═══════════════════════════════════════════
  {
    id: 'q9_investHistory',
    level: 9,
    phase: 3,
    question: 'Your investing origin story 📖',
    subtitle: "No wrong answers. Where are you on the investing journey?",
    type: 'single',
    options: [
      { label: 'The Rookie', value: '👶 The Rookie: Cash/Fixed Deposits only.', description: "Cash & Fixed Deposits only, haven't started", emoji: '👶' },
      { label: 'The Dabbler', value: '🧪 The Dabbler: Guessing with apps.', description: 'Tried some apps, mostly guessing', emoji: '🧪' },
      { label: 'The Investor', value: '🏗️ The Investor: Structured portfolio.', description: 'Got a structured portfolio going', emoji: '🏗️' },
      { label: 'The Trader', value: '📊 The Trader: Active analysis/management.', description: "Active analysis & management. I'm in deep", emoji: '📊' },
    ],
    googleEntryId: '1909396791',
    mapToKey: 'investHistory',
  },
  {
    id: 'q10_sleepTest',
    level: 10,
    phase: 3,
    question: 'THE SLEEP TEST 😱',
    subtitle: 'Your investment drops 15 % in a month. What do you do?',
    type: 'single',
    options: [
      { label: 'Just Break Even', value: '⚖️ Just Break Even: I just want my money back.', description: 'I just want my money back', emoji: '⚖️' },
      { label: 'Make Small Profit', value: '🤏 Make Small Profit: I need to beat the bank.', description: 'I need to at least beat the bank', emoji: '🤏' },
      { label: 'Make Big Win', value: '🚀 Make Big Win: High risk, high reward.', description: 'High risk, high reward. Let it ride', emoji: '🚀' },
      { label: 'Stop', value: '🛑 Stop: Sell immediately. I can\'t handle it.', description: "SELL. I can't handle this", emoji: '🛑' },
    ],
    googleEntryId: '1729018390',
    mapToKey: 'sleepTest',
  },
  {
    id: 'q11_bonusReaction',
    level: 11,
    phase: 3,
    question: "Plot twist: you get 3 months' bonus 💸",
    subtitle: 'Unexpected windfall just hit your account. First instinct?',
    type: 'single',
    options: [
      { label: 'Treat Myself', value: '🛍️ Treat Myself: Travel / Luxury.', description: 'Vacay / luxury / I deserve this', emoji: '🛍️' },
      { label: 'Lock it', value: '🏦 Lock it: Straight to savings.', description: "Straight to savings, don't touch", emoji: '🏦' },
      { label: 'Grow it', value: '🌱 Grow it: Invest in the market.', description: 'Invest and make it multiply', emoji: '🌱' },
      { label: 'Clear the Slate', value: '🧹 Clear the Slate: Pay off debts.', description: 'Pay off debts first, freedom later', emoji: '🧹' },
    ],
    googleEntryId: '1040670305',
    mapToKey: 'bonusReaction',
  },
  {
    id: 'q12_movieGenre',
    level: 12,
    phase: 3,
    question: 'If your childhood money life was a movie 🎬',
    subtitle: 'Think back. What genre best describes money talks at home?',
    type: 'single',
    options: [
      { label: 'The Silent Film', value: '😶 The Silent Film: Taboo; never discussed.', description: 'Money was taboo, never discussed', emoji: '😶' },
      { label: 'The Drama', value: '🎭 The Drama: Stress and arguments.', description: 'Stress, arguments, tension', emoji: '🎭' },
      { label: 'The Fantasy', value: '🧚 The Fantasy: Abundance; got whatever I wanted.', description: 'Abundance, got whatever I wanted', emoji: '🧚' },
      { label: 'The Documentary', value: '📽️ The Documentary: Calm and logical.', description: 'Calm, logical, educational', emoji: '📽️' },
    ],
    googleEntryId: '1983501199',
    mapToKey: 'movieGenre',
  },
  {
    id: 'q13_valuesCheck',
    level: 13,
    phase: 3,
    question: 'The Ethics Round ⚖️',
    subtitle: 'You make 20 % profit from tobacco / weapons stocks. How do you feel?',
    type: 'single',
    options: [
      { label: 'Great', value: '🤑 Great: Profit is profit.', description: 'Profit is profit, no feelings', emoji: '🤑' },
      { label: 'A bit "Ick"', value: '🤢 A bit "Ick": Prefer to avoid if possible.', description: "I'd prefer to avoid if there's an alternative", emoji: '🤢' },
      { label: 'Hard No', value: '🚫 Hard No: Refuse to profit from harm.', description: 'Refuse to profit from harm, period', emoji: '🚫' },
    ],
    googleEntryId: '1536452459',
    mapToKey: 'valuesCheck',
  },

  // ═══════════════════════════════════════════
  //  PHASE 4 -- MISSION LOCK  (Q14-Q16)
  // ═══════════════════════════════════════════
  {
    id: 'q14_objective',
    level: 14,
    phase: 4,
    question: 'Choose your 3-year power-up 🎮',
    subtitle: 'If you could unlock ONE achievement in the next 3 years...',
    type: 'single',
    options: [
      { label: 'The Big Ticket', value: '🏠 The Big Ticket: House / Car.', description: 'House / Car, major purchase unlock', emoji: '🏠' },
      { label: 'The Freedom', value: '🏖️ The Freedom: Passive income stream.', description: 'Passive income stream', emoji: '🏖️' },
      { label: 'The Shield', value: '🛡️ The Shield: Family protection.', description: 'Family protection & insurance', emoji: '🛡️' },
      { label: 'The Legacy', value: '🏛️ The Legacy: Passing wealth to the next generation.', description: 'Pass wealth to the next generation', emoji: '🏛️' },
    ],
    googleEntryId: '1663751613',
    mapToKey: 'objective',
  },
  {
    id: 'q15_sidekick',
    level: 15,
    phase: 4,
    question: 'Pick your financial sidekick 🤖',
    subtitle: 'What kind of financial help do you actually want?',
    type: 'single',
    options: [
      { label: 'The Gym Coach', value: '🏋️ The Gym Coach: Push me, keep me disciplined.', description: 'Push me, keep me disciplined', emoji: '🏋️' },
      { label: 'The Professor', value: '🎓 The Professor: Teach me the logic.', description: 'Teach me the logic & strategy', emoji: '🎓' },
      { label: 'The Butler', value: '🤵 The Butler: Handle the paperwork/stress.', description: 'Just handle it all for me', emoji: '🤵' },
      { label: 'The GPS', value: '🗺️ The GPS: Give options, I\'ll drive.', description: "Give me options, I'll drive", emoji: '🗺️' },
    ],
    googleEntryId: '2026159164',
    mapToKey: 'sidekick',
  },
  {
    id: 'q16_successDefinition',
    level: 16,
    phase: 4,
    question: 'Complete the mission briefing ✍️',
    subtitle: '"I\'ll feel like I\'ve made it financially when..."',
    type: 'text',
    placeholder: 'Type your honest answer... no wrong answers here',
    googleEntryId: '394663236',
    mapToKey: 'successDefinition',
  },

  // ═══════════════════════════════════════════
  //  PHASE 5 -- FINAL DETAILS  (Q17-Q22)
  // ═══════════════════════════════════════════
  {
    id: 'q17_howDiscovered',
    level: 17,
    phase: 5,
    question: "How'd you find us? 👋",
    subtitle: 'Quick one: where did you discover this quiz?',
    type: 'single',
    options: [
      { label: 'Instagram', value: '📸 Instagram', emoji: '📸' },
      { label: 'LinkedIn', value: '💼 LinkedIn', emoji: '💼' },
      { label: 'Telegram', value: '✈️ Telegram', emoji: '✈️' },
      { label: 'Word of Mouth (Friend/Referral)', value: '🗣️ Word of Mouth (Friend/Referral)', emoji: '🗣️' },
      { label: 'Other', value: '🌐 Other', emoji: '🌐' },
    ],
    googleEntryId: '235499507',
    mapToKey: 'howDiscovered',
  },
  {
    id: 'q18_friendReferral',
    level: 18,
    phase: 5,
    question: "Who's the legend that sent you? 🏆",
    subtitle: 'Shout out your friend. They have good taste.',
    type: 'text',
    placeholder: "Your friend's name...",
    googleEntryId: '1716664127',
    mapToKey: 'friendName',
    showIf: (answers) =>
      getAnswerValue(answers.howDiscovered) === '\ud83d\udde3\ufe0f Word of Mouth (Friend/Referral)',
  },
  {
    id: 'q19_name',
    level: 19,
    phase: 5,
    question: 'What should we call you? 👤',
    subtitle: 'Your DNA report needs a name on it.',
    type: 'text',
    placeholder: 'Your full name',
    googleEntryId: '1677461696',
    mapToKey: 'clientName',
  },
  {
    id: 'q20_email',
    level: 20,
    phase: 5,
    question: 'Where do we send your DNA Blueprint? 📬',
    subtitle: "We'll email your personalised Financial DNA report here.",
    type: 'email',
    placeholder: 'your.email@example.com',
    googleEntryId: '194275276',
    mapToKey: 'clientEmail',
  },
  {
    id: 'q21_mobile',
    level: 21,
    phase: 5,
    question: 'Drop your number? 📱',
    subtitle: 'We need this to follow up with your insights.',
    type: 'tel',
    placeholder: '81234567',
    googleEntryId: '1901377551',
    mapToKey: 'clientMobile',
  },
  {
    id: 'q22_curiosity',
    level: 22,
    phase: 5,
    question: 'One last thing: how deep do you want to go? 🔮',
    subtitle: "This helps us know what kind of follow-up you'd like.",
    type: 'single',
    options: [
      { label: 'Just browsing', value: '👀 Just browsing: Just email me the archetype result, thanks!', description: "Email me my results, that's it", emoji: '👀' },
      { label: 'Curious', value: '🤔 Curious: I have a specific question about my result. Let\'s chat over text/Zoom.', description: "I have questions. Let's have a quick chat", emoji: '🤔' },
      { label: 'Serious', value: '🔥 Serious: I want to fix my \'Money Bug\' ASAP. When are you free?', description: 'I want to fix my money game ASAP', emoji: '🔥' },
    ],
    googleEntryId: '1698868890',
    mapToKey: 'curiosityLevel',
  },
];

export default quizData;
