import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function getTimeLeft() {
  const target = new Date('2026-05-29T19:00:00');
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div
        className="relative w-20 h-20 md:w-28 md:h-28 rounded-lg flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
          border: '1px solid rgba(201,168,76,0.35)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px rgba(255,255,255,0.1)',
        }}
      >
        <motion.span
          key={value}
          className="font-serif-elegant text-3xl md:text-4xl font-semibold text-amber-200"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>

        {/* Corner accents */}
        <div className="absolute top-1 left-1 w-3 h-3" style={{ borderTop: '1px solid rgba(201,168,76,0.5)', borderLeft: '1px solid rgba(201,168,76,0.5)' }} />
        <div className="absolute top-1 right-1 w-3 h-3" style={{ borderTop: '1px solid rgba(201,168,76,0.5)', borderRight: '1px solid rgba(201,168,76,0.5)' }} />
        <div className="absolute bottom-1 left-1 w-3 h-3" style={{ borderBottom: '1px solid rgba(201,168,76,0.5)', borderLeft: '1px solid rgba(201,168,76,0.5)' }} />
        <div className="absolute bottom-1 right-1 w-3 h-3" style={{ borderBottom: '1px solid rgba(201,168,76,0.5)', borderRight: '1px solid rgba(201,168,76,0.5)' }} />
      </div>
      <p className="font-sans-elegant text-xs tracking-[0.3em] text-amber-500/70 uppercase">{label}</p>
    </motion.div>
  );
}

export default function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1a0e04 0%, #2d1a08 50%, #1a0e04 100%)',
      }}
    >
      {/* Animated ring decorations */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-amber-600/10"
          style={{
            width: 300 + i * 200,
            height: 300 + i * 200,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
          transition={{ duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-sans-elegant text-xs tracking-[0.4em] text-amber-500/60 uppercase mb-3">
            Counting Down
          </p>
          <h2 className="font-script text-6xl md:text-7xl text-amber-200 mb-4">
            Until Forever
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-amber-600/50" />
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6Z" fill="#c9a84c" opacity="0.7" />
            </svg>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-amber-600/50" />
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          <CountUnit value={time.days} label="Days" />
          <span className="font-script text-4xl text-amber-500/60 mb-6">·</span>
          <CountUnit value={time.hours} label="Hours" />
          <span className="font-script text-4xl text-amber-500/60 mb-6">·</span>
          <CountUnit value={time.minutes} label="Minutes" />
          <span className="font-script text-4xl text-amber-500/60 mb-6">·</span>
          <CountUnit value={time.seconds} label="Seconds" />
        </div>

        <motion.p
          className="font-serif-elegant italic text-stone-400 mt-10 text-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          "Every second brings us closer to our forever"
        </motion.p>
      </div>
    </section>
  );
}
