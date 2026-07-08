import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  className?: string;
}

export default function SectionHeader({ eyebrow, title, className = '' }: SectionHeaderProps) {
  return (
    <motion.div
      className={`text-center mb-14 md:mb-16 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-60px' }}
    >
      <p className="font-sans-elegant text-[10px] md:text-xs tracking-[0.42em] uppercase mb-3 text-champagne">{eyebrow}</p>
      <h2 className="font-script text-5xl sm:text-6xl md:text-7xl mb-5 leading-none text-text">{title}</h2>
      <div className="divider-gold max-w-xs mx-auto">
        <span className="text-champagne-light text-sm">✦</span>
      </div>
    </motion.div>
  );
}
