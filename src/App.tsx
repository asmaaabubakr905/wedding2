import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MysteryScene from './experience/MysteryScene';
import DoorScene from './components/DoorScene';
import LoveWorld from './experience/LoveWorld';
import { pauseWeddingMusic } from './hooks/useWeddingMusic';

export type ExperiencePhase = 'mystery' | 'door' | 'world';

export default function App() {
  const [phase, setPhase] = useState<ExperiencePhase>('mystery');
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const lock = phase !== 'world';
    // Lock only vertical scrolling so we don't remove global `overflow-x: hidden` from CSS.
    // Removing the entire `overflow` style was allowing horizontal scrolling on some pages.
    document.body.style.overflowY = lock ? 'hidden' : '';
    if (lock) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflowY = '';
    };
  }, [phase]);

  const replay = () => {
    pauseWeddingMusic();
    window.scrollTo(0, 0);
    setPhase('mystery');
    setRunId((id) => id + 1);
  };

  return (
    <div className="relative w-full min-h-screen bg-wine-deep">
      <div className="film-grain" />

      <AnimatePresence mode="wait">
        {phase === 'mystery' && (
          <motion.div
            key={`mystery-${runId}`}
            className="fixed inset-0 z-40"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(12px)' }}
            transition={{ duration: 1.1 }}
          >
            <MysteryScene onComplete={() => setPhase('door')} />
          </motion.div>
        )}

        {phase === 'door' && (
          <motion.div
            key={`door-${runId}`}
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8 }}
          >
            <DoorScene onComplete={() => setPhase('world')} />
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'world' && <LoveWorld key={`world-${runId}`} onReplay={replay} />}
    </div>
  );
}
