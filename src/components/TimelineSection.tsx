import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const events = [
  {
    year: 'The Beginning',
    title: 'Two Souls, One Destiny',
    description: 'Their paths crossed, and a beautiful journey began.',
    icon: '✦',
  },
  {
    year: 'Growing Up',
    title: 'Side by Side',
    description: 'Through the years, friendship blossomed into love.',
    icon: '♡',
  },
  {
    year: 'The Moment',
    title: 'He Asked',
    description: 'Under a sky full of stars, she happily said Yes!',
    icon: '💍',
  },
  {
    year: '29.05.2026',
    title: 'Forever Begins',
    description: 'Celebrating their love at Nefertari Hall.',
    icon: '★',
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this timeline section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  // Soft organic spring momentum
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1a0e04 0%, #2d1a08 50%, #1a0e04 100%)',
      }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-amber-500"
            style={{
              width: 100 + i * 40,
              height: 100 + i * 40,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-sans-elegant text-xs tracking-[0.4em] text-amber-500/60 uppercase mb-3 select-none">
            The Journey
          </p>
          <h2 className="font-script text-6xl md:text-7xl text-amber-200 mb-4 select-none">
            Our Story
          </h2>
          <div className="flex items-center justify-center gap-4 select-none">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-amber-600/50" />
            <div className="w-2 h-2 rounded-full bg-amber-500/60" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-amber-600/50" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative min-h-[400px]">
          {/* Static background timeline path - Centered on mobile and web */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 opacity-25"
            style={{ background: 'linear-gradient(to bottom, transparent, #c9a84c 20%, #c9a84c 80%, transparent)' }}
          />
          
          {/* Thicker, glowing gold progress indicator line - Centered on mobile and web */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 origin-top"
            style={{ 
              background: 'linear-gradient(to bottom, #c9a84c, #ffd700, #c9a84c)',
              scaleY,
              boxShadow: '0 0 10px #ffd700, 0 0 20px rgba(255,215,0,0.5)',
            }}
          />

          <div className="flex flex-col gap-10 relative">
            {events.map((event, i) => (
              <motion.div
                key={i}
                className={`flex items-center gap-2 md:gap-6 w-full relative ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                {/* Content card - text aligns according to its layout orientation */}
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div
                    className="p-3 md:p-5 rounded-lg inline-block w-full max-w-[280px] md:max-w-none"
                    style={{
                      background: 'rgba(201,168,76,0.06)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      backdropFilter: 'blur(4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    }}
                  >
                    <p className="font-sans-elegant text-[9px] md:text-xs tracking-widest text-amber-500/80 uppercase mb-0.5 select-none">
                      {event.year}
                    </p>
                    <h3 className="font-serif-elegant text-sm md:text-lg text-amber-200 mb-1 font-semibold leading-tight">
                      {event.title}
                    </h3>
                    <p className="font-serif-elegant text-stone-300 text-[10.5px] md:text-xs leading-relaxed italic">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Node dot - Centered naturally in the middle of the flex layout on both mobile and web */}
                <div className="flex-shrink-0 z-10 select-none relative">
                  <motion.div
                    className="w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base relative z-10"
                    style={{
                      background: 'linear-gradient(135deg, #ffd700, #c9a84c, #8b6914)',
                      boxShadow: '0 0 12px rgba(255,215,0,0.4)',
                    }}
                    whileInView={{ scale: [0.5, 1.15, 1] }}
                    transition={{ duration: 0.5, delay: i * 0.08 + 0.15 }}
                    viewport={{ once: true }}
                  >
                    <span>{event.icon}</span>
                  </motion.div>
                  {/* Outer aura glow */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(255,215,0,0.2)', filter: 'blur(5px)', transform: 'scale(1.3)' }}
                  />
                </div>

                {/* Empty spacer to shift alternating elements on both mobile and web */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
