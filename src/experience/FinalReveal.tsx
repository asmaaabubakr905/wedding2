import { motion } from 'framer-motion';
import { wedding } from './media';
import MagneticButton from './MagneticButton';

interface Props {
  onReplay: () => void;
}

export default function FinalReveal({ onReplay }: Props) {
  return (
    <motion.section
      className="fixed inset-0 z-[80] bg-[#14080c] overflow-hidden flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(168,107,115,0.18),transparent_55%)]" />
      <div className="relative text-center max-w-lg">
        <motion.div
          className="text-champagne text-4xl mb-10"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: [1, 1.08, 1], opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.4 }}
        >
          ♥
        </motion.div>
        <motion.h1
          className="font-script text-6xl md:text-8xl text-ivory leading-none"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.1 }}
        >
          {wedding.coupleDisplay}
        </motion.h1>
        <motion.p
          className="font-accent tracking-[0.42em] text-champagne mt-5 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {wedding.date.short}
        </motion.p>
        <motion.blockquote
          className="font-serif-elegant italic text-xl md:text-2xl text-ivory/80 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          And this is where our forever begins.
        </motion.blockquote>
        <motion.div
          className="mt-8 text-champagne/80 font-serif-elegant"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p>{wedding.venue.name}</p>
          {wedding.venue.city ? <p>{wedding.venue.city}</p> : null}
        </motion.div>
        <motion.div className="mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
          <MagneticButton onClick={onReplay}>Replay our story</MagneticButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
