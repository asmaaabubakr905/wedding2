import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { wedding } from '../config/wedding';
import { playWeddingMusic } from '../hooks/useWeddingMusic';

interface Props {
  onCardRevealed?: () => void;
}

/**
 * Classic invitation envelope — all diagonal folds meet at (155, 100)
 * Body 310×190, top flap height 100
 */
const W = 310;
const H = 190;
const W_MOBILE = 252;
const H_MOBILE = 155;
const CX = W / 2; // 155
const FOLD_Y = 100;
const SEAL_SIZE = 50;

export default function Envelope({ onCardRevealed }: Props) {
  const [opened, setOpened] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);
  const [showShower, setShowShower] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const envW = isMobile ? W_MOBILE : W;
  const envH = isMobile ? H_MOBILE : H;
  const cardW = Math.round(272 * (envW / W));
  const cardH = Math.round(258 * (envW / W));
  const cardLift = Math.round(252 * (envW / W));

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    setTimeout(() => setSealBroken(true), 280);

    playWeddingMusic();

    setTimeout(() => setShowShower(true), 2000);

    if (onCardRevealed) setTimeout(onCardRevealed, 2700);
  };

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col overflow-hidden select-none">
      <div className="absolute inset-0 z-0 bg-[#1a1410]" />

      {/* Sharp photo layer — faces stay visible on mobile (top of screen) */}
      <picture className="absolute inset-0 z-0 pointer-events-none block">
        <source media="(max-width: 767px)" srcSet="/opening.jpeg" />
        <img
          src="/opening.jpeg"
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full envelope-intro-photo ${
            opened ? 'envelope-intro-photo--open' : 'envelope-intro-photo--closed'
          }`}
        />
      </picture>

      <div className="absolute inset-0 z-[1] pointer-events-none envelope-vignette" />

      {/* Gold particles — fewer on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        {Array.from({ length: isMobile ? 12 : 22 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-300"
            style={{
              width: 2 + (i % 2),
              height: 2 + (i % 2),
              left: `${(i * 41) % 100}%`,
              top: `${60 + (i * 11) % 35}%`,
              boxShadow: '0 0 6px #ffd700',
            }}
            animate={{
              y: [0, -100 - (i % 4) * 30],
              opacity: [0, 0.65, 0],
            }}
            transition={{ duration: 5 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full flex-1 min-h-0 md:gap-14 gap-4 px-3 sm:px-4 text-center max-md:-translate-y-3">
        {/* Mobile: names over visible couple area at top */}
        {!opened && (
          <motion.div
            className="absolute top-[max(1.25rem,env(safe-area-inset-top))] left-0 right-0 z-20 px-4 pointer-events-none md:hidden text-center"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p
              className="inline-block font-accent text-[9px] tracking-[0.34em] text-champagne-light uppercase mb-2 px-4 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
            >
              Wedding Invitation
            </p>
            <p
              className="font-script text-[2.35rem] leading-none text-white"
              style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)' }}
            >
              {wedding.groom} & {wedding.bride}
            </p>
          </motion.div>
        )}

        <motion.p
          className="font-accent tracking-[0.28em] md:tracking-[0.35em] uppercase text-[9px] sm:text-[10px] md:text-xs w-full px-2 text-white/95"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.75), 0 2px 24px rgba(0,0,0,0.45)' }}
          animate={opened ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {wedding.envelope.tagline}
        </motion.p>

        <motion.div
          className="relative cursor-pointer envelope-glow-cinematic mx-auto"
          dir="ltr"
          onClick={handleOpen}
          whileHover={!opened && !isMobile ? { scale: 1.035, y: -4 } : {}}
          whileTap={!opened ? { scale: 0.98 } : {}}
          style={{ width: envW, height: envH, perspective: 1100, marginLeft: 'auto', marginRight: 'auto' }}
          initial={{ opacity: 0, scale: 0.88, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.95, type: 'spring', bounce: 0.1 }}
        >
          {/* Inner lining */}
          <div
            className="absolute inset-0 rounded-[5px]"
            style={{
              background: 'linear-gradient(180deg, #faf3ec 0%, #ebe0d0 100%)',
              border: '1px solid rgba(201,168,76,0.22)',
              boxShadow: 'inset 0 10px 28px rgba(80,60,40,0.1)',
              zIndex: 1,
            }}
          />

          {/* Card */}
          <motion.div
            className="absolute rounded-[4px] overflow-hidden"
            style={{
              width: cardW,
              height: cardH,
              left: '50%',
              marginLeft: -cardW / 2,
              background: 'linear-gradient(150deg, #fffcf8, #f5ede0)',
              border: '1.5px solid rgba(201,168,76,0.42)',
              boxShadow: '0 26px 58px rgba(0,0,0,0.32)',
              transformStyle: 'preserve-3d',
            }}
            initial={{ y: 14, scale: 0.78, opacity: 0, zIndex: 5 }}
            animate={
              opened
                ? { y: -cardLift, scale: 1, opacity: 1, zIndex: 8, rotate: -0.5 }
                : { y: 14, scale: 0.78, opacity: 0, zIndex: 5 }
            }
            transition={{ duration: 1.45, ease: [0.25, 0.8, 0.25, 1], delay: opened ? 0.55 : 0 }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, transparent 40%, rgba(255,230,160,0.2) 50%, transparent 60%)',
                backgroundSize: '220% 100%',
              }}
              animate={opened ? { backgroundPosition: ['150% 0', '-50% 0'] } : {}}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 4 }}
            />
            <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-5 text-center">
              <p className="font-accent text-[8px] sm:text-[9px] tracking-[0.38em] text-champagne uppercase mb-2">Wedding Invitation</p>
              <h2 className="font-script text-[26px] sm:text-[30px] text-text leading-none mb-2">{wedding.envelope.cardTitle}</h2>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-champagne/45 to-transparent my-2" />
              <p className="font-serif-elegant text-text-muted text-[12.5px] leading-relaxed whitespace-pre-line italic">
                {wedding.envelope.cardBody}
              </p>
              <p className="font-script text-xl gold-text mt-3">{wedding.groom} & {wedding.bride}</p>
            </div>
          </motion.div>

          {/* Front pocket — viewBox fixed for perfect scaling on mobile */}
          <svg
            className="absolute inset-0 pointer-events-none w-full h-full"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            style={{ zIndex: 10 }}
          >
            <defs>
              <linearGradient id="pL" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f7efe5" /><stop offset="100%" stopColor="#e8dcc8" />
              </linearGradient>
              <linearGradient id="pR" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#f2eae0" /><stop offset="100%" stopColor="#e0d4c0" />
              </linearGradient>
              <linearGradient id="pB" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#e5d9c8" /><stop offset="100%" stopColor="#faf3ec" />
              </linearGradient>
            </defs>
            <path d={`M 0 ${H} L ${CX} ${FOLD_Y} L 0 0 Z`} fill="url(#pL)" stroke="rgba(201,168,76,0.2)" strokeWidth="0.7" />
            <path d={`M ${W} ${H} L ${CX} ${FOLD_Y} L ${W} 0 Z`} fill="url(#pR)" stroke="rgba(201,168,76,0.2)" strokeWidth="0.7" />
            <path d={`M 0 ${H} L ${CX} 95 L ${W} ${H} Z`} fill="url(#pB)" stroke="rgba(201,168,76,0.28)" strokeWidth="0.9" />
          </svg>

          {/* Top flap */}
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{
              height: `${(FOLD_Y / H) * 100}%`,
              transformStyle: 'preserve-3d',
              transformOrigin: 'top center',
              zIndex: opened ? 4 : 20,
            }}
            animate={opened ? { rotateX: -162 } : { rotateX: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: opened ? 0.15 : 0 }}
          >
            <svg viewBox={`0 0 ${W} ${FOLD_Y}`} preserveAspectRatio="none" className="block w-full h-full">
              <defs>
                <linearGradient id="pT" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#f5ebe0" />
                </linearGradient>
              </defs>
              <path d={`M 0 0 L ${W} 0 L ${CX} ${FOLD_Y} Z`} fill="url(#pT)" stroke="rgba(201,168,76,0.28)" strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
            </svg>

            <motion.div
              className="absolute flex items-center justify-center rounded-full"
              style={{
                width: SEAL_SIZE,
                height: SEAL_SIZE,
                left: `calc(50% - ${SEAL_SIZE / 2}px)`,
                top: `calc(100% - ${SEAL_SIZE / 2}px)`,
                background: 'radial-gradient(circle at 32% 28%, #ffe08a, #c9a84c 52%, #8b6914 100%)',
                boxShadow: '0 5px 18px rgba(0,0,0,0.35), inset 0 2px 4px rgba(255,240,180,0.5)',
                zIndex: 25,
              }}
              animate={sealBroken ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeIn' }}
            >
              <span className="font-script text-base text-white/95 leading-none pl-0.5">M&Y</span>
            </motion.div>
          </motion.div>

          {sealBroken && (
            <div className="absolute inset-0 pointer-events-none z-30">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-amber-200"
                  style={{ width: 3, height: 3, left: '50%', top: `${(FOLD_Y / H) * 100 - 4}%` }}
                  initial={{ opacity: 1 }}
                  animate={{
                    x: Math.cos((i / 10) * Math.PI * 2) * 50,
                    y: Math.sin((i / 10) * Math.PI * 2) * 50,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          )}
        </motion.div>

        <motion.p
          className="font-sans-elegant text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase w-full px-2 text-white/90"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.75), 0 2px 24px rgba(0,0,0,0.45)' }}
          animate={opened ? { opacity: 0 } : { opacity: [0.85, 1, 0.85] }}
          transition={opened ? { duration: 0.25 } : { duration: 2.2, repeat: Infinity }}
        >
          Tap to open your invitation
        </motion.p>
      </div>

      {showShower && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 32 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: 5 + (i % 3),
                height: 8 + (i % 4),
                left: `${(i * 22) % 100}%`,
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                background: i % 2 ? 'linear-gradient(#ffeaa0,#ffd700)' : 'linear-gradient(#f5d0d8,#e8b4b8)',
                boxShadow: '0 0 6px rgba(255,215,0,0.5)',
              }}
              initial={{ y: -30, opacity: 0 }}
              animate={{
                y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800,
                opacity: [0, 0.9, 0, 0],
                rotate: i * 40 + 600,
                x: (i % 2 ? 1 : -1) * (25 + (i % 20)),
              }}
              transition={{ duration: 3.5 + (i % 3), ease: 'linear' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
