import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { useWeddingMusic } from '../hooks/useWeddingMusic';

export default function MusicControl() {
  const { isPlaying, toggle } = useWeddingMusic();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isPlaying) setVisible(true);
  }, [isPlaying]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={toggle}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center glass-card hover:shadow-luxury transition-shadow"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          aria-label={isPlaying ? 'Mute music' : 'Play music'}
        >
          {isPlaying ? (
            <Volume2 size={18} className="text-champagne" />
          ) : (
            <VolumeX size={18} className="text-text-muted/50" />
          )}
          {!isPlaying && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blush/80 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Music size={8} className="text-white" />
            </motion.div>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
