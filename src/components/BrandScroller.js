import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BRANDS_ALL } from '../config';
import './BrandScroller.css';

function BrandLogoCard({ brand }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="logo-card" style={{ borderColor: brand.color + '44' }}>
      {brand.domain && !failed ? (
        <>
          <img
            src={`https://logo.clearbit.com/${brand.domain}`}
            alt={brand.name}
            className="brand-logo-img"
            onError={() => setFailed(true)}
            loading="lazy"
            draggable="false"
          />
          <span className="brand-logo-name" style={{ color: brand.color }}>{brand.name}</span>
        </>
      ) : (
        <div className="brand-logo-fallback" style={{ color: brand.color, borderColor: brand.color }}>
          {brand.name}
        </div>
      )}
    </div>
  );
}

const DOUBLED = [...BRANDS_ALL, ...BRANDS_ALL];
const CARD_W = 150; // card min-width + gap

const PAUSE_MS = 800;

export default function BrandScroller() {
  const outerRef    = useRef(null);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const startScroll = useRef(0);
  const rafRef      = useRef(null);
  const resumeTimer = useRef(null);

  // ── RAF auto-scroll ──
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const tick = () => {
      if (!isDragging.current) {
        el.scrollLeft += 0.7;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const pauseAutoScroll = () => {
    isDragging.current = true;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { isDragging.current = false; }, PAUSE_MS);
  };

  // ── Mouse drag ──
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
    resumeTimer.current = setTimeout(() => { isDragging.current = false; }, 300);
    if (outerRef.current) outerRef.current.style.cursor = 'grab';
  };

  // ── Arrow navigation — pause RAF so smooth scroll isn't overridden ──
  const scrollBy = useCallback((dir) => {
    const el = outerRef.current;
    if (!el) return;
    pauseAutoScroll();
    let next = el.scrollLeft + dir * CARD_W * 3;
    if (next >= el.scrollWidth / 2) next -= el.scrollWidth / 2;
    if (next < 0) next += el.scrollWidth / 2;
    el.scrollTo({ left: next, behavior: 'smooth' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="brands-section">
      <div className="brands-header">
        <div className="section-label" style={{ color: 'var(--cold)' }}>Trusted by All Major Brands</div>
        <div className="section-title brands-title">Brands We Service</div>
        <div className="divider" />
        <p className="brands-sub">
          Expert repair for every major AC, Refrigerator &amp; Washing Machine brand.
        </p>
      </div>

      {/* ── Ticker with arrows ── */}
      <div className="brands-stage">
        <button className="brands-arrow" onClick={() => scrollBy(-1)} aria-label="Previous brands">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          ref={outerRef}
          className="brands-ticker-outer"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div className="brands-ticker-track">
            {DOUBLED.map((brand, i) => (
              <BrandLogoCard key={`${brand.name}-${i}`} brand={brand} />
            ))}
          </div>
        </div>

        <button className="brands-arrow" onClick={() => scrollBy(1)} aria-label="Next brands">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <p className="brands-copyright">
        All brand names, logos, and trademarks displayed above are the property of their respective owners.
        They are used solely for the purpose of identifying the products we service.
        Hari Refrigeration is an independent service provider and is not affiliated with or endorsed by any of the listed brands.
      </p>
    </section>
  );
}
