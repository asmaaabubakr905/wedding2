import { motion } from 'framer-motion';
import { wedding } from '../config/wedding';
import SectionHeader from './ui/SectionHeader';

export default function GallerySection() {
  return (
    <section className="relative py-24 md:py-32 px-6 section-cream overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Our Moments" title="Photo Gallery" />
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-5 pb-4 md:pb-0 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          {wedding.gallery.map((src, i) => (
            <motion.div
              key={i}
              className="relative aspect-[3/4] w-[240px] md:w-auto shrink-0 snap-center rounded-xl overflow-hidden group cursor-pointer bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              style={{ border: '1.5px solid rgba(212,120,140,0.22)', boxShadow: '0 10px 28px rgba(74,44,54,0.08)' }}
            >
              <img src={src} alt={`Memory ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-cream/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
