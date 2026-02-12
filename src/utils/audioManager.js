import { Howl } from 'howler';

/**
 * AudioManager -- Singleton that handles site-wide BGM.
 *
 * - Lazy-loads on first play (respects browser autoplay policies)
 * - Loops seamlessly
 * - Persists mute state in localStorage
 * - Exposes simple play / pause / toggle API
 */

const STORAGE_KEY = 'financialdna_bgm_muted';

let bgm = null;
let initialized = false;

function getSound() {
  if (!bgm) {
    bgm = new Howl({
      src: [`${import.meta.env.BASE_URL}music/bgm.mp3`],
      loop: true,
      volume: 0.25,
      html5: true, // stream instead of full download
      preload: true,
    });
  }
  return bgm;
}

/** Returns true if user previously muted */
export function isMuted() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function saveMuted(val) {
  try {
    localStorage.setItem(STORAGE_KEY, val ? '1' : '0');
  } catch {
    // ignore
  }
}

/** Start BGM (call on first user interaction) */
export function startBGM() {
  const sound = getSound();
  if (isMuted()) {
    sound.mute(true);
  }
  if (!initialized) {
    sound.play();
    initialized = true;
  }
}

/** Toggle mute state, returns new muted value */
export function toggleMute() {
  const sound = getSound();
  const newMuted = !isMuted();
  sound.mute(newMuted);
  saveMuted(newMuted);

  // If first toggle and never started, start now
  if (!initialized) {
    sound.play();
    initialized = true;
  }

  return newMuted;
}

/** Programmatic mute/unmute */
export function setMuted(val) {
  const sound = getSound();
  sound.mute(val);
  saveMuted(val);
}

/** Set volume (0-1) */
export function setVolume(vol) {
  const sound = getSound();
  sound.volume(vol);
}
