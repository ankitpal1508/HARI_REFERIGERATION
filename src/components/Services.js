import React, { useEffect, useRef } from 'react';
import { SERVICES } from '../config';
import './Services.css';

// ── Appliance SVG icons — one per service ────────────────────────────────────

function IconAC() {
  return (
    <svg viewBox="0 0 64 52" fill="none" width="58" height="46">
      <rect x="4" y="10" width="56" height="26" rx="7" fill="#E0F7FA" stroke="#0097A7" strokeWidth="2.2"/>
      <rect x="10" y="16" width="16" height="10" rx="3" fill="#B2EBF2"/>
      <circle cx="18" cy="21" r="4" fill="#00BCD4"/>
      <circle cx="18" cy="21" r="2" fill="#fff"/>
      <line className="ac-air" x1="30" y1="17" x2="56" y2="17" stroke="#0097A7" strokeWidth="2" strokeLinecap="round"/>
      <line className="ac-air" x1="30" y1="22" x2="56" y2="22" stroke="#0097A7" strokeWidth="2" strokeLinecap="round"/>
      <line className="ac-air" x1="30" y1="27" x2="56" y2="27" stroke="#0097A7" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18" y1="38" x2="18" y2="46" stroke="#0097A7" strokeWidth="2" strokeLinecap="round"/>
      <line x1="32" y1="38" x2="32" y2="46" stroke="#0097A7" strokeWidth="2" strokeLinecap="round"/>
      <line x1="46" y1="38" x2="46" y2="46" stroke="#0097A7" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="53" cy="18" r="3.5" fill="#00BCD4"/>
    </svg>
  );
}

function IconFridge() {
  return (
    <svg viewBox="0 0 44 70" fill="none" width="38" height="60">
      <rect x="4" y="2" width="36" height="66" rx="6" fill="#E0F7FA" stroke="#00695C" strokeWidth="2.2"/>
      <line x1="4" y1="26" x2="40" y2="26" stroke="#00695C" strokeWidth="2"/>
      <rect className="fr-top" x="4" y="2" width="36" height="24" rx="6" fill="#B2DFDB"/>
      {/* Freezer handle */}
      <line className="ac-air" x1="30" y1="10" x2="30" y2="20" stroke="#00695C" strokeWidth="3" strokeLinecap="round"/>
      {/* Fridge handle */}
      <line className="ac-air" x1="30" y1="36" x2="30" y2="56" stroke="#00695C" strokeWidth="3" strokeLinecap="round"/>
      {/* Inner shelf lines */}
      <line x1="10" y1="44" x2="34" y2="44" stroke="#80CBC4" strokeWidth="1.5" strokeDasharray="3 2"/>
      <line x1="10" y1="54" x2="34" y2="54" stroke="#80CBC4" strokeWidth="1.5" strokeDasharray="3 2"/>
    </svg>
  );
}

function IconWasher() {
  return (
    <svg viewBox="0 0 58 62" fill="none" width="52" height="56">
      <rect x="3" y="3" width="52" height="56" rx="7" fill="#E3F2FD" stroke="#1565C0" strokeWidth="2.2"/>
      {/* Control row */}
      <line x1="11" y1="13" x2="22" y2="13" stroke="#1565C0" strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="41" cy="13" r="4" fill="#42A5F5"/>
      <circle cx="30" cy="13" r="3" fill="#90CAF9"/>
      {/* Door rim */}
      <circle cx="29" cy="37" r="18" fill="#BBDEFB" stroke="#1565C0" strokeWidth="2.2"/>
      {/* Glass window */}
      <circle cx="29" cy="37" r="13" fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5"/>
      {/* Drum highlight */}
      <circle className="wm-drum" cx="29" cy="37" r="7" fill="none" stroke="#90CAF9" strokeWidth="1.5" strokeDasharray="3 2"/>
      <circle cx="29" cy="37" r="2.5" fill="#1565C0"/>
    </svg>
  );
}

function IconMicrowave() {
  return (
    <svg viewBox="0 0 70 48" fill="none" width="64" height="44">
      <rect x="3" y="4" width="64" height="40" rx="7" fill="#F3E5F5" stroke="#6A1B9A" strokeWidth="2.2"/>
      {/* Door */}
      <rect x="8" y="9" width="42" height="30" rx="5" fill="#EDE7F6" stroke="#7B1FA2" strokeWidth="1.8"/>
      {/* Window */}
      <rect className="mw-glass" x="12" y="13" width="34" height="22" rx="3" fill="#F3E5F5"/>
      {/* Turntable */}
      <circle className="mw-turn" cx="29" cy="24" r="9" stroke="#AB47BC" strokeWidth="1.5" strokeDasharray="4 2.5" fill="none"/>
      <circle cx="29" cy="24" r="3" fill="#CE93D8"/>
      {/* Door handle */}
      <line x1="45" y1="17" x2="45" y2="23" stroke="#7B1FA2" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Control panel */}
      <rect x="55" y="9" width="9" height="30" rx="3" fill="#EDE7F6" stroke="#9C27B0" strokeWidth="1"/>
      <rect x="57" y="12" width="5" height="6" rx="1.5" fill="#CE93D8"/>
      <circle cx="59.5" cy="24" r="2.5" fill="#AB47BC"/>
      <circle cx="59.5" cy="31" r="2.5" fill="#CE93D8"/>
    </svg>
  );
}

function IconWaterPurifier() {
  return (
    <svg viewBox="0 0 44 68" fill="none" width="38" height="58">
      <rect x="8" y="2" width="28" height="52" rx="6" fill="#E1F5FE" stroke="#0277BD" strokeWidth="2.2"/>
      {/* Tank */}
      <rect x="12" y="6" width="20" height="22" rx="4" fill="#B3E5FC"/>
      {/* Filters */}
      <rect className="wp-f" x="11" y="32" width="6" height="16" rx="3" fill="#0288D1"/>
      <rect className="wp-f" x="19" y="32" width="6" height="16" rx="3" fill="#03A9F4"/>
      <rect className="wp-f" x="27" y="32" width="6" height="16" rx="3" fill="#4FC3F7"/>
      {/* Output pipe */}
      <line x1="22" y1="54" x2="22" y2="62" stroke="#0277BD" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Tap */}
      <path d="M16 62 Q22 62 28 62" stroke="#0277BD" strokeWidth="3" strokeLinecap="round"/>
      {/* Water drop */}
      <path className="wp-drop" d="M22 64 Q20 66 22 68 Q24 66 22 64Z" fill="#03A9F4"/>
    </svg>
  );
}

function IconChiller() {
  return (
    <svg viewBox="0 0 50 70" fill="none" width="44" height="62">
      <rect x="5" y="4" width="40" height="58" rx="8" fill="#E0F7FA" stroke="#006064" strokeWidth="2.2"/>
      {/* Top panel */}
      <rect x="5" y="4" width="40" height="16" rx="8" fill="#B2EBF2"/>
      {/* Display */}
      <rect x="13" y="8" width="24" height="8" rx="3" fill="#00ACC1"/>
      <line x1="16" y1="12" x2="34" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Water tank */}
      <rect x="13" y="26" width="24" height="28" rx="4" fill="#B2EBF2" stroke="#00838F" strokeWidth="1.5"/>
      {/* Tap */}
      <rect x="19" y="56" width="12" height="4" rx="2" fill="#006064"/>
      <circle cx="25" cy="58" r="2" fill="#00838F"/>
      {/* Water level */}
      <rect className="ch-level" x="14" y="38" width="22" height="15" rx="3" fill="#80DEEA"/>
    </svg>
  );
}

function IconCooler() {
  return (
    <svg viewBox="0 0 58 68" fill="none" width="52" height="60">
      <rect x="4" y="10" width="50" height="50" rx="8" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="2.2"/>
      {/* Top grille */}
      <rect x="4" y="10" width="50" height="12" rx="8" fill="#C8E6C9"/>
      {/* Fan circle */}
      <circle cx="29" cy="38" r="18" fill="#DCEDC8" stroke="#43A047" strokeWidth="2"/>
      {/* Fan blades */}
      <g className="co-fan">
      <path d="M29 20 Q36 29 29 38 Q22 29 29 20Z" fill="#66BB6A" opacity="0.7"/>
      <path d="M47 38 Q38 45 29 38 Q38 31 47 38Z" fill="#66BB6A" opacity="0.7"/>
      <path d="M29 56 Q22 47 29 38 Q36 47 29 56Z" fill="#66BB6A" opacity="0.7"/>
      <path d="M11 38 Q20 31 29 38 Q20 45 11 38Z" fill="#66BB6A" opacity="0.7"/>
      </g>
      {/* Center hub */}
      <circle cx="29" cy="38" r="5" fill="#2E7D32"/>
      <circle cx="29" cy="38" r="2.5" fill="#A5D6A7"/>
      {/* Legs */}
      <line x1="16" y1="60" x2="16" y2="68" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round"/>
      <line x1="42" y1="60" x2="42" y2="68" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

function IconMaintenance() {
  return (
    <svg viewBox="0 0 60 60" fill="none" width="54" height="54">
      {/* Wrench */}
      <g className="mt-tool">
      <path d="M10 50 L32 28 Q38 18 46 16 Q42 22 44 28 L22 50 Q16 56 10 50Z"
        fill="#FFF9C4" stroke="#F57F17" strokeWidth="2.2" strokeLinejoin="round"/>
      <circle cx="45" cy="17" r="8" fill="none" stroke="#F9A825" strokeWidth="2.2"/>
      <circle cx="11" cy="49" r="5" fill="none" stroke="#F57F17" strokeWidth="2"/>
      {/* Screwdriver */}
      <line x1="44" y1="14" x2="20" y2="38" stroke="#FFB300" strokeWidth="4" strokeLinecap="round"/>
      <rect x="15" y="36" width="10" height="7" rx="2"
        fill="#FF8F00" transform="rotate(-45 20 39)"/>
      </g>
      {/* Gear */}
      <g className="mt-gear">
      <circle cx="46" cy="44" r="10" fill="#FFF9C4" stroke="#F57F17" strokeWidth="2"/>
      <circle cx="46" cy="44" r="5" fill="#FFB300"/>
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const r = deg * Math.PI / 180;
        return <rect key={i}
          x={46 + 8*Math.cos(r) - 2} y={44 + 8*Math.sin(r) - 2.5}
          width="4" height="5" rx="1"
          fill="#F57F17"
          transform={`rotate(${deg} ${46 + 8*Math.cos(r)} ${44 + 8*Math.sin(r)})`}/>;
      })}
      </g>
    </svg>
  );
}

// Ordered to match SERVICES array in config.js
const SERVICE_ICONS = [
  <IconAC />,
  <IconFridge />,
  <IconWasher />,
  <IconMicrowave />,
  <IconWaterPurifier />,
  <IconChiller />,
  <IconCooler />,
  <IconMaintenance />,
];

// Per-card identity: CSS hook, accent colour and what the click burst throws out
const KINDS = ['ac', 'fridge', 'washer', 'mw', 'purifier', 'chiller', 'cooler', 'maint'];
const ACCENTS = ['#0097A7', '#00695C', '#1565C0', '#7B1FA2', '#0288D1', '#00838F', '#2E7D32', '#F57F17'];
const BURSTS = [
  { emoji: ['❄️', '💨', '❄️'], mode: 'rise' },
  { emoji: ['🧊', '❄️'],       mode: 'radial' },
  { emoji: ['🫧', '💧', '🫧'], mode: 'rise' },
  { emoji: ['✨', '🔥', '✨'], mode: 'radial' },
  { emoji: ['💧', '💦'],       mode: 'fall' },
  { emoji: ['🧊', '💦'],       mode: 'radial' },
  { emoji: ['🍃', '💨', '🍃'], mode: 'side' },
  { emoji: ['⚙️', '🔧', '✨'], mode: 'radial' },
];

const rand = (a, b) => a + Math.random() * (b - a);
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function spawn(card, cls, x, y, style = {}, text = '') {
  const el = document.createElement('span');
  el.className = cls;
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  Object.entries(style).forEach(([k, v]) => el.style.setProperty(k, v));
  el.addEventListener('animationend', () => el.remove());
  card.appendChild(el);
}

function burst(card, i, x, y) {
  spawn(card, 'svc-ripple', x, y);
  if (card.querySelectorAll('.svc-particle').length > 36) return;
  const { emoji, mode } = BURSTS[i];
  for (let n = 0; n < 12; n++) {
    const a = rand(0, Math.PI * 2);
    const d = rand(50, 110);
    let dx = Math.cos(a) * d, dy = Math.sin(a) * d;
    if (mode === 'rise') { dx = rand(-45, 45); dy = -rand(60, 140); }
    if (mode === 'fall') { dx = rand(-30, 30); dy = rand(60, 140); }
    if (mode === 'side') { dx = rand(70, 180); dy = rand(-25, 25); }
    spawn(card, 'svc-particle', x, y, {
      '--dx': `${dx}px`, '--dy': `${dy}px`, '--rot': `${rand(-200, 200)}deg`,
      fontSize: `${rand(14, 24)}px`, animationDelay: `${rand(0, 0.12)}s`,
    }, emoji[n % emoji.length]);
  }
}

export default function Services() {
  const ref = useRef();
  const timers = useRef(new WeakMap());

  useEffect(() => {
    const obs = new IntersectionObserver(
      e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Scroll-linked card depth: --sp is -1 (card entering/leaving) … 0 (centred) … 1,
  // consumed by the parallax + light-sweep rules in Services.css
  useEffect(() => {
    const root = ref.current;
    const cards = [...root.querySelectorAll('.svc')];
    let inView = false, raf = 0;
    const update = () => {
      raf = 0;
      const h = window.innerHeight;
      cards.forEach(c => {
        const r = c.getBoundingClientRect();
        const sp = Math.max(-1, Math.min(1, (r.top + r.height / 2 - h / 2) / (h / 2)));
        c.style.setProperty('--sp', sp.toFixed(3));
      });
    };
    const onScroll = () => { if (inView && !raf) raf = requestAnimationFrame(update); };
    const vis = new IntersectionObserver(([e]) => { inView = e.isIntersecting; onScroll(); });
    vis.observe(root);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      vis.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onEnter = (e) => { if (e.pointerType === 'mouse') e.currentTarget.classList.add('is-hover'); };

  // Cursor drives a 3D tilt, a spotlight and a small "magnet" pull on the icon
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || reduceMotion()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.setProperty('--rx', `${((0.5 - py) * 14).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${((px - 0.5) * 14).toFixed(2)}deg`);
    el.style.setProperty('--ix', `${((px - 0.5) * 12).toFixed(1)}px`);
    el.style.setProperty('--iy', `${((py - 0.5) * 12).toFixed(1)}px`);
  };

  const onLeave = (e) => {
    const el = e.currentTarget;
    el.classList.remove('is-hover', 'is-press');
    ['--rx', '--ry', '--ix', '--iy'].forEach(k => el.style.removeProperty(k));
  };

  // Click: the appliance "switches on" (intense icon animation) and throws themed particles
  const onDown = (e, i) => {
    const el = e.currentTarget;
    el.classList.add('is-press');
    if (reduceMotion()) return;
    const r = el.getBoundingClientRect();
    burst(el, i, e.clientX - r.left, e.clientY - r.top);
    el.classList.remove('is-active');
    void el.offsetWidth; // restart the icon animations on rapid clicks
    el.classList.add('is-active');
    clearTimeout(timers.current.get(el));
    timers.current.set(el, setTimeout(() => el.classList.remove('is-active'), 1400));
  };

  const onUp = (e) => e.currentTarget.classList.remove('is-press');

  return (
    <div id="services" className="services-bg">
      <div className="services-inner" ref={ref}>
        <div className="fade-in">
          <div className="section-label">What We Fix</div>
          <div className="section-title">Our Repair Services</div>
          <div className="divider" />
        </div>
        <div className="swipe-hint">swipe to explore →</div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`svc svc--${KINDS[i]} fade-in`}
              style={{ '--accent': ACCENTS[i] }}
              onPointerEnter={onEnter}
              onPointerMove={onMove}
              onPointerLeave={onLeave}
              onPointerDown={(e) => onDown(e, i)}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <div className="svc-icon">
                {SERVICE_ICONS[i] || <span style={{ fontSize: '2.8rem' }}>{s.icon}</span>}
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
