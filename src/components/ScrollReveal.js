import { useEffect } from 'react';

// Sections that don't reveal themselves: [selector, variant, stagger in seconds].
// Elements are tagged with data-rv and animated by the rules in index.css.
// .section-label / .divider are excluded because index.css animates them on a
// scroll timeline of their own.
const SKIP = ':not(.section-label):not(.divider):not(.gallery-divider):not(.remotes-divider)';
const RULES = [
  [`.gallery-header-wrap > *${SKIP}`,  'up',    0.1],
  ['.gallery-stage',                    'zoom',  0],
  [`.testi-header > *${SKIP}`,         'up',    0.1],
  ['.testi-ticker-outer',              'rise',  0],
  [`.brands-header > *${SKIP}`,        'up',    0.1],
  ['.brands-stage',                    'zoom',  0],
  ['.brands-copyright',                'up',    0],
  [`.remotes-head > *${SKIP}`,         'up',    0.1],
  ['.remotes-badge',                   'fan',   0.14],
  ['.footer-logo-block',               'left',  0],
  ['.footer-link',                     'up',    0.07],
  ['.footer-bottom > *',               'up',    0.1],
];

export default function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('rv-in');
        io.unobserve(e.target);
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    // Lazy sections mount after load, so rescan whenever the DOM grows
    const scan = () => {
      RULES.forEach(([sel, variant, step]) => {
        let n = 0;
        document.querySelectorAll(`${sel}:not([data-rv])`).forEach((el) => {
          el.dataset.rv = variant;
          el.style.setProperty('--rv-d', `${(n++ * step).toFixed(2)}s`);
          io.observe(el);
        });
      });
    };
    let raf = 0;
    const mo = new MutationObserver(() => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; scan(); });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    scan();

    return () => { mo.disconnect(); io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return null;
}
