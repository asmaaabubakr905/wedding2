import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar } from 'lucide-react';

export default function VenueSection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #f5ede0, #fdf8f0)' }}
    >
      {/* Decorative arch pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              borderRadius: '50% 50% 0 0',
              border: '1px solid #c9a84c',
              bottom: -100,
              left: `${10 + i * 12}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-sans-elegant text-xs tracking-[0.4em] text-amber-700/60 uppercase mb-3">
            Join Us At
          </p>
          <h2 className="font-script text-6xl md:text-7xl text-stone-800 mb-4">
            The Venue
          </h2>
          <div className="divider-gold max-w-sm mx-auto">
            <span className="font-serif-elegant text-amber-600/40 text-lg">❧</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Venue illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div
              className="relative rounded-lg overflow-hidden aspect-[3/4]"
              style={{
                border: '2.5px solid rgba(201,168,76,0.45)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
              }}
            >
              <img
                src="/m&a.jpeg"
                alt="Mostafa & Arwa"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103 select-none"
              />

              {/* Shimmer overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 4 }}
              />

              {/* Corner flourishes overlay */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#c9a84c]/50 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#c9a84c]/50 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#c9a84c]/50 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#c9a84c]/50 rounded-br-sm pointer-events-none" />
            </div>
          </motion.div>

          {/* Venue details */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h3
                className="font-script text-5xl mb-2"
                style={{ color: '#1a0e04' }}
              >
                Nefertari Hall
              </h3>
              <p className="font-sans-elegant text-xs tracking-[0.3em] text-amber-700/50 uppercase">
                A palace of elegance
              </p>
            </div>

            <p className="font-serif-elegant text-stone-600 text-lg leading-relaxed italic">
              "We invite you to join us in a night of love, celebration, and timeless memories at one of the most exquisite venues in the city."
            </p>

            <div className="space-y-4">
              {[
                { icon: Calendar, label: 'Date', value: 'Friday, 29 May 2026' },
                { icon: Clock, label: 'Time', value: '8:00 PM Onwards' },
                { icon: MapPin, label: 'Venue', value: 'Nefertari Hall' },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-lg"
                  style={{
                    background: 'rgba(201,168,76,0.06)',
                    border: '1px solid rgba(201,168,76,0.2)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #c9a84c22, #c9a84c44)' }}
                  >
                    <Icon size={18} color="#c9a84c" />
                  </div>
                  <div>
                    <p className="font-sans-elegant text-xs tracking-widest text-stone-400 uppercase">{label}</p>
                    <p className="font-serif-elegant text-stone-700 text-lg">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dress code */}
            <div
              className="p-5 rounded-lg text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.04))',
                border: '1px solid rgba(201,168,76,0.25)',
              }}
            >
              <p className="font-sans-elegant text-xs tracking-[0.3em] text-amber-700/60 uppercase mb-1">Dress Code</p>
              <p className="font-serif-elegant text-stone-600 text-xl italic">Formal Elegance</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
