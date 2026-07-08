import { motion } from 'framer-motion';
import { wedding } from '../config/wedding';
import SectionHeader from './ui/SectionHeader';

export default function QuoteSection() {
  return (
    <section className="relative py-24 md:py-36 px-5 md:px-6 section-cream overflow-hidden">
      {/* Soft ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,680px)] h-[min(70vw,520px)] rounded-full bg-champagne/[0.06] blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <SectionHeader eyebrow="Blessing" title="A Sacred Promise" />

        <motion.div
          className="relative mt-2"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          viewport={{ once: true }}
        >
          {/* Ornamental frame */}
          <div className="glass-card rounded-[2rem] md:rounded-[2.5rem] px-6 py-12 sm:px-10 sm:py-14 md:px-16 md:py-20 relative overflow-hidden">
            {/* Corner ornaments */}
            <span className="absolute top-5 right-5 md:top-7 md:right-7 font-serif-elegant text-champagne/35 text-2xl select-none" aria-hidden>❧</span>
            <span className="absolute top-5 left-5 md:top-7 md:left-7 font-serif-elegant text-champagne/35 text-2xl scale-x-[-1] select-none" aria-hidden>❧</span>
            <span className="absolute bottom-5 right-5 md:bottom-7 md:right-7 font-serif-elegant text-champagne/35 text-2xl scale-y-[-1] select-none" aria-hidden>❧</span>
            <span className="absolute bottom-5 left-5 md:bottom-7 md:left-7 font-serif-elegant text-champagne/35 text-2xl scale-[-1] select-none" aria-hidden>❧</span>

            {/* Inner gold border */}
            <div className="absolute inset-4 md:inset-6 rounded-[1.5rem] md:rounded-[2rem] border border-champagne/15 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <motion.p
                className="font-arabic text-[1.35rem] sm:text-[1.5rem] md:text-[1.65rem] text-text leading-relaxed mb-8 md:mb-10"
                dir="rtl"
                lang="ar"
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </motion.p>

              <blockquote
                className="quran-verse text-[1.65rem] sm:text-[1.85rem] md:text-[2.15rem] lg:text-[2.35rem] text-text font-normal max-w-3xl mx-auto mb-10 md:mb-12 px-1 sm:px-4"
                dir="rtl"
                lang="ar"
                cite="Quran 30:21"
              >
                {wedding.quote.text}
              </blockquote>

              <div className="divider-gold max-w-[280px] md:max-w-xs mx-auto w-full">
                <span className="font-accent text-[9px] md:text-[10px] tracking-[0.22em] md:tracking-[0.28em] text-champagne uppercase text-center leading-relaxed">
                  {wedding.quote.source}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
