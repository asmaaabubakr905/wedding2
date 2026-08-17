import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';

interface Props {
  onComplete: () => void;
}

type Stage = 'dark' | 'missing' | 'ask' | 'piece' | 'assemble' | 'forever';

import { wedding } from '../config/wedding';

const PIECES = [
  { label: wedding.groom.toUpperCase(), delay: 0.15, className: 'font-script text-3xl sm:text-4xl md:text-5xl' },
  { label: wedding.bride.toUpperCase(), delay: 0.85, className: 'font-script text-3xl sm:text-4xl md:text-5xl' },
  { label: String(wedding.date.dayNumber).padStart(2, '0'), delay: 1.55, className: 'font-display text-xl sm:text-2xl md:text-3xl tracking-[0.1em] md:tracking-[0.18em]' },
  { label: '09', delay: 2.05, className: 'font-display text-xl sm:text-2xl md:text-3xl tracking-[0.1em] md:tracking-[0.18em]' },
  { label: String(wedding.date.year), delay: 2.5, className: 'font-display text-xl sm:text-2xl md:text-3xl tracking-[0.1em] md:tracking-[0.18em]' },
];

function PuzzleShape({ className = '', glow = false }: { className?: string; glow?: boolean }) {
  return (
    <svg viewBox="0 0 88 88" className={className} aria-hidden>
      <defs>
        <filter id="piece-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M18 18 h22 c0-11 16-11 16 0 h14 v22 c11 0 11 16 0 16 v14 h-22 c0 11-16 11-16 0 h-14 v-22 c-11 0-11-16 0-16 z"
        fill="#16080c"
        stroke="#d4c4a0"
        strokeWidth="1.4"
        filter={glow ? 'url(#piece-glow)' : undefined}
      />
    </svg>
  );
}

export default function MysteryScene({ onComplete }: Props) {
  const [stage, setStage] = useState<Stage>('dark');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('missing'), 900);
    const t2 = setTimeout(() => setStage('ask'), 2800);
    const t3 = setTimeout(() => setStage('piece'), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (stage !== 'assemble') return;
    const forever = setTimeout(() => setStage('forever'), 3400);
    return () => clearTimeout(forever);
  }, [stage]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#070406] text-ivory flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,165,116,0.08),transparent_55%)]" />

      <AnimatePresence>
        {stage === 'dark' && (
          <motion.div
            key="ember"
            className="w-1.5 h-1.5 rounded-full bg-champagne"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0.4, 1, 0.55], scale: [0.8, 1.2, 1], boxShadow: ['0 0 8px #d4c4a0', '0 0 36px #d4c4a0', '0 0 12px #d4c4a0'] }}
            exit={{ opacity: 0, scale: 2.4 }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(stage === 'missing' || stage === 'ask' || stage === 'piece') && (
          <motion.p
            key="missing"
            className="font-accent text-[11px] md:text-xs tracking-[0.52em] text-champagne/90 text-center"
            initial={{ opacity: 0, y: 10, letterSpacing: '0.7em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.52em' }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 1.1 }}
          >
            SOMETHING IS MISSING.
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(stage === 'ask' || stage === 'piece') && (
          <motion.p
            key="ask"
            className="font-serif-elegant italic text-ivory/70 text-lg md:text-xl mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            Can you find it?
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'piece' && (
          <motion.div
            key="find"
            className="mt-12 flex flex-col items-center gap-10 w-full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.86, y: -40 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-1, 2, -1] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-lg p-1.5 shadow-[0_0_30px_rgba(212,196,160,0.3)] bg-gradient-to-br from-[#d4c4a0]/40 via-[#d4c4a0]/10 to-[#d4c4a0]/40"
            >
              <div className="rounded-lg overflow-hidden border border-[#16080c] bg-[#16080c]">
                <img
                  src="/kids.jpeg"
                  alt="Childhood"
                  className="w-32 h-36 md:w-40 md:h-44 object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </motion.div>
            <MagneticButton onClick={() => setStage('assemble')}>Begin</MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>

      {(stage === 'assemble' || stage === 'forever') && (
        <div className="relative z-10 flex flex-col items-center w-full max-w-xl mx-auto">
          <motion.span
            className="mb-3 md:mb-5 text-champagne text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            ◆
          </motion.span>

          <motion.div
            className="border border-champagne/35 bg-[#12080c] px-6 sm:px-8 py-3 md:py-4 mb-2 md:mb-3 w-full max-w-[90%] md:max-w-none flex justify-center text-center"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: PIECES[0].delay, type: 'spring', stiffness: 90, damping: 14 }}
          >
            <span className={PIECES[0].className + ' text-champagne'}>{PIECES[0].label}</span>
          </motion.div>

          <div className="flex items-stretch justify-center gap-1.5 sm:gap-2 md:gap-3 mb-2 md:mb-3 w-full max-w-[95%] md:max-w-none">
            <motion.div
              className="border border-champagne/35 bg-[#12080c] px-3 sm:px-6 md:px-8 py-3 md:py-4 flex-1 flex justify-center text-center min-w-0"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PIECES[1].delay, type: 'spring', stiffness: 90, damping: 14 }}
            >
              <span className={PIECES[1].className + ' text-champagne'}>{PIECES[1].label}</span>
            </motion.div>
            <motion.div
              className="border border-champagne/35 bg-[#12080c] flex items-center justify-center px-2 sm:px-4 md:px-5 shrink-0 min-w-0"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PIECES[2].delay, type: 'spring', stiffness: 90, damping: 14 }}
            >
              <span className={PIECES[2].className + ' text-champagne'}>{PIECES[2].label}</span>
            </motion.div>
            <motion.div
              className="border border-champagne/35 bg-[#12080c] flex items-center justify-center px-2 sm:px-4 md:px-5 shrink-0 min-w-0"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PIECES[3].delay, type: 'spring', stiffness: 90, damping: 14 }}
            >
              <span className={PIECES[3].className + ' text-champagne'}>{PIECES[3].label}</span>
            </motion.div>
          </div>

          <motion.div
            className="border border-champagne/35 bg-[#12080c] px-6 sm:px-8 py-3 md:py-4 w-auto max-w-[90%] flex justify-center text-center"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: PIECES[4].delay, type: 'spring', stiffness: 90, damping: 14 }}
          >
            <span className={PIECES[4].className + ' text-champagne'}>{PIECES[4].label}</span>
          </motion.div>

          <motion.div
            className="gold-hairline w-40 md:w-64 my-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.8, duration: 0.9 }}
          />

          <AnimatePresence>
            {stage === 'forever' && (
              <motion.div
                className="flex flex-col items-center w-full px-2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <h1 className="font-script text-[clamp(2.5rem,10vw,4.5rem)] md:text-7xl text-champagne text-center mb-6 md:mb-10 w-full">
                  Together, Forever
                </h1>
                <p className="font-serif-elegant italic text-ivory/55 mb-6 text-xs sm:text-sm text-center">
                  The pieces have found each other.
                </p>
                <MagneticButton onClick={onComplete}>Continue</MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
