import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const messages = [
  {
    author: 'From the Families',
    text: 'With hearts full of joy, we celebrate the union of two beloved souls. May your love be as eternal as the stars and as deep as the ocean.',
  },
  {
    author: 'To Our Dearest Friends',
    text: 'Your presence on this special day means the world to us. Thank you for being part of our love story.',
  },
  {
    author: 'A Wish for the Couple',
    text: 'May every day be filled with laughter, every moment with tenderness, and every year with growing love.',
  },
];

export default function MessagesSection() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: 'linear-gradient(to bottom, #fff6f8, #fceef3)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-sans-elegant text-xs tracking-[0.4em] text-rose-700/60 uppercase mb-3">
            With Love
          </p>
          <h2 className="font-script text-6xl md:text-7xl text-stone-800 mb-4">
            Messages of Joy
          </h2>
          <div className="divider-gold max-w-sm mx-auto">
            <span className="font-serif-elegant text-rose-400/50 text-lg">❧</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className="relative p-8 rounded-lg"
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(212,120,140,0.2)',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.05)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
            >
              {/* Quote mark */}
              <div
                className="absolute -top-4 left-8 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #e891a8, #c45c78)',
                  boxShadow: '0 4px 12px rgba(212,120,140,0.3)',
                }}
              >
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                  <path d="M6 0H0V6C0 9.31 2.69 12 6 12V14C2.69 14 0 11.31 0 8V0H6ZM16 0H10V6C10 9.31 12.69 12 16 12V14C12.69 14 10 11.31 10 8V0H16Z" fill="rgba(255,255,255,0.9)" />
                </svg>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-3 right-3">
                <Heart size={16} fill="rgba(212,120,140,0.2)" stroke="rgba(212,120,140,0.4)" />
              </div>

              <p className="font-serif-elegant italic text-stone-600 leading-relaxed mb-5 text-base">
                {msg.text}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-rose-300/50" />
                <p className="font-sans-elegant text-xs tracking-widest text-rose-700/60 uppercase">
                  {msg.author}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
