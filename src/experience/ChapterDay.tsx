import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { getWeddingCountdown, wedding } from '../config/wedding';
import { useChapterInView } from './useChapterInView';

interface Props {
  setChapter: (id: number) => void;
}

function Flap({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[4.6rem] h-[5.4rem] md:w-28 md:h-32 rounded-sm bg-[#1a0c10] border border-gold/30 overflow-hidden shadow-[inset_0_12px_24px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/50 z-10" />
        <motion.span
          key={value}
          className="absolute inset-0 flex items-center justify-center font-display text-3xl md:text-5xl text-ivory"
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.28 }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <p className="font-accent text-[8px] md:text-[9px] tracking-[0.32em] text-champagne">{label}</p>
    </div>
  );
}

export default function ChapterDay({ setChapter }: Props) {
  const ref = useRef<HTMLElement>(null);
  useChapterInView(ref, 2, setChapter);
  const [time, setTime] = useState(getWeddingCountdown());
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getWeddingCountdown());
      setTick((v) => !v);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen wine-wash overflow-hidden px-5 py-28 md:py-36 flex items-center">
      <div className="relative w-full max-w-4xl mx-auto text-center">
        <p className="font-accent text-[10px] tracking-[0.5em] text-champagne mb-12">CHAPTER III — THE DAY</p>

        <motion.div
          className="flex flex-col items-center gap-1 mb-6 cursor-default"
          whileHover={{ scale: 1.02 }}
        >
          <motion.p
            className="font-display text-[7.5rem] md:text-[11rem] leading-none text-ivory"
            animate={{ textShadow: tick ? '0 0 28px rgba(212,196,160,0.35)' : '0 0 8px rgba(212,196,160,0.1)' }}
          >
            {wedding.date.dayNumber}
          </motion.p>
          <p className="font-accent tracking-[0.55em] text-gold text-sm md:text-base">{wedding.date.month.toUpperCase()}</p>
          <p className="font-display text-4xl md:text-5xl text-champagne mt-2">{wedding.date.year}</p>
          <p className="font-serif-elegant italic text-ivory/70 mt-4 text-xl">{wedding.eventType} · {wedding.time}</p>
        </motion.div>

        <div className="gold-hairline w-28 mx-auto my-10" />

        <div className="flex justify-center gap-3 md:gap-6">
          <Flap value={time.days} label="DAYS" />
          <Flap value={time.hours} label="HOURS" />
          <Flap value={time.minutes} label="MINUTES" />
          <Flap value={time.seconds} label="SECONDS" />
        </div>
      </div>
    </section>
  );
}
