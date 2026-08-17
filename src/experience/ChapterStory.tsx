import { motion } from 'framer-motion';
import { useRef } from 'react';
import { STORY_FRAMES, wedding } from './media';
import { useChapterInView } from './useChapterInView';
import { FloatingPetals } from './Atmosphere';

interface Props {
  setChapter: (id: number) => void;
  envelopeOpen: boolean;
}

export default function ChapterStory({ setChapter, envelopeOpen }: Props) {
  const ref = useRef<HTMLElement>(null);
  useChapterInView(ref, 0, setChapter);

  return (
    <section ref={ref} className="relative min-h-screen paper-wash overflow-hidden px-5 py-28 md:py-36">
      <FloatingPetals count={8} />
      <div className="max-w-6xl mx-auto relative">
        <motion.p
          className="font-accent text-[10px] tracking-[0.5em] text-gold text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          CHAPTER I
        </motion.p>
        <motion.h1
          className="font-script text-6xl md:text-8xl text-center text-text leading-none mb-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {wedding.groom} & {wedding.bride}
        </motion.h1>
        <div className="gold-hairline w-24 mx-auto mb-16" />

        <div className="relative overflow-x-auto pb-6 snap-x snap-mandatory md:overflow-visible">
          <div className="flex md:grid md:grid-cols-4 gap-5 min-w-max md:min-w-0 w-full">
            {STORY_FRAMES.map((frame, i) => (
              <motion.figure
                key={frame.src}
                className="relative w-[min(72vw,320px)] sm:w-64 md:w-auto shrink-0 snap-center"
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: i * 0.12 }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="bg-[#1a0c10] p-2 shadow-2xl">
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 8 }).map((_, n) => (
                      <span key={n} className="w-2 h-2 rounded-[1px] bg-ivory/20" />
                    ))}
                  </div>
                  <img src={encodeURI(frame.src)} alt={frame.caption} className="w-full aspect-[3/4] object-cover grayscale-[20%]" />
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: 8 }).map((_, n) => (
                      <span key={n} className="w-2 h-2 rounded-[1px] bg-ivory/20" />
                    ))}
                  </div>
                </div>
                <figcaption className="font-serif-elegant italic text-sm text-text-muted mt-3 text-center">{frame.caption}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 md:mt-24 text-center space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-2xl md:text-4xl text-text">Two people.</p>
          <p className="font-display text-2xl md:text-4xl text-text">One story.</p>
          <p className="font-script text-4xl md:text-5xl text-rose">One forever.</p>
        </motion.div>

        {envelopeOpen && (
          <motion.aside
            className="mt-10 max-w-md mx-auto glass-editorial rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-accent text-[9px] tracking-[0.32em] text-gold uppercase mb-3">A private note</p>
            <p className="font-serif-elegant italic text-text whitespace-pre-line leading-relaxed">{wedding.envelope.cardBody}</p>
          </motion.aside>
        )}
      </div>
    </section>
  );
}
