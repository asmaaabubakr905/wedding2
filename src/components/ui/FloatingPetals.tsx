import { motion } from 'framer-motion';

interface FloatingPetalsProps {
  count?: number;
}

const COLORS = ['#f4b8c8', '#efb8c8', '#fdf2f5', '#e891a8'];

export default function FloatingPetals({ count = 10 }: FloatingPetalsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${(i * 97) % 100}%`, top: '-4%' }}
          animate={{
            y: ['0vh', '108vh'],
            x: [0, Math.sin(i * 1.2) * 70],
            rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
            opacity: [0, 0.55, 0.4, 0],
          }}
          transition={{ duration: 11 + (i % 4), repeat: Infinity, delay: i * 1.2, ease: 'linear' }}
        >
          <svg width="14" height="18" viewBox="0 0 14 18">
            <path d="M7 0 Q12 5 11 12 Q7 18 3 12 Q2 5 7 0Z" fill={COLORS[i % COLORS.length]} opacity="0.6" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
