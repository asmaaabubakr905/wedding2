import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  onCardRevealed?: () => void;
}

export default function Envelope({ onCardRevealed }: Props) {
  const [opened, setOpened] = useState(false);
  const [sealExploded, setSealExploded] = useState(false);
  const [showShower, setShowShower] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    // Play "Perfect" by Ed Sheeran
    try {
      const audio = new Audio('/perfect.m4a');
      audio.volume = 0.55; // Soft premium romantic volume
      audio.play().catch((err) => {
        console.warn("Audio autoplay prevented:", err);
      });
    } catch {
      // Audio element fallback
    }



    // Trigger seal burst explosion
    setTimeout(() => setSealExploded(true), 250);

    // Trigger gold petal shower cascade exactly when the card rises (2.1s after opening starts)
    setTimeout(() => setShowShower(true), 2100);

    if (onCardRevealed) {
      // Flap opens (1.0s) + Card slides out (1.5s) = 2.5s total cinematic reveal
      setTimeout(onCardRevealed, 2500);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 select-none"
      style={{
        background: 'radial-gradient(ellipse at center, #1c140d 0%, #060403 100%)',
      }}
    >
      {/* 1. Cinematic Blurred Dreamscape Backdrop (Grounded in the masterpiece visual) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-[2.5s] ease-in-out"
        style={{
          backgroundImage: "url('/cinematic_bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          filter: opened ? 'blur(16px) brightness(0.35)' : 'blur(8px) brightness(0.55)',
          transform: opened ? 'scale(1.05)' : 'scale(1.0)',
        }}
      />

      {/* Luxury gold and charcoal vignette framing */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 15%, rgba(6,4,2,0.4) 60%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* Soft golden particle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-2">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-400"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${80 + Math.random() * 20}%`,
              opacity: 0,
              boxShadow: '0 0 8px #ffd700',
            }}
            animate={{
              y: [0, -window.innerHeight],
              x: [0, (Math.random() * 80 - 40)],
              opacity: [0, 0.5, 0.5, 0],
              scale: [0.6, 1.1, 0.4]
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <div className="text-center flex flex-col items-center gap-14 relative z-10 w-full max-w-lg">
        {/* Ambient Top Text */}
        <motion.p
          className="font-sans-elegant text-amber-200/50 tracking-[0.3em] uppercase text-[11px] md:text-xs"
          initial={{ opacity: 0, y: 15 }}
          animate={opened ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
        >
          A special message awaits you
        </motion.p>

        {/* Envelope Container (Elegant, Luxurious, and Centered) */}
        <motion.div
          className="relative cursor-pointer select-none envelope-glow"
          onClick={handleOpen}
          whileHover={!opened ? { scale: 1.04, y: -3 } : {}}
          whileTap={!opened ? { scale: 0.98 } : {}}
          style={{ width: 310, height: 190 }}
          initial={{ opacity: 0, scale: 0.8, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.0, type: 'spring', bounce: 0.15 }}
        >
          {/* LAYER 1: Envelope Interior Lining (Luxurious Dark Gold Satin Effect) */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background: 'linear-gradient(to bottom, #2b1f0f 0%, #160e06 100%)',
              border: '1px solid rgba(201,168,76,0.3)',
              boxShadow: 'inset 0 10px 25px rgba(0,0,0,0.9)',
              borderRadius: 8,
              zIndex: 1,
            }}
          />

          {/* LAYER 2: ELEGANT INVITE CARD WITH ARABIC CALLIGRAPHY & GOLD FOIL */}
          <motion.div
            className="absolute rounded-md p-[2px] flex flex-col justify-between overflow-hidden"
            style={{
              width: 275,
              height: 260,
              left: '50%',
              marginLeft: -137.5,
              background: 'linear-gradient(135deg, #f7f5f0 0%, #eae7e0 100%)',
              border: '1.5px solid #c9a84c',
              boxShadow: '0 25px 55px rgba(0,0,0,0.55), 0 0 25px rgba(212,175,55,0.08)',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              direction: 'ltr'
            }}
            initial={{ y: 15, scale: 0.8, opacity: 0, zIndex: 5 }}
            animate={opened ? { 
              y: -175, 
              scale: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.95 : 1.0, 
              opacity: 1, 
              zIndex: 8, // Placed behind the front pocket (zIndex: 10) but in front of lining (zIndex: 1)
              rotate: [0, -1.0, -1.0]
            } : { 
              y: 15, 
              scale: 0.8, 
              opacity: 0, 
              zIndex: 5 
            }}
            transition={{ 
              y: { duration: 1.5, ease: [0.25, 0.8, 0.25, 1], delay: 0.6 },
              scale: { duration: 1.5, ease: [0.25, 0.8, 0.25, 1], delay: 0.6 },
              opacity: { duration: 0.8, ease: 'easeOut', delay: 0.6 },
              rotate: { duration: 1.8, ease: 'easeInOut', delay: 1.2 }
            }}
          >
            {/* Continuous Sweeping Gold Foil Shimmer Sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 35%, rgba(201, 168, 76, 0.18) 45%, rgba(255, 230, 160, 0.25) 50%, rgba(201, 168, 76, 0.18) 55%, transparent 65%)',
                backgroundSize: '220% 100%',
                zIndex: 10,
              }}
              animate={opened ? { backgroundPosition: ['150% 0', '-50% 0'] } : {}}
              transition={{ duration: 2.2, delay: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4.0 }}
            />

            {/* Card Content Interior with double gold border */}
            <div className="relative w-full h-full flex flex-col justify-center items-center border border-amber-800/12 p-4 rounded" style={{ direction: 'ltr' }}>
              
              {/* Romantic Quote (Exact layout & styling from user's dream reference) */}
              <div className="text-center w-full px-1 flex flex-col items-center justify-center">
                {/* Title Script: Finally, Our Forever Begins.. */}
                <h2 
                  className="text-[25px] md:text-[28px] leading-none font-script text-[#4e412f] mb-3.5 select-none"
                  style={{
                    textShadow: '0 1px 1px rgba(0,0,0,0.02)',
                  }}
                >
                  Finally, Our Forever Begins..
                </h2>

                {/* Elegant body paragraphs */}
                <p 
                  className="text-stone-600 font-sans-elegant text-[9.5px] md:text-[10.5px] leading-[1.75] tracking-[0.05em] text-center select-none"
                >
                  Two hearts, one promise, and a lifetime
                  <br />
                  of love ahead.
                  <br />
                  We would be honored to have you share
                  <br />
                  this beautiful beginning with us.
                </p>

                {/* Small heart at the bottom */}
                <span className="text-[#a48642] text-[11px] mt-3 select-none">♥</span>
              </div>

              {/* Detailed Gold flourishes on all four corners */}
              <div className="absolute top-[6px] left-[6px] w-3 h-3 border-t border-l border-amber-700/18 rounded-tl-sm" />
              <div className="absolute top-[6px] right-[6px] w-3 h-3 border-t border-r border-amber-700/18 rounded-tr-sm" />
              <div className="absolute bottom-[6px] left-[6px] w-3 h-3 border-b border-l border-amber-700/18 rounded-bl-sm" />
              <div className="absolute bottom-[6px] right-[6px] w-3 h-3 border-b border-r border-amber-700/18 rounded-br-sm" />

            </div>
          </motion.div>

          {/* LAYER 3: Envelope Front Pocket (Carbon Matte Black & Gold Flaps) */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width="310"
            height="190"
            viewBox="0 0 310 190"
            style={{ zIndex: 10 }}
          >
            {/* Left side flap */}
            <path d="M 0 190 L 155 100 L 0 0 Z" fill="url(#frontFlapGrad)" stroke="rgba(201,168,76,0.35)" strokeWidth="1" />
            {/* Right side flap */}
            <path d="M 310 190 L 155 100 L 310 0 Z" fill="url(#frontFlapGrad)" stroke="rgba(201,168,76,0.35)" strokeWidth="1" />
            {/* Bottom pocket flap */}
            <path d="M 0 190 L 155 95 L 310 190 Z" fill="url(#bottomFlapGrad)" stroke="rgba(201,168,76,0.4)" strokeWidth="1.2" />
            <defs>
              <linearGradient id="frontFlapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1e1e" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </linearGradient>
              <linearGradient id="bottomFlapGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#0c0c0c" />
              </linearGradient>
            </defs>
          </svg>

          {/* LAYER 4: Envelope Top Triangular Flap (Swings open/back in 3D) */}
          <motion.div
            className="absolute inset-x-0 top-0 origin-top"
            style={{ height: 100, transformStyle: 'preserve-3d', zIndex: opened ? 4 : 20 }}
            animate={opened ? { rotateX: -160 } : { rotateX: 0 }}
            transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
          >
            <svg width="310" height="100" viewBox="0 0 310 100" className="absolute inset-0">
              <path
                d="M 0 0 L 310 0 L 155 100 Z"
                fill="url(#topFlapGrad)"
                stroke="rgba(201,168,76,0.45)"
                strokeWidth="1.2"
              />
              <defs>
                <linearGradient id="topFlapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#242424" />
                  <stop offset="100%" stopColor="#0f0f0f" />
                </linearGradient>
              </defs>
            </svg>

            {/* LAYER 5: Wax Seal (Premium Golden Stamp with interactive explosion) */}
            <motion.div
              className="absolute cursor-pointer"
              style={{
                width: 52,
                height: 52,
                bottom: -26,
                left: '50%',
                marginLeft: -26,
                background: 'radial-gradient(circle, #f5d470 0%, #b89332 60%, #75591b 100%)',
                borderRadius: '50%',
                boxShadow: '0 5px 15px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,225,110,0.45)',
                zIndex: 25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backfaceVisibility: 'hidden'
              }}
              animate={sealExploded ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: 'easeIn' }}
            >
              <svg viewBox="0 0 48 48" className="w-full h-full p-[2px] opacity-95">
                <circle cx="24" cy="24" r="19" fill="none" stroke="rgba(255,240,180,0.4)" strokeWidth="0.8" strokeDasharray="2 2" />
                <text x="24" y="30" textAnchor="middle" fontSize="17" fill="rgba(255,240,180,0.9)" fontFamily="serif">♥</text>
              </svg>
            </motion.div>
          </motion.div>

          {/* Floating Gold Sparkle Particles (rising from behind invitation card) */}
          {opened && (
            <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 35 }}>
              {Array.from({ length: 25 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-t from-amber-300 to-yellow-100"
                  style={{
                    width: Math.random() * 4 + 1.5,
                    height: Math.random() * 4 + 1.5,
                    left: `${15 + Math.random() * 70}%`,
                    top: '50%',
                    filter: 'blur(0.5px)',
                    boxShadow: '0 0 8px rgba(255,215,0,0.9)',
                    opacity: 0
                  }}
                  initial={{ y: 0, opacity: 0, scale: 0.5 }}
                  animate={{
                    y: [0, -210 - Math.random() * 120],
                    x: [0, (Math.random() * 80 - 40)],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.25, 0.2]
                  }}
                  transition={{
                    duration: 2.2 + Math.random() * 1.2,
                    delay: 0.4 + Math.random() * 1.5,
                    repeat: Infinity,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </div>
          )}

        </motion.div>

        {/* Ambient Click Prompt */}
        <motion.p
          className="font-sans-elegant text-amber-200/40 text-xs tracking-[0.25em] uppercase"
          initial={{ opacity: 0 }}
          animate={opened ? { opacity: 0 } : { opacity: [0, 0.6, 0] }}
          transition={opened ? { duration: 0.3 } : { delay: 1.2, duration: 2.0, repeat: Infinity }}
        >
          Tap to open
        </motion.p>
      </div>

      {/* Majestic full-screen organic cascading gold petal shower */}
      {showShower && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 45 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-b from-amber-200 to-amber-500"
              style={{
                width: Math.random() * 6 + 4,
                height: Math.random() * 9 + 5,
                left: `${Math.random() * 100}%`,
                opacity: 0,
                boxShadow: '0 0 10px rgba(255,215,0,0.85)',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', // organic petal/leaf shape
              }}
              initial={{ y: -50, opacity: 0, rotate: Math.random() * 360 }}
              animate={{
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800,
                opacity: [0, 0.95, 0.95, 0],
                rotate: [Math.random() * 360, Math.random() * 720],
                x: [0, (Math.random() * 140 - 70)]
              }}
              transition={{
                duration: 3.5 + Math.random() * 2.0,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
