import { motion } from 'framer-motion';
import { wedding } from './media';
import MagneticButton from './MagneticButton';

export default function FindThePlace() {
  return (
    <section className="relative min-h-screen wine-wash overflow-hidden px-5 py-28 md:py-36 flex items-center">
      <div className="relative w-full max-w-4xl mx-auto">
        <p className="font-accent text-[10px] tracking-[0.5em] text-champagne text-center mb-4">FIND THE PLACE</p>
        <h2 className="font-script text-5xl md:text-7xl text-ivory text-center mb-14">{wedding.venue.name}</h2>

        <div className="relative h-[420px] md:h-[520px] border border-gold/20 bg-[#12080b]">
          <svg viewBox="0 0 800 520" className="absolute inset-0 w-full h-full" aria-hidden>
            <defs>
              <linearGradient id="route" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#c4a574" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#d4c4a0" />
              </linearGradient>
            </defs>
            <path d="M90 430 C 180 390, 210 300, 280 270 S 430 250, 500 200 S 620 140, 690 110" fill="none" stroke="rgba(196,165,116,0.18)" strokeWidth="1.5" />
            <motion.path
              d="M90 430 C 180 390, 210 300, 280 270 S 430 250, 500 200 S 620 140, 690 110"
              fill="none"
              stroke="url(#route)"
              strokeWidth="2.2"
              strokeDasharray="900"
              initial={{ strokeDashoffset: 900 }}
              whileInView={{ strokeDashoffset: 0 }}
              transition={{ duration: 2.8, ease: 'easeInOut' }}
              viewport={{ once: true }}
            />
            <circle cx="90" cy="430" r="5" fill="#d4c4a0" />
            <circle cx="690" cy="110" r="7" fill="#f6f0e8" />
            <motion.circle
              cx="690"
              cy="110"
              r="16"
              fill="none"
              stroke="#d4c4a0"
              initial={{ opacity: 0.2, scale: 0.6 }}
              animate={{ opacity: [0.15, 0.5, 0.15], scale: [0.8, 1.25, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              style={{ transformOrigin: '690px 110px' }}
            />
          </svg>

          <p className="absolute bottom-8 left-8 font-accent text-[9px] tracking-[0.3em] text-champagne">{wedding.eventType.toUpperCase()}</p>
          <motion.div
            className="absolute top-10 right-6 md:right-16 text-right"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            viewport={{ once: true }}
          >
            <p className="font-display text-2xl md:text-3xl text-ivory">{wedding.venue.name}</p>
            {wedding.venue.city ? (
              <p className="font-serif-elegant italic text-champagne/80 mt-1">{wedding.venue.city}</p>
            ) : null}
          </motion.div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-3xl text-ivory">{wedding.date.short.replace(/ · /g, ' ')}</p>
            <p className="font-serif-elegant italic text-champagne">{wedding.time}</p>
          </div>
          <MagneticButton type="button" onClick={() => window.open(wedding.venue.mapsUrl, '_blank', 'noopener')}>
            Open map
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
