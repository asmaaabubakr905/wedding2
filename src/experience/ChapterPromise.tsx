import { motion } from 'framer-motion';
import { useRef } from 'react';
import { wedding } from './media';
import { useChapterInView } from './useChapterInView';
import { FloatingPetals } from './Atmosphere';

interface Props {
  setChapter: (id: number) => void;
}

export default function ChapterPromise({ setChapter }: Props) {
  const ref = useRef<HTMLElement>(null);
  useChapterInView(ref, 1, setChapter);

  return (
    <section ref={ref} className="relative min-h-screen wine-wash overflow-hidden px-5 py-28 md:py-36 flex items-center">
      <FloatingPetals count={10} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(196,165,116,0.16),transparent_52%)]" />
      <div className="relative max-w-3xl mx-auto w-full text-center">
        <motion.p
          className="font-accent text-[10px] tracking-[0.5em] text-champagne mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          CHAPTER II — THE PROMISE
        </motion.p>

        <motion.p
          className="font-script text-4xl md:text-5xl text-champagne mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {wedding.quote.eyebrow}
        </motion.p>

        <div className="space-y-3 md:space-y-4">
          {wedding.quote.lines.map((line, i) => (
            <motion.p
              key={line}
              className="font-serif-elegant italic text-2xl md:text-4xl text-ivory leading-snug"
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.25 + i * 0.35, duration: 0.9 }}
              viewport={{ once: true }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="gold-hairline w-28 mx-auto mt-12 mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          viewport={{ once: true }}
        />

        <motion.p
          className="font-accent text-[9px] tracking-[0.32em] text-gold uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          viewport={{ once: true }}
        >
          {wedding.groom} & {wedding.bride} · {wedding.quote.source}
        </motion.p>
      </div>
    </section>
  );
}
