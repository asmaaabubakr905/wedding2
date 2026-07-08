import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Heart, Sparkles, UtensilsCrossed, Wine } from 'lucide-react';
import { wedding } from '../config/wedding';
import SectionHeader from './ui/SectionHeader';

const iconMap = {
  wine: Wine,
  heart: Heart,
  utensils: UtensilsCrossed,
  sparkles: Sparkles,
};

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.25'],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-5 md:px-6 section-cream overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <SectionHeader eyebrow="The Evening" title="Event Timeline" />

        <div className="relative">
          {/* Static track */}
          <div className="absolute left-[15px] md:left-1/2 top-2 bottom-2 w-px md:-translate-x-1/2 bg-champagne/20" />

          {/* Scroll-driven line */}
          <motion.div
            className="absolute left-[14px] md:left-1/2 top-2 w-[2px] md:-translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-champagne-light via-champagne to-gold"
            style={{ height: 'calc(100% - 1rem)', scaleY: lineProgress }}
          />

          <div className="flex flex-col gap-10 md:gap-14">
            {wedding.timeline.map((event, i) => {
              const Icon = iconMap[event.icon];
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={event.title}
                  className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  viewport={{ once: true, margin: '-40px' }}
                >
                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 ${isEven ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'}`}>
                    <div className="glass-card rounded-2xl p-5 md:p-6">
                      <h3 className="font-display text-xl md:text-2xl text-text font-medium mb-2">{event.title}</h3>
                      <p className="font-serif-elegant text-text-muted text-sm md:text-base italic leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      className="relative w-[30px] h-[30px] rounded-full bg-ivory border border-champagne/45 shadow-warm flex items-center justify-center"
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.45, delay: i * 0.08 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute inset-0 rounded-full ring-4 ring-champagne/15" />
                      <Icon size={13} className="text-champagne" strokeWidth={1.75} />
                    </motion.div>
                  </div>

                  {/* Spacer for alternating desktop layout */}
                  <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
