import { motion } from 'framer-motion';
import { wedding } from '../config/wedding';
import FloatingPetals from './ui/FloatingPetals';

export default function HeroSection() {
  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden section-ivory">
      {/* Same ambient layer as envelope intro */}
      <div className="absolute inset-0 ambient-glow pointer-events-none" />
      <FloatingPetals count={10} />

      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-champagne/40"
            style={{
              width: 220 + i * 140,
              height: 220 + i * 140,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto flex flex-col items-center py-20">
        <motion.p
          className="font-accent text-[10px] md:text-xs tracking-[0.48em] text-text-muted uppercase mb-4"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          You are cordially invited to the wedding of
        </motion.p>

        <motion.h1
          className="font-script text-[72px] sm:text-[88px] md:text-[108px] leading-[0.9] text-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          {wedding.groom}
        </motion.h1>

        <motion.div
          className="flex items-center gap-5 my-3 md:my-4"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          viewport={{ once: true }}
        >
          <div className="w-14 md:w-20 h-px bg-gradient-to-r from-transparent to-champagne-light/70" />
          <span className="font-script text-3xl md:text-4xl gold-text">&</span>
          <div className="w-14 md:w-20 h-px bg-gradient-to-l from-transparent to-champagne-light/70" />
        </motion.div>

        <motion.h1
          className="font-script text-[72px] sm:text-[88px] md:text-[108px] leading-[0.9] text-text mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          viewport={{ once: true }}
        >
          {wedding.bride}
        </motion.h1>

        <motion.div
          className="relative mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.9 }}
          viewport={{ once: true }}
        >
          <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="relative">
            <div
              className="absolute -inset-3 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(232,213,163,0.35), rgba(240,216,220,0.25))', filter: 'blur(14px)' }}
            />
            <img
              src={wedding.heroImage}
              alt={`${wedding.coupleDisplay} Wedding`}
              className="relative w-[220px] md:w-[270px] rounded-2xl object-cover gold-border-frame"
              style={{ border: '2px solid rgba(201,168,76,0.35)', boxShadow: '0 22px 48px rgba(61,52,40,0.12)' }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full flex flex-col items-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.82 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex flex-col items-center justify-center gap-2 w-full text-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <p className="font-sans-elegant text-[10px] tracking-[0.28em] text-text-muted uppercase">Scroll</p>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 5v14M5 12l7 7 7-7" stroke="#c9a84c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
