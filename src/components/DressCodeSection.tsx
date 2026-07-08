import { motion } from 'framer-motion';
import { wedding } from '../config/wedding';
import SectionHeader from './ui/SectionHeader';

export default function DressCodeSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 section-blush overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <SectionHeader eyebrow="Attire" title="Dress Code" />
        <motion.div className="glass-card rounded-3xl p-10 md:p-14 text-center max-w-2xl mx-auto" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} viewport={{ once: true }}>
          <h3 className="font-display text-3xl md:text-4xl text-text font-medium mb-4">{wedding.dressCode.title}</h3>
          <p className="font-serif-elegant text-text-muted text-lg italic leading-relaxed mb-8 max-w-lg mx-auto">{wedding.dressCode.description}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {wedding.dressCode.suggestions.map((item, i) => (
              <motion.span key={item} className="px-5 py-2.5 rounded-full font-sans-elegant text-[11px] tracking-wider uppercase bg-white/80 border border-champagne/25 text-text" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.08 }} viewport={{ once: true }}>
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
