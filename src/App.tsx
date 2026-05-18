import { useState, useEffect } from 'react';
import Envelope from './components/Envelope';
import MainSite from './components/MainSite';

export default function App() {
  const stage = 'content';
  const [scrollLocked, setScrollLocked] = useState(true);

  useEffect(() => {
    if (scrollLocked) {
      document.body.style.overflow = 'hidden';
      // Force top alignment during door and locked stages
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [scrollLocked]);

  return (
    <>
      {stage === 'content' && (
        <div className="relative w-full">
          {/* Section 1: Cinematic Envelope fold at the top */}
          <div className="relative w-full min-h-screen">
            <Envelope onCardRevealed={() => {
              // Wait 4 seconds for the guest to admire the luxurious invitation card,
              // then unlock scroll and automatically slide down to the rest of the sections.
              setTimeout(() => {
                setScrollLocked(false);
                setTimeout(() => {
                  const heroEl = document.getElementById('hero-section');
                  if (heroEl) {
                    heroEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({
                      top: window.innerHeight,
                      behavior: 'smooth'
                    });
                  }
                }, 100);
              }, 4000);
            }} />
          </div>

          {/* Section 2: Main Website Content Sections */}
          <MainSite visible={true} />
        </div>
      )}
    </>
  );
}
