import { useEffect, type RefObject } from 'react';

export function useChapterInView(
  ref: RefObject<HTMLElement | null>,
  id: number,
  setChapter: (id: number) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setChapter(id);
      },
      { threshold: 0.32, rootMargin: '-10% 0px -20% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id, ref, setChapter]);
}
