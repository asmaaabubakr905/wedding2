import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import CountdownDisplay from './ui/CountdownDisplay';

export default function CountdownSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 section-blush overflow-hidden">
      <div className="relative max-w-4xl mx-auto text-center">
        <SectionHeader eyebrow="The Countdown" title="Until We Say I Do" />
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75 }} viewport={{ once: true }}>
          <CountdownDisplay />
        </motion.div>
        <motion.p className="font-serif-elegant italic text-text-muted mt-12 text-lg" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }}>
          Every moment brings us closer to forever
        </motion.p>
      </div>
    </section>
  );
}
