import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GALLERY } from '../config';
import './Gallery.css';

/* ── SVG Illustrated fallback icons ──────────────────────────────────────── */
function AcIcon({ color }) {
  return (
    <svg viewBox="0 0 56 40" width="54" height="38" fill="none">
      <rect x="4" y="7" width="48" height="22" rx="6" stroke={color} strokeWidth="2.5"/>
      <rect x="8" y="12" width="12" height="8" rx="2" fill={color} opacity="0.2"/>
      <circle cx="14" cy="16" r="3.5" fill={color} opacity="0.8"/>
      <line x1="24" y1="12" x2="48" y2="12" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="24" y1="16" x2="48" y2="16" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="24" y1="20" x2="48" y2="20" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="15" y1="29" x2="15" y2="35" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="29" x2="28" y2="35" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="41" y1="29" x2="41" y2="35" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function FridgeIcon({ color }) {
  return (
    <svg viewBox="0 0 34 56" width="30" height="50" fill="none">
      <rect x="3" y="2" width="28" height="52" rx="5" stroke={color} strokeWidth="2.5"/>
      <line x1="3" y1="22" x2="31" y2="22" stroke={color} strokeWidth="2"/>
      <line x1="24" y1="11" x2="24" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="24" y1="30" x2="24" y2="40" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="10" cy="14" r="2.2" fill={color} opacity="0.5"/>
    </svg>
  );
}
function GasPumpIcon({ color }) {
  return (
    <svg viewBox="0 0 56 56" width="52" height="52" fill="none">
      <circle cx="22" cy="24" r="16" stroke={color} strokeWidth="2.5"/>
      <circle cx="22" cy="24" r="10" stroke={color} strokeWidth="1.2" opacity="0.4"/>
      <line x1="22" y1="24" x2="31" y2="14" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="22" cy="24" r="3" fill={color}/>
      <path d="M22 40 Q22 48 34 48 Q46 48 46 38" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <rect x="38" y="20" width="14" height="22" rx="3" stroke={color} strokeWidth="2"/>
    </svg>
  );
}
function MicrowaveIcon({ color }) {
  return (
    <svg viewBox="0 0 56 36" width="54" height="35" fill="none">
      <rect x="2" y="3" width="52" height="30" rx="5" stroke={color} strokeWidth="2.5"/>
      <rect x="6" y="7" width="34" height="22" rx="3" stroke={color} strokeWidth="1.5"/>
      <circle cx="23" cy="18" r="7" stroke={color} strokeWidth="1.5" strokeDasharray="3.5 2.5"/>
      <circle cx="23" cy="18" r="2.5" fill={color} opacity="0.6"/>
      <line x1="44" y1="10" x2="50" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="44" y1="15" x2="50" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="44" y1="20" x2="50" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function WasherIcon({ color }) {
  return (
    <svg viewBox="0 0 52 56" width="48" height="52" fill="none">
      <rect x="3" y="3" width="46" height="50" rx="6" stroke={color} strokeWidth="2.5"/>
      <circle cx="26" cy="34" r="15" stroke={color} strokeWidth="2"/>
      <circle cx="26" cy="34" r="9" stroke={color} strokeWidth="1.3" strokeDasharray="3 2" opacity="0.5"/>
      <circle cx="26" cy="34" r="3" fill={color} opacity="0.7"/>
      <line x1="11" y1="12" x2="20" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="36" cy="12" r="3.5" fill={color} opacity="0.6"/>
    </svg>
  );
}

const TYPE_META = {
  'ac':                { Icon: AcIcon,        ringBg: '#E0F7FA', color: '#0097A7', title: 'Air Conditioner' },
  'gas-pump':          { Icon: GasPumpIcon,   ringBg: '#E3F2FD', color: '#1565C0', title: 'AC Gas Charging' },
  'fridge-repair':     { Icon: FridgeIcon,    ringBg: '#E0F2F1', color: '#00695C', title: 'Fridge Repair' },
  'microwave':         { Icon: MicrowaveIcon, ringBg: '#FBE9E7', color: '#BF360C', title: 'Microwave Oven' },
  'commercial-fridge': { Icon: FridgeIcon,    ringBg: '#E0F2F1', color: '#00695C', title: 'Refrigerator' },
  'washing':           { Icon: WasherIcon,    ringBg: '#E8EAF6', color: '#283593', title: 'Washing Machine' },
};

function GalleryCard({ item }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [inView, setInView]       = useState(false);
  const cardRef = useRef();
  const showIllustration = !item.url || imgFailed;
  const meta = TYPE_META[item.type] || TYPE_META['ac'];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.55 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`gallery-card${inView ? ' in-view' : ''}`} ref={cardRef}>
      {/* Service type badge — always visible top-left */}
      <div className="gallery-card-tag">{item.label}</div>

      {showIllustration ? (
        <div className="gallery-card-illustration">
          <div className="gallery-card-dots" />
          <div className="gallery-card-glow" />
          <div className="gallery-icon-ring" style={{ background: meta.ringBg }}>
            {meta.Icon && <meta.Icon color={meta.color} />}
          </div>
          <div className="gallery-card-name">{meta.title}</div>
          <div className="gallery-card-badge">Professional Service</div>
        </div>
      ) : (
        <img
          src={item.url}
          alt={item.label}
          onError={() => setImgFailed(true)}
          loading="lazy"
          className="gallery-card-img"
          draggable="false"
        />
      )}

      {/* Caption overlay — desktop: hover | mobile: scroll-triggered */}
      <div className="gallery-card-caption">
        <div className="gallery-caption-label">{item.label}</div>
        <div className="gallery-caption-location">📍 {item.caption.split('—')[1]?.trim() || item.caption}</div>
      </div>
    </div>
  );
}

const CARD_W = 318; // card width (300) + gap (18)
const DOUBLED = [...GALLERY, ...GALLERY];
const SCROLL_PAUSE_MS = 800; // pause RAF this long after arrow click

export default function Gallery() {
  const outerRef     = useRef(null);
  const isDragging   = useRef(false);  // also used to pause RAF during arrow scroll
  const startX       = useRef(0);
  const startScroll  = useRef(0);
  const rafRef       = useRef(null);
  const resumeTimer  = useRef(null);   // clears RAF-pause timeout
  const [activeDot, setActiveDot] = useState(0);

  /* ── RAF auto-scroll — paused while isDragging is true ── */
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const tick = () => {
      if (!isDragging.current) {
        el.scrollLeft += 0.9;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Active dot tracker ── */
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / CARD_W) % GALLERY.length;
      setActiveDot(Math.max(0, idx));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Pause RAF helper — stops auto-scroll for SCROLL_PAUSE_MS ── */
  const pauseAutoScroll = () => {
    isDragging.current = true;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      isDragging.current = false;
    }, SCROLL_PAUSE_MS);
  };

  /* ── Mouse drag ── */
  const onMouseDown = (e) => {
    isDragging.current = true;
    clearTimeout(resumeTimer.current);
    startX.current     = e.pageX;
    startScroll.current = outerRef.current.scrollLeft;
    outerRef.current.style.cursor = 'grabbing';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    outerRef.current.scrollLeft = startScroll.current + (startX.current - e.pageX);
  };
  const onMouseUp = () => {
    /* After user releases, let auto-scroll resume after short delay */
    resumeTimer.current = setTimeout(() => {
      isDragging.current = false;
    }, 300);
    if (outerRef.current) outerRef.current.style.cursor = 'grab';
  };

  /* ── Arrow navigation — pause RAF so smooth scroll isn't overridden ── */
  const scrollBy = useCallback((dir) => {
    const el = outerRef.current;
    if (!el) return;
    pauseAutoScroll();
    let next = el.scrollLeft + dir * CARD_W;
    if (next >= el.scrollWidth / 2) next -= el.scrollWidth / 2;
    if (next < 0)                   next += el.scrollWidth / 2;
    el.scrollTo({ left: next, behavior: 'smooth' });
  }, []); // deps intentionally empty — refs are stable

  /* ── Dot click ── */
  const goToDot = useCallback((i) => {
    const el = outerRef.current;
    if (!el) return;
    pauseAutoScroll();
    const half = el.scrollWidth / 2;
    const base = Math.floor(el.scrollLeft / half) * half;
    el.scrollTo({ left: base + i * CARD_W, behavior: 'smooth' });
  }, []); // deps intentionally empty — refs are stable

  return (
    <div id="gallery" className="gallery-bg">
      <div className="gallery-header-wrap">
        <div className="section-label">Our Work</div>
        <div className="gallery-title">Field Gallery</div>
        <div className="gallery-divider" />
        <p className="gallery-sub">
          Real jobs from customer homes, offices &amp; shops across Navi Mumbai.
        </p>
      </div>

      {/* ── Left arrow | Scroller | Right arrow ── */}
      <div className="gallery-stage">

        <button
          className="gallery-arrow"
          onClick={() => scrollBy(-1)}
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div
          ref={outerRef}
          className="gallery-ticker-outer"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div className="gallery-ticker-track">
            {DOUBLED.map((item, i) => (
              <GalleryCard key={i} item={item} />
            ))}
          </div>
        </div>

        <button
          className="gallery-arrow"
          onClick={() => scrollBy(1)}
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

      </div>

      {/* ── Dot indicators ── */}
      <div className="gallery-dots">
        {GALLERY.map((_, i) => (
          <button
            key={i}
            className={`gallery-dot${activeDot === i ? ' active' : ''}`}
            onClick={() => goToDot(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
