import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const ref = useRef();

  useEffect(() => {
    let raf = 0;
    let lastHero = -1;
    const root = document.documentElement;
    const update = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;

      // 0 → 1 over the first viewport; drives the hero parallax in Hero.css
      const hero = Math.min(window.scrollY / window.innerHeight, 1);
      if (hero !== lastHero) {
        lastHero = hero;
        root.style.setProperty('--hero-p', hero.toFixed(4));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}
