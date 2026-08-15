import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function MagneticButton({ children, className = '', onMouseMove, onMouseLeave, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      className={`cine-btn ${className}`}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
        onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        if (ref.current) ref.current.style.transform = 'translate(0, 0)';
        onMouseLeave?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
