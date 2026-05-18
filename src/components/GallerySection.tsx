import { motion } from 'framer-motion';

const galleryImages = [
  "/WhatsApp Image 2026-05-13 at 6.05.05 PM.jpeg",
  "/WhatsApp Image 2026-05-13 at 6.05.06 PM (1).jpeg",
  "/WhatsApp Image 2026-05-13 at 6.05.07 PM.jpeg",
  "/WhatsApp Image 2026-05-13 at 6.05.07 PM (1).jpeg",
  "/WhatsApp Image 2026-05-13 at 6.05.07 PM (2).jpeg",
  "/WhatsApp Image 2026-05-13 at 6.05.07 PM (3).jpeg",
  "/WhatsApp Image 2026-05-13 at 6.05.08 PM.jpeg",
];

export default function GallerySection() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: 'linear-gradient(to bottom, #fdf8f0, #f5ede0)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-sans-elegant text-xs tracking-[0.4em] text-amber-700/60 uppercase mb-3 select-none">
            Cherished Memories
          </p>
          <h2 className="font-script text-6xl md:text-7xl text-stone-800 mb-4 select-none">
            Our Gallery
          </h2>
          <div className="divider-gold max-w-sm mx-auto">
            <span className="font-serif-elegant text-amber-600/40 text-lg">❧</span>
          </div>
        </motion.div>

        {/* Gallery container - elegant horizontal scroll carousel on mobile, clean luxury grid on desktop */}
        <div 
          className="flex overflow-x-auto md:grid md:grid-cols-3 gap-5 md:gap-6 pb-6 md:pb-0 snap-x snap-mandatory scroll-smooth px-4 md:px-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Hide default browser scrollbar for Webkit */}
          <style>{`
            .flex.overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              className="relative aspect-[3/4] w-[260px] md:w-auto shrink-0 snap-center rounded-lg overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.025 }}
              style={{
                border: '1.5px solid rgba(201,168,76,0.3)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >
              <img 
                src={src} 
                alt={`Mostafa & Arwa Memory ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
              />

              {/* Hover luxury satin overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(26,14,4,0.4) 0%, transparent 60%)' }}
              />

              {/* Corner decoration */}
              <div
                className="absolute top-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-60 transition-all duration-300 pointer-events-none"
                style={{ borderTop: '1.5px solid #c9a84c', borderRight: '1.5px solid #c9a84c' }}
              />
              <div
                className="absolute bottom-3 left-3 w-4 h-4 opacity-0 group-hover:opacity-60 transition-all duration-300 pointer-events-none"
                style={{ borderBottom: '1.5px solid #c9a84c', borderLeft: '1.5px solid #c9a84c' }}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center font-serif-elegant italic text-stone-400 mt-12 text-lg select-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          More beautiful moments to be added soon...
        </motion.p>
      </div>
    </section>
  );
}
