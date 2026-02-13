import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizContainer from './components/QuizContainer';
import AudioToggle from './components/AudioToggle';
import LoadingScreen from './components/LoadingScreen';
import { startBGM } from './utils/audioManager';

/**
 * App -- Root component.
 * Loading -> Welcome screen -> Quiz -> Confirmation (handled inside QuizContainer).
 */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    startBGM(); // Begin ambient music on first interaction
    setStarted(true);
  };

  return (
    <div className="relative min-h-screen bg-dna-bg overflow-hidden">
      {/* ── Loading screen ── */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* ── BGM toggle ── */}
      {started && !loading && <AudioToggle />}

      {/* ── Ambient orbs ── */}
      <div className="ambient-orb ambient-orb-cyan w-[500px] h-[500px] -top-32 -left-32" />
      <div className="ambient-orb ambient-orb-amber w-[350px] h-[350px] bottom-20 right-[-80px]" />

      {/* ── Grid overlay ── */}
      <div className="fixed inset-0 bg-grid pointer-events-none" />

      {/* ── Content ── */}
      {!loading && (
        <div className="relative z-10">
          {started ? (
            <QuizContainer />
          ) : (
            <WelcomeScreen onStart={handleStart} />
          )}
        </div>
      )}
    </div>
  );
}
