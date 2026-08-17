import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { MEMORY_WALL } from './media';

export default function MemoryRoom() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen paper-wash overflow-hidden px-5 py-28 md:py-36">
      <p className="font-accent text-[10px] tracking-[0.5em] text-gold text-center mb-4">THE MEMORY ROOM</p>
      <h2 className="font-script text-5xl md:text-6xl text-center text-text mb-14">Held in light</h2>

      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 px-5">
        {MEMORY_WALL.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(i)}
            className="snap-center shrink-0 w-[min(78vw,320px)] polaroid"
            style={{ transform: `rotate(${item.rotate}deg)` }}
          >
            <img src={encodeURI(item.src)} alt={item.caption} className="w-full aspect-[3/4] object-cover" />
            <p className="font-script text-xl text-text mt-2">{item.caption}</p>
          </button>
        ))}
      </div>

      <div className="hidden md:block relative max-w-6xl mx-auto h-[820px]">
        {MEMORY_WALL.map((item, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const left = 6 + col * 31 + (row % 2 ? 4 : 0);
          const top = 4 + row * 33;
          const dim = active !== null && active !== i;
          return (
            <motion.button
              key={item.src}
              type="button"
              onClick={() => setActive(i)}
              className={`absolute w-[240px] ${item.kind === 'polaroid' ? 'polaroid' : 'bg-[#1a0c10] p-2'} origin-center`}
              style={{ left: `${left}%`, top: `${top}%`, rotate: item.rotate }}
              animate={{
                zIndex: active === i ? 20 : 1,
                filter: dim ? 'blur(7px) brightness(0.65)' : 'blur(0px) brightness(1)',
                scale: active === i ? 1.12 : 1,
              }}
              whileHover={{ scale: 1.06, zIndex: 12, rotate: 0 }}
              transition={{ duration: 0.45 }}
            >
              {item.kind === 'film' && (
                <div className="flex gap-1 mb-1.5">
                  {Array.from({ length: 7 }).map((_, n) => (
                    <span key={n} className="w-2 h-2 bg-ivory/20" />
                  ))}
                </div>
              )}
              <img src={encodeURI(item.src)} alt={item.caption} className="w-full aspect-[3/4] object-cover" />
              {item.kind === 'frame' && <div className="absolute inset-2 border border-gold/30 pointer-events-none" />}
              <p className={`mt-2 ${item.kind === 'polaroid' ? 'font-script text-lg text-text' : 'font-serif-elegant italic text-ivory/70 text-sm px-1 pb-1'}`}>
                {item.caption}
              </p>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[60] bg-wine-deep/70 backdrop-blur-sm flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.figure
              className="max-w-md w-full polaroid"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={encodeURI(MEMORY_WALL[active].src)} alt="" className="w-full aspect-[3/4] object-cover" />
              <figcaption className="font-script text-2xl text-text mt-3">{MEMORY_WALL[active].caption}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
