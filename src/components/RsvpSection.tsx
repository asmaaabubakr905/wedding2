import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, X, Users } from 'lucide-react';
import { wedding } from '../config/wedding';
import SectionHeader from './ui/SectionHeader';

export default function RsvpSection() {
  const [submitted, setSubmitted] = useState(false);
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('1');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative py-24 md:py-32 px-6 section-ivory overflow-hidden">
      <div className="max-w-xl mx-auto">
        <SectionHeader eyebrow="Kindly Respond" title="RSVP" />

        <motion.div
          className="glass-card rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {submitted ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-champagne/15 flex items-center justify-center">
                <Check size={28} className="text-champagne" />
              </div>
              <h3 className="font-display text-2xl text-text mb-2">Thank You!</h3>
              <p className="font-serif-elegant text-text-muted italic">
                Your response has been received with love.
              </p>
            </motion.div>
          ) : (
            <>
              <p className="font-serif-elegant text-text-muted text-center italic mb-2 leading-relaxed">
                {wedding.rsvp.message}
              </p>
              <p className="font-sans-elegant text-[10px] tracking-[0.25em] text-text-muted uppercase text-center mb-8">
                {wedding.rsvp.deadline}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-sans-elegant text-[10px] tracking-[0.2em] text-text-muted/50 uppercase block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-xl bg-white/50 border border-champagne/20 font-serif-elegant text-text focus:outline-none focus:border-champagne/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="font-sans-elegant text-[10px] tracking-[0.2em] text-text-muted/50 uppercase block mb-3">
                    Will you attend?
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending('yes')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-sans-elegant text-xs tracking-wider uppercase transition-all duration-300 ${
                        attending === 'yes'
                          ? 'bg-champagne/20 border-champagne/50 text-text'
                          : 'bg-white/40 border-champagne/15 text-text-muted/60'
                      } border`}
                    >
                      <Check size={14} /> Joyfully Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending('no')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-sans-elegant text-xs tracking-wider uppercase transition-all duration-300 ${
                        attending === 'no'
                          ? 'bg-champagne/20 border-champagne/50 text-text'
                          : 'bg-white/40 border-champagne/15 text-text-muted/60'
                      } border`}
                    >
                      <X size={14} /> Regretfully Decline
                    </button>
                  </div>
                </div>

                {attending === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <label className="font-sans-elegant text-[10px] tracking-[0.2em] text-text-muted/50 uppercase block mb-2">
                      <Users size={12} className="inline mr-1" /> Number of Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/50 border border-champagne/20 font-serif-elegant text-text focus:outline-none focus:border-champagne/50"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}

                <div>
                  <label className="font-sans-elegant text-[10px] tracking-[0.2em] text-text-muted/50 uppercase block mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-5 py-3.5 rounded-xl bg-white/50 border border-champagne/20 font-serif-elegant text-text focus:outline-none focus:border-champagne/50 resize-none transition-colors"
                    placeholder="Share your wishes..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={!attending || !name}
                  className="luxury-btn-filled w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                  Send Response
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
