import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getWeddingCountdown } from '../../config/wedding';

interface CountdownDisplayProps {
  compact?: boolean;
}

function CountUnit({ value, label, compact }: { value: number; label: string; compact?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div
        className={`relative flex items-center justify-center rounded-xl glass-card mx-auto ${
          compact ? 'w-[4.75rem] h-[4.75rem] sm:w-20 sm:h-20' : 'w-[5.25rem] h-[5.25rem] md:w-28 md:h-28'
        }`}
      >
        <motion.span
          key={value}
          className={`font-display font-semibold text-text ${compact ? 'text-2xl sm:text-3xl' : 'text-3xl md:text-4xl'}`}
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-champagne/35 rounded-tl-sm" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-champagne/35 rounded-tr-sm" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-champagne/35 rounded-bl-sm" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-champagne/35 rounded-br-sm" />
      </div>
      <p className="font-sans-elegant text-[9px] md:text-xs tracking-[0.28em] uppercase text-text-muted text-center">
        {label}
      </p>
    </div>
  );
}

function Dot() {
  return <span className="hidden md:block font-script text-3xl text-champagne/45 mb-5 shrink-0">·</span>;
}

export default function CountdownDisplay({ compact = false }: CountdownDisplayProps) {
  const [time, setTime] = useState(getWeddingCountdown());

  useEffect(() => {
    const interval = setInterval(() => setTime(getWeddingCountdown()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`mx-auto w-full max-w-[13.5rem] sm:max-w-none grid grid-cols-2 justify-items-center ${
        compact ? 'gap-x-6 gap-y-5' : 'gap-x-8 gap-y-6'
      } md:flex md:max-w-none md:items-center md:justify-center ${compact ? 'md:gap-5' : 'md:gap-8'}`}
    >
      <CountUnit value={time.days} label="Days" compact={compact} />
      <Dot />
      <CountUnit value={time.hours} label="Hours" compact={compact} />
      <Dot />
      <CountUnit value={time.minutes} label="Minutes" compact={compact} />
      <Dot />
      <CountUnit value={time.seconds} label="Seconds" compact={compact} />
    </div>
  );
}
