import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { JOURNEY, wedding } from './media';
import { useChapterInView } from './useChapterInView';

interface Props {
  setChapter: (id: number) => void;
}

export default function ChapterCelebration({ setChapter }: Props) {
  const ref = useRef<HTMLElement>(null);
  useChapterInView(ref, 3, setChapter);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.2'] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });

  return (
    <section ref={ref} className="relative min-h-screen paper-wash overflow-hidden px-5 py-28 md:py-36">
      <div className="max-w-xl mx-auto">
        <p className="font-accent text-[10px] tracking-[0.5em] text-gold text-center mb-16">CHAPTER IV — THE CELEBRATION</p>

        <div className="relative pl-8 md:pl-0">
          <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-px bg-gold/20 md:-translate-x-1/2" />
          <motion.div
            className="absolute left-[10px] md:left-1/2 top-0 w-[2px] origin-top bg-gradient-to-b from-champagne via-gold to-rose md:-translate-x-1/2"
            style={{ height: '100%', scaleY: line }}
          />

          <div className="space-y-20 md:space-y-28">
            {JOURNEY.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative md:grid md:grid-cols-2 md:gap-16 items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className={`${i % 2 ? 'md:col-start-2' : 'md:text-right'} pl-8 md:pl-0`}>
                  <p className="font-accent text-[9px] tracking-[0.38em] text-gold mb-2">0{i + 1}</p>
                  <h3 className="font-display text-3xl md:text-5xl text-text mb-3">{step.title}</h3>
                  <p className="font-serif-elegant italic text-lg text-text-muted">{step.line}</p>
                </div>
                <span className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-2 w-6 h-6 rounded-full border border-gold bg-ivory shadow-[0_0_18px_rgba(196,165,116,0.45)]" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-24 text-center glass-editorial rounded-3xl px-8 py-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-accent text-[9px] tracking-[0.34em] text-gold mb-3">THE WARDROBE</p>
          <h3 className="font-display text-3xl text-text mb-3">{wedding.dressCode.title}</h3>
          <p className="font-serif-elegant italic text-text-muted max-w-md mx-auto">{wedding.dressCode.description}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {wedding.dressCode.suggestions.map((item) => (
              <span key={item} className="px-4 py-2 border border-gold/25 font-accent text-[8px] tracking-[0.22em] uppercase text-text">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
