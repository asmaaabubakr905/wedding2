import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #fdf8f0 0%, #f5ede0 40%, #ede0cc 70%, #e8d5b7 100%)',
      }}
    >
      {/* Decorative corner flourishes */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-64 h-64 opacity-20" viewBox="0 0 200 200">
          <path d="M10 10 Q100 10 10 100" stroke="#c9a84c" strokeWidth="1" fill="none" />
          <path d="M10 10 Q60 10 60 60" stroke="#c9a84c" strokeWidth="0.5" fill="none" />
          <circle cx="10" cy="10" r="4" fill="#c9a84c" />
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx={10 + i * 8} cy={10 + i * 8} r="1.5" fill="#c9a84c" opacity={0.5} />
          ))}
        </svg>
        <svg className="absolute top-0 right-0 w-64 h-64 opacity-20" viewBox="0 0 200 200" style={{ transform: 'scaleX(-1)' }}>
          <path d="M10 10 Q100 10 10 100" stroke="#c9a84c" strokeWidth="1" fill="none" />
          <path d="M10 10 Q60 10 60 60" stroke="#c9a84c" strokeWidth="0.5" fill="none" />
          <circle cx="10" cy="10" r="4" fill="#c9a84c" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-64 h-64 opacity-20" viewBox="0 0 200 200" style={{ transform: 'scaleY(-1)' }}>
          <path d="M10 10 Q100 10 10 100" stroke="#c9a84c" strokeWidth="1" fill="none" />
          <circle cx="10" cy="10" r="4" fill="#c9a84c" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-64 h-64 opacity-20" viewBox="0 0 200 200" style={{ transform: 'scale(-1,-1)' }}>
          <path d="M10 10 Q100 10 10 100" stroke="#c9a84c" strokeWidth="1" fill="none" />
          <circle cx="10" cy="10" r="4" fill="#c9a84c" />
        </svg>
      </div>

      {/* Floating rose petals */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${5 + (i * 8.5)}%`,
            top: `-20px`,
            opacity: 0.4,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(i) * 60],
            rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: 8 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'linear',
          }}
        >
          <svg width="16" height="20" viewBox="0 0 16 20">
            <path d="M8 0 Q14 6 12 14 Q8 20 4 14 Q2 6 8 0Z" fill="#e8b4b8" opacity="0.7" />
          </svg>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto flex flex-col items-center justify-center">
        
        {/* Staggered text layers with spring physics */}
        <div className="flex flex-col items-center w-full">
          
          {/* Ornamental top */}
          <motion.div 
            className="flex items-center justify-center gap-3 mb-3.5"
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-600/40" />
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M12 2L14 9H21L15 13L17 20L12 16L7 20L9 13L3 9H10Z" fill="#c9a84c" />
            </svg>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-600/40" />
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="font-sans-elegant text-stone-500 tracking-[0.3em] text-[10px] md:text-xs uppercase mb-2 select-none"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            viewport={{ once: true }}
          >
            You are cordially invited to celebrate
          </motion.p>

          {/* Groom Name */}
          <motion.h1
            className="font-script text-[68px] md:text-[85px] mb-0.5 leading-[0.95] text-stone-900 select-none"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            Mostafa
          </motion.h1>

          {/* Sweet Minimal Heart Divider */}
          <motion.div 
            className="flex items-center justify-center gap-4 my-2.5"
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, type: 'spring', stiffness: 90, damping: 12 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-px bg-amber-600/25" />
            <svg width="20" height="20" viewBox="0 0 30 30">
              <path
                d="M15 25 C15 25 5 18 5 11 C5 7 8 4 11 4 C13 4 14 5 15 7 C16 5 17 4 19 4 C22 4 25 7 25 11 C25 18 15 25 15 25Z"
                fill="#c9a84c"
                opacity="0.8"
              />
            </svg>
            <div className="w-12 h-px bg-amber-600/25" />
          </motion.div>

          {/* Bride Name */}
          <motion.h1
            className="font-script text-[68px] md:text-[85px] mb-3 leading-[0.95] text-stone-900 select-none"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            Arwa
          </motion.h1>

          {/* Compact Engagement Tag */}
          <motion.div
            className="inline-block mt-1"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div
              className="px-6 py-2 rounded-sm"
              style={{
                border: '1px solid rgba(201,168,76,0.35)',
                background: 'rgba(201,168,76,0.03)',
              }}
            >
              <p className="font-sans-elegant tracking-[0.4em] text-stone-600 text-[11px] md:text-xs uppercase select-none">
                Engagement
              </p>
            </div>
          </motion.div>

          {/* Compact Date */}
          <motion.p
            className="font-sans-elegant text-base md:text-lg text-stone-500 mt-3.5 tracking-[0.25em] font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            viewport={{ once: true }}
          >
            29 · 05 · 2026
          </motion.p>
        </div>

        {/* Elegant photo container with continuous breathing float animation */}
        <motion.div
          className="mt-7 relative inline-block cursor-pointer"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          {/* Continuous floating vertical breathing and subtle rotation */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 0.3, -0.3, 0]
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            whileHover={{ scale: 1.025 }}
            className="relative overflow-visible"
          >
            {/* Gold backing aura shadow */}
            <div
              className="absolute -inset-3 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.3), transparent 50%, rgba(201,168,76,0.3))',
                filter: 'blur(9px)',
              }}
            />
            
            <img
              src="/ChatGPT Image May 13, 2026, 10_51_34 PM.png"
              alt="Mostafa & Arwa Engagement Invitation"
              className="relative max-w-[210px] md:max-w-[250px] rounded-lg shadow-2xl transition-all duration-700"
              style={{
                border: '2px solid rgba(201,168,76,0.45)',
                boxShadow: '0 20px 45px rgba(0,0,0,0.25), 0 0 20px rgba(201,168,76,0.1)',
              }}
            />

            {/* Sweep light leak sheen on hover */}
            <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
              <motion.div 
                className="w-full h-full bg-gradient-to-r from-transparent via-white/12 to-transparent -skew-x-12"
                style={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="font-sans-elegant text-xs tracking-widest text-stone-400 uppercase">Scroll</p>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="#c9a84c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>
    </section>
  );
}
