import { motion } from 'framer-motion';
import { useWeddingMusic } from '../hooks/useWeddingMusic';

export default function WorldHud() {
  const { isPlaying, toggle } = useWeddingMusic();

  return (
    <div className="fixed top-5 right-5 md:top-7 md:right-7 z-50">
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="w-10 h-10 rounded-full border border-gold/35 bg-wine-deep/40 backdrop-blur-md flex items-center justify-center hover:border-gold/70 transition-colors"
      >
        <span className="relative flex items-end gap-[3px] h-3.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[2px] bg-champagne rounded-full"
              animate={isPlaying ? { height: ['6px', '14px', '8px'] } : { height: '5px' }}
              transition={{ duration: 0.55 + i * 0.12, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </span>
      </button>
    </div>
  );
}
