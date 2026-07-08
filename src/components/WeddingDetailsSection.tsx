import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { wedding } from '../config/wedding';
import SectionHeader from './ui/SectionHeader';

const iconMap = { calendar: Calendar, clock: Clock, map: MapPin, pin: Navigation };

export default function WeddingDetailsSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 section-ivory overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="Save the Date" title="Wedding Details" />
        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {wedding.details.map((detail, i) => {
            const Icon = iconMap[detail.icon];
            return (
              <motion.div
                key={detail.label}
                className="glass-card rounded-2xl p-6 md:p-8 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-champagne/10 group-hover:bg-champagne/15 transition-colors">
                    <Icon size={20} className="text-champagne" />
                  </div>
                  <div>
                    <p className="font-sans-elegant text-[10px] tracking-[0.32em] text-text-muted uppercase mb-1">{detail.label}</p>
                    <p className="font-display text-xl md:text-2xl text-text font-medium">{detail.value}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
