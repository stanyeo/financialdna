/**
 * ARCHETYPE CALCULATOR
 * 
 * Replicates the Financial DNA behavioral analysis logic from Apps Script.
 * Calculates profile across 3 dimensions:
 * - X-Axis: Risk Appetite (High/Low)
 * - Y-Axis: Structural Discipline (High/Low)
 * - Z-Axis: Emotional Driver (Guardian/Freedom Seeker/Legacy Builder)
 * 
 * Plus situational overrides (Explorer/Firefighter) and content mapping keys.
 */

/**
 * Utility function for safe string inclusion checking
 */
const safeIncludes = (text, keyword) => {
  if (!text) return false;
  return text.toString().toLowerCase().includes(keyword.toLowerCase());
};

/**
 * Main profile calculator — takes raw answers and returns complete profile
 */
export function calculateProfile(answers) {
  // Extract answer values (handle both object and array formats)
  const data = normalizeAnswers(answers);

  // 1. X-AXIS: RISK APPETITE (High/Low)
  let riskAppetite = 'Low';
  if (
    safeIncludes(data.investHistory, 'Maverick') ||
    safeIncludes(data.investHistory, 'Trader') ||
    safeIncludes(data.sleepTest, 'Big Win') ||
    safeIncludes(data.sleepTest, 'Make Big Profit')
  ) {
    riskAppetite = 'High';
  }

  // 2. Y-AXIS: STRUCTURAL DISCIPLINE (High/Low)
  let structure = 'Low';
  if (
    safeIncludes(data.cpfCheck, 'Gold Mine') ||
    safeIncludes(data.cpfCheck, 'Safety Net') ||
    safeIncludes(data.walletFeel, 'Cushion') ||
    safeIncludes(data.walletFeel, 'Overflow')
  ) {
    structure = 'High';
  }

  // 3. CORE 4 ARCHETYPES (2x2 matrix of Risk × Structure)
  let archetype = 'Sleeper';
  if (riskAppetite === 'High' && structure === 'High') archetype = 'Architect';
  if (riskAppetite === 'High' && structure === 'Low') archetype = 'Maverick';
  if (riskAppetite === 'Low' && structure === 'High') archetype = 'Zen Master';
  if (riskAppetite === 'Low' && structure === 'Low') archetype = 'Sleeper';

  // 4. SITUATIONAL OVERRIDES (Explorer / Firefighter)
  let situationalOverride = null;

  // Explorer Override: Student / Entry-level / Time-rich, Capital-poor
  if (
    safeIncludes(data.lifeStage, 'Explorer') ||
    safeIncludes(data.lifeStage, 'Starter') ||
    safeIncludes(data.lifeStage, 'Student') ||
    safeIncludes(data.lifeStage, 'NSF')
  ) {
    archetype = 'Explorer';
    situationalOverride = 'Explorer';
  }

  // Firefighter Override: Cash flow crisis / Debt-stressed / Survival mode
  if (
    safeIncludes(data.walletFeel, 'Squeeze') ||
    safeIncludes(data.boat, 'Debt') ||
    safeIncludes(data.frustration, 'Debt')
  ) {
    archetype = 'Firefighter';
    situationalOverride = 'Firefighter';
  }

  // 5. Z-AXIS: EMOTIONAL DRIVER (Guardian / Freedom Seeker / Legacy Builder)
  let emotionalDriver = 'Guardian';
  const success = data.successDefinition || '';

  if (
    safeIncludes(success, 'freedom') ||
    safeIncludes(success, 'time') ||
    safeIncludes(success, 'passive') ||
    safeIncludes(success, 'retire') ||
    safeIncludes(success, 'choice') ||
    safeIncludes(success, 'option') ||
    safeIncludes(success, 'independent') ||
    safeIncludes(success, 'flexible')
  ) {
    emotionalDriver = 'Freedom Seeker';
  }

  if (
    safeIncludes(success, 'legacy') ||
    safeIncludes(success, 'children') ||
    safeIncludes(success, 'kids') ||
    safeIncludes(success, 'generation') ||
    safeIncludes(success, 'family') ||
    safeIncludes(success, 'provide') ||
    safeIncludes(success, 'generational') ||
    safeIncludes(success, 'inheritance')
  ) {
    emotionalDriver = 'Legacy Builder';
  }

  // 6. NARRATIVE KEY (for content mapping)
  let narrativeKey = 'A'; // default: accumulation phase
  const isSandwich = safeIncludes(data.boat, 'Sandwich');

  if (isSandwich) {
    narrativeKey = 'D'; // dual-dependency
  } else if (safeIncludes(data.boat, 'Asset Rich')) {
    narrativeKey = 'E'; // asset-liability mismatch
  } else if (
    safeIncludes(data.lifeStage, 'Builder') ||
    safeIncludes(data.lifeStage, 'Optimizer')
  ) {
    narrativeKey = 'B'; // consolidation phase
  } else if (
    safeIncludes(data.lifeStage, 'Preserver') ||
    safeIncludes(data.lifeStage, 'Pre-Retiree')
  ) {
    narrativeKey = 'C'; // preservation phase
  }

  // 7. COGNITIVE GAPS (blind spots)
  let cognitiveGap = 'Lifestyle Creep';

  if (riskAppetite === 'High' && safeIncludes(data.sleepTest, 'Stop')) {
    cognitiveGap = 'Fake Brave';
  } else if (
    (safeIncludes(data.boat, 'Children') || isSandwich) &&
    !safeIncludes(data.cpfCheck, 'Insurance')
  ) {
    cognitiveGap = 'Uninsured Pillar';
  }

  if (
    safeIncludes(data.bonusReaction, 'Treat') ||
    safeIncludes(data.bonusReaction, 'Spend')
  ) {
    cognitiveGap = 'Lifestyle Creep';
  }

  // 8. FRAGILITY ASSESSMENT
  let fragility = 'Capital Inefficient';

  // Priority 1: Solvency Risk (debt/squeeze)
  if (
    safeIncludes(data.boat, 'Debt') ||
    safeIncludes(data.walletFeel, 'Squeeze') ||
    safeIncludes(data.frustration, 'Debt')
  ) {
    fragility = 'Solvency Risk';
  }
  // Priority 2: Liquidity Constrained (asset-rich, cash-poor)
  else if (safeIncludes(data.boat, 'Asset Rich')) {
    fragility = 'Liquidity Constrained';
  }
  // Priority 3: High Human Capital Dependency (sandwich/dependents)
  else if (isSandwich || safeIncludes(data.boat, 'Children')) {
    fragility = 'High Human Capital Dependency';
  }

  // 9. PIVOT KEY (for strategy content mapping)
  let pivotKey = archetype;
  if (isSandwich) {
    pivotKey = 'Sandwich';
  }

  // 10. ORIGIN STORY (from childhood movie genre)
  const originKey = mapOriginStory(data.movieGenre);

  // Return complete profile object
  return {
    archetype,
    situationalOverride,
    riskAppetite,
    structure,
    emotionalDriver,
    narrativeKey,
    cognitiveGap,
    fragility,
    pivotKey,
    originKey,
    // Raw axes (0-100 scale for visualization)
    riskScore: riskAppetite === 'High' ? 75 : 25,
    structureScore: structure === 'High' ? 75 : 25,
  };
}

/**
 * Normalize answers — handle both object and array formats
 */
function normalizeAnswers(answers) {
  if (Array.isArray(answers)) {
    // Convert array to object keyed by mapToKey
    return answers.reduce((acc, answer, index) => {
      const answerObj = Array.isArray(answer) ? answer[0] : answer;
      return acc;
    }, {});
  }

  // Already an object, return as-is
  return answers;
}

/**
 * Map childhood movie genre to origin story key
 */
function mapOriginStory(movieGenre) {
  if (!movieGenre) return 'Documentary';

  if (safeIncludes(movieGenre, 'Silent')) return 'Silent Film';
  if (safeIncludes(movieGenre, 'Drama')) return 'Drama';
  if (safeIncludes(movieGenre, 'Fantasy')) return 'Fantasy';

  return 'Documentary';
}

/**
 * Get numeric score (0-100) for visualization
 */
export function getAxisScores(profile) {
  return {
    riskAppetite: profile.riskAppetite === 'High' ? 75 : 25,
    structure: profile.structure === 'High' ? 75 : 25,
    riskLabel: profile.riskAppetite,
    structureLabel: profile.structure,
  };
}

/**
 * Validate archetype is one of the 6 possible types
 */
export function isValidArchetype(archetype) {
  const valid = [
    'Explorer',
    'Starter',
    'Maverick',
    'Architect',
    'Zen Master',
    'Sleeper',
    'Firefighter',
  ];
  return valid.includes(archetype);
}

/**
 * Get verbose description for an archetype
 */
export function getArchetypeDescription(archetype) {
  const descriptions = {
    Explorer:
      'You are THE EXPLORER 🧭. You have immense time equity but limited capital. Your greatest risk is procrastination—starting later costs exponentially more.',
    Maverick:
      'You are THE MAVERICK 🚀. You excel at generating returns but lack a defensive floor. One bad recession could wipe you out without proper protection.',
    Architect:
      'You are THE ARCHITECT 🏗️. You optimize every detail, but your system only works when you are running it. Transferability is your blind spot.',
    'Zen Master':
      'You are THE ZEN MASTER 🧘. You prioritize certainty and sleep well at night. Your risk is inflation erosion—you are losing purchasing power safely.',
    Sleeper:
      'You are THE SLEEPER 🛌. You value simplicity over optimization. Your blind spot is inertia—each day you delay costs you thousands in lost compound growth.',
    Firefighter:
      'You are THE FIREFIGHTER 🚒. You are in survival mode. Your immediate goal is balance sheet stabilization, not optimization.',
  };

  return descriptions[archetype] || descriptions.Sleeper;
}

export default calculateProfile;
