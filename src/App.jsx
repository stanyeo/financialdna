import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizContainer from './components/QuizContainer';
import AudioToggle from './components/AudioToggle';
import { startBGM } from './utils/audioManager';

/**
 * App -- Root component.
 * Welcome screen -> Quiz -> Confirmation (handled inside QuizContainer).
 */
export default function App() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    startBGM(); // Begin ambient music on first interaction
    setStarted(true);
  };

  return (
    <div className="relative min-h-screen bg-dna-bg overflow-hidden">
      {/* ── BGM toggle ── */}
      {started && <AudioToggle />}

      {/* ── Ambient orbs ── */}
      <div className="ambient-orb ambient-orb-cyan w-[500px] h-[500px] -top-32 -left-32" />
      <div className="ambient-orb ambient-orb-amber w-[350px] h-[350px] bottom-20 right-[-80px]" />

      {/* ── Grid overlay ── */}
      <div className="fixed inset-0 bg-grid pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10">
        {started ? (
          <QuizContainer />
        ) : (
          <WelcomeScreen onStart={handleStart} />
        )}
      </div>
    </div>
  );
}
