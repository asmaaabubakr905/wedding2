import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

const COLORS = ['#e8d5a3', '#f0d8dc', '#ffd700', '#f5ede0'];

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    let animId: number;

    const spawn = () => {
      if (particles.length < 35) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 8,
          size: 0.8 + Math.random() * 2.2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: -(0.25 + Math.random() * 0.9),
          opacity: 0.35 + Math.random() * 0.35,
          life: 0,
          maxLife: 90 + Math.random() * 60,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      spawn();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;
        const alpha = p.opacity * (1 - p.life / p.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        g.addColorStop(0, p.color);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        if (p.life >= p.maxLife) particles.splice(i, 1);
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.35 }} />;
}
