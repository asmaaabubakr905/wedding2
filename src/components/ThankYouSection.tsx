import { motion } from 'framer-motion';

export default function ThankYouSection() {
  return (
    <section
      className="relative py-32 px-6 text-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1a0e12 0%, #3a1824 50%, #1a0e12 100%)',
      }}
    >
      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8">
              <path d="M4 0L4.5 3.5H8L5 5.5L6 8L4 6.5L2 8L3 5.5L0 3.5H3.5Z" fill="#efb8c8" opacity="0.7" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Large background script text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ opacity: 0.03 }}
      >
        <span className="font-script text-rose-200" style={{ fontSize: '20rem', whiteSpace: 'nowrap' }}>
          Forever
        </span>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Heart */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8, bounce: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="70" height="65" viewBox="0 0 70 65">
              <defs>
                <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#efb8c8" />
                  <stop offset="100%" stopColor="#d4788c" />
                </linearGradient>
              </defs>
              <path
                d="M35 60 C35 60 5 42 5 22 C5 12 13 4 22 4 C28 4 32 7 35 12 C38 7 42 4 48 4 C57 4 65 12 65 22 C65 42 35 60 35 60Z"
                fill="url(#heartGrad)"
                opacity="0.9"
              />
            </svg>
          </motion.div>
        </motion.div>

        <motion.p
          className="font-sans-elegant text-xs tracking-[0.4em] text-rose-300/60 uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          With Eternal Gratitude
        </motion.p>

        <motion.h2
          className="font-script text-6xl md:text-8xl text-rose-100 mb-6 leading-none"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Thank You
        </motion.h2>

        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-rose-400/50" />
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6Z" fill="#d4788c" opacity="0.7" />
          </svg>
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-rose-400/50" />
        </motion.div>

        <motion.p
          className="font-serif-elegant text-xl md:text-2xl text-stone-300 leading-relaxed mb-8 italic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Your presence and blessings are the greatest gift we could ever receive. Thank you for sharing this magical moment with us.
        </motion.p>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="font-script text-4xl text-rose-200">Mostafa & Arwa</p>
          <p className="font-sans-elegant text-xs tracking-[0.4em] text-rose-300/50 uppercase">
            29 · 05 · 2026
          </p>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          className="mt-16 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <svg width="200" height="30" viewBox="0 0 200 30">
            <line x1="0" y1="15" x2="80" y2="15" stroke="rgba(212,120,140,0.3)" strokeWidth="1" />
            <path d="M90 15 L95 5 L100 15 L105 5 L110 15" stroke="#d4788c" strokeWidth="1" fill="none" opacity="0.6" />
            <line x1="120" y1="15" x2="200" y2="15" stroke="rgba(212,120,140,0.3)" strokeWidth="1" />
            <circle cx="100" cy="15" r="3" fill="#d4788c" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Small Elegant Creator Credit */}
        <motion.div
          className="mt-8 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-stone-500/50 hover:text-rose-300/60 transition-colors duration-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          transition={{ delay: 1.0, duration: 1 }}
          viewport={{ once: true }}
        >
          <span className="font-sans-elegant select-none">Handcrafted with Love by</span>{" "}
          <span className="font-sans-elegant text-rose-300/60 font-semibold select-all">Asmaa</span>
        </motion.div>
      </div>
    </section>
  );
}
