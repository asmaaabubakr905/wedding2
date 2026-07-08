import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Envelope from './components/Envelope';
import MainSite from './components/MainSite';

export default function App() {
  const [scrollLocked, setScrollLocked] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (scrollLocked) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [scrollLocked]);

  return (
    <div className="relative w-full">
      <MainSite visible={true} />

      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Envelope
              onCardRevealed={() => {
                setTimeout(() => {
                  setScrollLocked(false);
                  setTimeout(() => {
                    const heroEl = document.getElementById('hero-section');
                    if (heroEl) {
                      heroEl.scrollIntoView({ behavior: 'smooth' });
                    }
                    setTimeout(() => setShowIntro(false), 800);
                  }, 150);
                }, 3200);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
