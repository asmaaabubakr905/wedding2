import { CHAPTERS } from './media';

interface Props {
  chapter: number;
}

export default function ChapterNav({ chapter }: Props) {
  const current = CHAPTERS[Math.min(chapter, CHAPTERS.length - 1)];

  return (
    <>
      <div className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 flex-col gap-5 pointer-events-none rounded-full py-6 px-3 bg-wine-deep/45 backdrop-blur-md border border-gold/10">
        {CHAPTERS.map((item) => {
          const active = item.id === current.id;
          return (
            <div key={item.id} className="flex items-center gap-3">
              <span className={`block w-6 h-px transition-all duration-700 ${active ? 'bg-gold w-10' : 'bg-gold/25'}`} />
              <div className={`transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-25'}`}>
                <p className="font-accent text-[8px] tracking-[0.32em] text-gold">CHAPTER {item.roman}</p>
                <p className="font-serif-elegant italic text-[11px] text-ivory/80 mt-0.5">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="md:hidden fixed top-0 inset-x-0 z-50 px-5 py-4 bg-gradient-to-b from-wine-deep/80 to-transparent pointer-events-none">
        <p className="font-accent text-[9px] tracking-[0.4em] text-champagne text-center">
          CHAPTER {current.roman} — {current.title}
        </p>
      </div>
    </>
  );
}
