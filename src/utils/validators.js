/**
 * Field Validators for Financial DNA Quiz
 *
 * Returns { valid: boolean, error: string | null }
 */

/**
 * Validate a name field (letters, spaces, hyphens, apostrophes only).
 * Min 2 characters.
 */
export function validateName(value) {
  if (!value || !value.trim()) {
    return { valid: false, error: 'Please enter a name.' };
  }

  const trimmed = value.trim();

  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters.' };
  }

  // Allow letters (any script), spaces, hyphens, apostrophes, periods
  if (!/^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s'\-\.]+$/.test(trimmed)) {
    return { valid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes.' };
  }

  return { valid: true, error: null };
}

/**
 * Validate an email address (standard RFC-ish check).
 */
export function validateEmail(value) {
  if (!value || !value.trim()) {
    return { valid: false, error: 'Please enter an email address.' };
  }

  const trimmed = value.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  return { valid: true, error: null };
}

/**
 * Validate a Singapore mobile number.
 * - Exactly 8 digits
 * - Must start with 8 or 9
 * - Reject if +65 or country code is included
 */
export function validatePhone(value) {
  if (!value || !value.trim()) {
    return { valid: false, error: 'Please enter your mobile number.' };
  }

  const trimmed = value.trim();

  // Reject if user typed +65 or 65 prefix
  if (/^\+?\d{0,2}65/.test(trimmed) && trimmed.replace(/\D/g, '').length > 8) {
    return { valid: false, error: 'Please enter 8 digits only, without +65.' };
  }

  // Strip all non-digits for validation
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length !== 8) {
    return { valid: false, error: 'Mobile number must be exactly 8 digits.' };
  }

  if (!/^[89]/.test(digits)) {
    return { valid: false, error: 'Singapore mobile numbers start with 8 or 9.' };
  }

  return { valid: true, error: null };
}

/**
 * Get the appropriate validator for a question type / mapToKey.
 * Returns null if no special validation is needed.
 */
export function getValidator(question) {
  if (!question) return null;

  const { type, mapToKey } = question;

  // Name fields
  if (mapToKey === 'clientName' || mapToKey === 'friendName') {
    return validateName;
  }

  // Email
  if (type === 'email' || mapToKey === 'clientEmail') {
    return validateEmail;
  }

  // Phone
  if (type === 'tel' || mapToKey === 'clientMobile') {
    return validatePhone;
  }

  return null;
}
