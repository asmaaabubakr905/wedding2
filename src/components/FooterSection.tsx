import { motion } from 'framer-motion';
import { wedding } from '../config/wedding';

export default function FooterSection() {
  return (
    <footer className="relative py-28 md:py-36 px-6 section-blush overflow-hidden text-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <span className="font-script text-champagne-light whitespace-nowrap" style={{ fontSize: '15rem' }}>Forever</span>
      </div>
      <div className="relative max-w-2xl mx-auto">
        <motion.div className="flex justify-center mb-6" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: 'spring' }} viewport={{ once: true }}>
          <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <svg width="52" height="48" viewBox="0 0 56 52">
              <defs>
                <linearGradient id="footerHeart" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#efb8c8" /><stop offset="100%" stopColor="#d4788c" />
                </linearGradient>
              </defs>
              <path d="M28 48 C28 48 4 34 4 16 C4 8 10 2 18 2 C23 2 26 5 28 10 C30 5 33 2 38 2 C46 2 52 8 52 16 C52 34 28 48 28 48Z" fill="url(#footerHeart)" />
            </svg>
          </motion.div>
        </motion.div>
        <motion.p className="font-accent text-[10px] tracking-[0.38em] text-champagne uppercase mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>With Eternal Gratitude</motion.p>
        <motion.h2 className="font-script text-5xl md:text-7xl text-text mb-6" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} viewport={{ once: true }}>Thank You</motion.h2>
        <motion.p className="font-serif-elegant text-lg md:text-xl text-text-muted italic leading-relaxed mb-8 max-w-lg mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.15 }} viewport={{ once: true }}>{wedding.footer.message}</motion.p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
          <p className="font-script text-3xl md:text-4xl gold-text mb-2">{wedding.coupleDisplay}</p>
          <p className="font-sans-elegant text-[10px] tracking-[0.32em] text-text-muted uppercase">{wedding.date.short} · {wedding.time}</p>
        </motion.div>
        <motion.p className="mt-10 text-[10px] tracking-[0.28em] uppercase text-text-muted/60" initial={{ opacity: 0 }} whileInView={{ opacity: 0.75 }} transition={{ delay: 0.5 }} viewport={{ once: true }}>
          Handcrafted with love by <span className="text-champagne">{wedding.footer.credit}</span>
        </motion.p>
      </div>
    </footer>
  );
}
