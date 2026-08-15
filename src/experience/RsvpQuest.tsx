import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import MagneticButton from './MagneticButton';
import { FloatingPetals } from './Atmosphere';

interface Props {
  onFinished: () => void;
}

export default function RsvpQuest({ onFinished }: Props) {
  const [choice, setChoice] = useState<'yes' | 'no' | null>(null);

  return (
    <section className="relative min-h-screen wine-wash overflow-hidden px-5 py-28 flex items-center justify-center">
      {choice === 'yes' && <FloatingPetals count={22} />}
      <div className="relative max-w-2xl w-full text-center">
        <AnimatePresence mode="wait">
          {!choice && (
            <motion.div key="ask" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <p className="font-accent text-[10px] tracking-[0.48em] text-champagne mb-6">THE FINAL QUEST</p>
              <h2 className="font-script text-5xl md:text-7xl text-ivory mb-14">Will you join us?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton onClick={() => setChoice('yes')}>Yes, I'll be there</MagneticButton>
                <MagneticButton onClick={() => setChoice('no')}>I'm sorry, I can't</MagneticButton>
              </div>
            </motion.div>
          )}

          {choice === 'yes' && (
            <motion.div key="yes" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}>
              <motion.div
                className="w-16 h-16 mx-auto mb-8 rounded-full border border-champagne flex items-center justify-center text-champagne text-2xl"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                ♥
              </motion.div>
              <h3 className="font-display text-3xl md:text-5xl text-ivory mb-4">Your seat is reserved.</h3>
              <p className="font-serif-elegant italic text-champagne/80 mb-10">We cannot wait to celebrate with you.</p>
              <MagneticButton onClick={onFinished}>Continue</MagneticButton>
            </motion.div>
          )}

          {choice === 'no' && (
            <motion.div key="no" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="font-display text-3xl md:text-4xl text-ivory mb-4">You will be missed.</h3>
              <p className="font-serif-elegant italic text-champagne/80 max-w-md mx-auto mb-10">
                Thank you for holding us in your thoughts. Your love still belongs to this evening.
              </p>
              <MagneticButton onClick={onFinished}>Continue</MagneticButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
