import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface Props {
  autoPlay?: boolean;
}

export default function MusicControl({ autoPlay = false }: Props) {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Use a royalty-free piano/ambient track as placeholder
    // "Perfect" by Ed Sheeran cannot be embedded directly due to copyright
    // We create a soft ambient tone using Web Audio API
    setVisible(true);

    if (autoPlay) {
      startAmbientMusic();
    }
  }, [autoPlay]);

  const startAmbientMusic = () => {
    if (audioRef.current) return;

    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

      // Create a soft romantic ambient soundtrack using oscillators
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);

      // Notes for a romantic melody (approximating Perfect's feel)
      const notes = [
        { freq: 523.25, time: 0 },    // C5
        { freq: 587.33, time: 0.8 },  // D5
        { freq: 659.25, time: 1.6 },  // E5
        { freq: 698.46, time: 2.4 },  // F5
        { freq: 783.99, time: 3.2 },  // G5
        { freq: 698.46, time: 4.0 },  // F5
        { freq: 659.25, time: 4.8 },  // E5
        { freq: 587.33, time: 5.6 },  // D5
        { freq: 523.25, time: 6.4 },  // C5
        { freq: 493.88, time: 7.2 },  // B4
        { freq: 523.25, time: 8.0 },  // C5
      ];

      const playNote = (freq: number, startTime: number, duration = 1.2) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0.15, startTime + duration * 0.6);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
        osc.connect(gainNode);
        gainNode.connect(masterGain);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const scheduleLoop = (offset: number) => {
        notes.forEach(({ freq, time }) => {
          playNote(freq, ctx.currentTime + offset + time, 1.4);
        });
        // Also add harmonic layer
        notes.forEach(({ freq, time }) => {
          playNote(freq * 0.5, ctx.currentTime + offset + time + 0.4, 1.2);
        });
      };

      scheduleLoop(0);
      scheduleLoop(9);
      scheduleLoop(18);

      // Store reference to be able to stop
      (audioRef as any).current = { ctx, gain: masterGain };
      setPlaying(true);
    } catch {
      // Audio API not available
    }
  };

  const toggle = () => {
    if (!playing) {
      startAmbientMusic();
    } else {
      const ref = audioRef.current as any;
      if (ref) {
        ref.gain.gain.linearRampToValueAtTime(0, ref.ctx.currentTime + 0.5);
        setTimeout(() => {
          ref.ctx.close();
          audioRef.current = null;
          setPlaying(false);
        }, 600);
      }
    }
  };

  if (!visible) return null;

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 cursor-pointer"
      style={{
        background: 'rgba(26,14,4,0.85)',
        border: '1px solid rgba(201,168,76,0.4)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        color: '#e8d5a3',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={playing ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 4, repeat: playing ? Infinity : 0, ease: 'linear' }}
      >
        <Music size={14} />
      </motion.div>
      {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
      <span className="font-sans-elegant text-xs tracking-wider">
        {playing ? 'Music On' : 'Music Off'}
      </span>
    </motion.button>
  );
}
