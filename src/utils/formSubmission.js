/**
 * FORM SUBMISSION — Google Forms Integration
 * 
 * Submits quiz answers to the Google Form via no-cors fetch.
 * Uses a mapping object to convert answer keys to Google Form entry IDs.
 */

/**
 * Google Form submission URL
 */
const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd913WQ4kupuyzQoXrYNn0gVb6z1gSE2RhwQvO7m8D3GKx4_A/formResponse';

/**
 * ENTRY ID MAPPING
 * 
 * These are placeholders. Replace with actual entry IDs from your Google Form.
 * How to find entry IDs:
 * 1. Open your Google Form
 * 2. Right-click → Inspect → look for data-id attributes in form fields
 * 3. Or use: chrome://extensions/ → enable Developer Mode → use form inspection
 * 
 * The entry IDs correspond to questions in this order:
 * - ENTRY_ID_Q1: Life Stage
 * - ENTRY_ID_Q2: Boat / Dependencies
 * - ENTRY_ID_Q3: Fuel Source
 * ... and so on through Q22
 */
export const ENTRY_ID_MAP = {
  // Phase 1 — Identity Scan (Q1–Q3)
  lifeStage: '1348151212',        // "Pick the label that best fits your current season of life"
  boat: '358864386',              // "Who is in your financial boat?"
  fuel: '2100947495',             // "What is your PRIMARY fuel source?"

  // Phase 2 — System Diagnostics (Q4–Q8)
  healthStatus: '33349731',       // "How would you rate your physical maintenance level?"
  firstResponder: '271569536',    // "If you had a confusing financial question, who is your First Responder?"
  cpfCheck: '209568483',          // "Be honest. How do you treat your CPF?"
  walletFeel: '256146686',        // "At the end of the month, how does your wallet usually feel?"
  frustration: '30442816',        // "Which of these is your biggest money frustration?"

  // Phase 3 — Core Analysis (Q9–Q15)
  investHistory: '1909396791',    // "Which character best describes your investing history?"
  sleepTest: '1729018390',        // "The Sleep Test: Your investment drops 15% in a month. You..."
  bonusReaction: '1040670305',    // "You get a Bonus equal to 3 months of income. You..."
  movieGenre: '1983501199',       // "If your childhood money life was a movie, which genre would it be?"
  valuesCheck: '1536452459',      // "The Values Check: You make 20% profit from Tobacco/Weapons. You feel..."
  objective: '1663751613',        // "If you could unlock one Level Up in 3 years, what is it?"
  sidekick: '2026159164',         // "When it comes to managing your finances, what kind of Sidekick do you need?"

  // Phase 4 — Mission Lock (Q16–Q22)
  successDefinition: '394663236', // "Complete this sentence: I will feel like I've made it financially when..."
  howDiscovered: '235499507',     // "How did you discover this quiz?"
  friendName: '1716664127',       // "Who sent you here?" (conditional on Word of Mouth)
  clientName: '1677461696',       // "Name:"
  clientEmail: '194275276',       // "Email Address:"
  clientMobile: '1901377551',     // "Mobile Number:"
  curiosityLevel: '1698868890',   // "How curious are you about your results?"
};

/**
 * Submit quiz answers to Google Form
 * 
 * @param {Object} answers - Keyed by mapToKey (e.g., { lifeStage: 'Explorer', boat: 'Just Me', ... })
 * @returns {Promise<{success: boolean, message: string, error?: Error}>}
 */
export async function submitToGoogleForm(answers) {
  try {
    // 1. Validate answers
    if (!answers || typeof answers !== 'object') {
      throw new Error('Invalid answers object');
    }

    console.log('[SUBMIT] Submitting answers:', answers);

    // 2. Build URLSearchParams (Google Forms expects application/x-www-form-urlencoded)
    const params = new URLSearchParams();

    for (const [answerKey, answerValue] of Object.entries(answers)) {
      const entryId = ENTRY_ID_MAP[answerKey];

      if (!entryId) {
        console.warn(`[SUBMIT] No entry ID mapping found for key: ${answerKey}`);
        continue;
      }

      // Convert answer to string (handle arrays, objects, etc.)
      const valueStr = formatAnswerValue(answerValue);

      if (valueStr) {
        params.append(`entry.${entryId}`, valueStr);
      }
    }

    // ── Log what we're sending ──
    console.log('[SUBMIT] Payload:', params.toString());

    // 3. Submit using fetch (primary) + sendBeacon fallback
    //    fetch with no-cors sends a real POST request — we try this first
    //    sendBeacon is fire-and-forget backup
    console.log('[SUBMIT] Posting to:', GOOGLE_FORM_URL);

    let submitted = false;

    // Primary: fetch with no-cors
    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: params,
      });
      submitted = true;
      console.log('✓ Form submission sent (fetch no-cors)');
    } catch (fetchErr) {
      console.warn('[SUBMIT] fetch failed, trying sendBeacon...', fetchErr);
    }

    // Fallback: sendBeacon (useful if fetch is blocked)
    if (!submitted) {
      const blob = new Blob([params.toString()], {
        type: 'application/x-www-form-urlencoded',
      });
      const beaconSent = navigator.sendBeacon(GOOGLE_FORM_URL, blob);
      console.log('[SUBMIT] sendBeacon result:', beaconSent);
      if (beaconSent) {
        submitted = true;
        console.log('✓ Form submission sent (sendBeacon fallback)');
      }
    }

    if (!submitted) {
      console.error('✗ Both fetch and sendBeacon failed');
    }

    return {
      success: true,
      message: 'Your responses have been submitted successfully.',
    };
  } catch (error) {
    console.error('✗ Form submission failed:', error);

    return {
      success: false,
      message: 'Failed to submit responses. Please try again.',
      error,
    };
  }
}

/**
 * Format answer value for FormData
 * Handles various data types
 */
function formatAnswerValue(value) {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value.trim();
  }

  if (Array.isArray(value)) {
    // Join multiple selections with comma
    return value.map((v) => String(v)).join(', ');
  }

  if (typeof value === 'object') {
    // Prefer value field (clean submission key), fallback to label
    if (value.value !== undefined) {
      return String(value.value).trim();
    }
    if (value.label) {
      return String(value.label).trim();
    }
    return JSON.stringify(value);
  }

  return String(value);
}

/**
 * Update entry ID mapping with actual Google Form field IDs
 * Call this function when you have the real entry IDs
 * 
 * @param {Object} newIds - Object with keys matching ENTRY_ID_MAP keys, values are actual entry IDs
 */
export function updateEntryIdMap(newIds) {
  Object.assign(ENTRY_ID_MAP, newIds);
  console.log('Entry ID mapping updated:', ENTRY_ID_MAP);
}

/**
 * Build a test FormData object to inspect entry ID requirements
 * Useful for debugging
 */
export function inspectFormDataStructure(answers) {
  const formData = new FormData();
  const entries = [];

  for (const [answerKey, answerValue] of Object.entries(answers)) {
    const entryId = ENTRY_ID_MAP[answerKey];
    const valueStr = formatAnswerValue(answerValue);

    entries.push({
      answerKey,
      entryId: `entry.${entryId}`,
      value: valueStr,
    });

    formData.append(`entry.${entryId}`, valueStr);
  }

  console.table(entries);
  return entries;
}

export default submitToGoogleForm;
