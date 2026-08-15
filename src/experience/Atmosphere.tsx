import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function FloatingPetals({ count = 14 }: { count?: number }) {
  const colors = ['#c9a8a8', '#d4c4a0', '#f6f0e8', '#a86b73'];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${(i * 73) % 100}%`, top: '-6%' }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(i) * 80],
            rotate: [0, 280 * (i % 2 ? 1 : -1)],
            opacity: [0, 0.45, 0.3, 0],
          }}
          transition={{ duration: 14 + (i % 5), repeat: Infinity, delay: i * 0.9, ease: 'linear' }}
        >
          <svg width="12" height="16" viewBox="0 0 12 16">
            <path d="M6 0 Q10 5 9 11 Q6 16 3 11 Q2 5 6 0Z" fill={colors[i % colors.length]} opacity="0.7" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function CursorSparkles() {
  const [points, setPoints] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let id = 0;
    const onMove = (e: MouseEvent) => {
      id += 1;
      const next = { x: e.clientX, y: e.clientY, id };
      setPoints((prev) => [...prev.slice(-10), next]);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {points.map((p) => (
        <motion.span
          key={p.id}
          className="absolute w-1 h-1 rounded-full bg-champagne/70"
          style={{ left: p.x, top: p.y }}
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 0, y: -12 }}
          transition={{ duration: 0.7 }}
        />
      ))}
    </div>
  );
}

export function SecretHeart({ notes }: { notes: { author: string; text: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [spot] = useState(() => ({ top: 38 + Math.random() * 20, left: 8 + Math.random() * 10 }));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => (v === null ? 0 : (v + 1) % notes.length))}
        className="hidden md:block fixed z-40 text-rose/80 hover:text-champagne transition-colors"
        style={{ top: `${spot.top}%`, left: `${spot.left}%` }}
        aria-label="A hidden note"
      >
        <motion.span animate={{ y: [0, -6, 0], scale: [1, 1.08, 1] }} transition={{ duration: 3.2, repeat: Infinity }} className="text-xl">
          ♥
        </motion.span>
      </button>
      {open !== null && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-sm glass-editorial rounded-2xl px-6 py-5 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-serif-elegant italic text-sm text-text leading-relaxed">{notes[open].text}</p>
          <p className="font-accent text-[8px] tracking-[0.28em] text-gold mt-3 uppercase">{notes[open].author}</p>
          <button type="button" className="mt-3 font-accent text-[8px] tracking-[0.3em] text-muted uppercase" onClick={() => setOpen(null)}>
            Close
          </button>
        </motion.div>
      )}
    </>
  );
}
