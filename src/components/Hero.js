import React, { useEffect, useRef, useState } from 'react';
import { SITE_CONFIG, SERVICES } from '../config';
import './Hero.css';

function StatCounter({ number, label, visible }) {
  const [val, setVal] = useState(0);
  const raw = Number.parseInt(number.replaceAll(/\D/g, ''), 10);
  const suffix = number.replace(/^\d+/, '');

  useEffect(() => {
    if (!visible || Number.isNaN(raw)) return;
    const duration = 1800;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(raw * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, raw]);

  let display;
  if (!visible) {
    display = number;
  } else if (raw >= 1000) {
    display = val.toLocaleString('en-IN') + suffix;
  } else {
    display = val + suffix;
  }

  return (
    <div className="stat-item">
      <div className="stat-num">{display}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// SVG appliance icons for the 4 main service cards
function AcSvg({ color }) {
  return (
    <svg viewBox="0 0 56 40" width="52" height="37" fill="none">
      <rect x="4" y="7" width="48" height="22" rx="6" stroke={color} strokeWidth="2.5" fill="none"/>
      <rect x="8" y="12" width="12" height="8" rx="2" fill={color} opacity="0.2"/>
      <circle cx="14" cy="16" r="3.5" fill={color} opacity="0.7"/>
      <line x1="24" y1="12" x2="48" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="24" y1="16" x2="48" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="24" y1="20" x2="48" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="15" y1="29" x2="15" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="29" x2="28" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="41" y1="29" x2="41" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function FridgeSvg({ color }) {
  return (
    <svg viewBox="0 0 34 56" width="30" height="50" fill="none">
      <rect x="3" y="2" width="28" height="52" rx="5" stroke={color} strokeWidth="2.5" fill="none"/>
      <line x1="3" y1="22" x2="31" y2="22" stroke={color} strokeWidth="2"/>
      <line x1="24" y1="11" x2="24" y2="18" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="24" y1="30" x2="24" y2="40" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="10" cy="14" r="2" fill={color} opacity="0.4"/>
    </svg>
  );
}

function WasherSvg({ color }) {
  return (
    <svg viewBox="0 0 44 48" width="40" height="44" fill="none">
      <rect x="2" y="2" width="40" height="44" rx="5" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="22" cy="30" r="12" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="22" cy="30" r="6" stroke={color} strokeWidth="1.5" strokeDasharray="3.5 2.5" fill="none"/>
      <line x1="8" y1="9" x2="14" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="33" cy="9" r="2.5" fill={color} opacity="0.5"/>
    </svg>
  );
}

function MicrowaveSvg({ color }) {
  return (
    <svg viewBox="0 0 56 36" width="52" height="34" fill="none">
      <rect x="2" y="3" width="52" height="30" rx="5" stroke={color} strokeWidth="2.5" fill="none"/>
      <rect x="6" y="7" width="34" height="22" rx="3" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="23" cy="18" r="7" stroke={color} strokeWidth="1.5" strokeDasharray="3.5 2.5" fill="none"/>
      <line x1="44" y1="10" x2="50" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="44" y1="15" x2="50" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="44" y1="20" x2="50" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="36" y1="29" x2="36" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// Card metadata — color, bg, icon component for 4 main service cards
const CARD_META = [
  { color: '#0097A7', bg: '#E0F7FA', Icon: AcSvg },
  { color: '#1565C0', bg: '#E3F2FD', Icon: FridgeSvg },
  { color: '#00695C', bg: '#E0F2F1', Icon: WasherSvg },
  { color: '#BF360C', bg: '#FBE9E7', Icon: MicrowaveSvg },
];

export default function Hero() {
  const ref = useRef();
  const statsRef = useRef();
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.4 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="hero-wrapper" ref={ref}>
      <div className="hero">

        {/* ── LEFT: copy ── */}
        <div className="hero-content fade-in">
          <div className="hero-badge">⭐ Navi Mumbai's Trusted Repair Experts Since 2004</div>

          <h1>
            Fast &amp; Reliable<br/>
            <span className="accent">Appliance Repair</span><br/>
            at Your Doorstep
          </h1>

          <p className="hero-desc">
            Certified technicians for AC, Refrigerator, Washing Machine,
            Microwave &amp; more — across all of Navi Mumbai.
          </p>

          <ul className="hero-features">
            <li><span className="hero-check">✓</span> Same-day service available</li>
            <li><span className="hero-check">✓</span> All major brands covered</li>
            <li><span className="hero-check">✓</span> Genuine parts + repair warranty</li>
          </ul>

          <div className="hero-btns">
            <a className="btn-primary" href="tel:+918850909842">
              📞 Call Now — 88509 09842
            </a>
            <button className="btn-outline"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              View Services
            </button>
          </div>

          <div className="hero-stats" ref={statsRef}>
            {SITE_CONFIG.stats.map((s, i) => (
              <StatCounter key={i} number={s.number} label={s.label} visible={statsVisible} />
            ))}
          </div>
        </div>

        {/* ── RIGHT: service cards panel ── */}
        <div className="hero-visual fade-in">
          <div className="panel-header">
            <span className="panel-dot" />
            <span className="panel-title">Our Services</span>
          </div>

          <div className="mini-grid">
            {SERVICES.slice(0, 4).map((s, i) => {
              const meta = CARD_META[i];
              const shortDesc = s.desc.split('.')[0];
              return (
                <div key={i} className="mini-card">
                  <div className="mini-icon-ring" style={{ background: meta.bg }}>
                    <meta.Icon color={meta.color} />
                  </div>
                  <div className="mini-card-name">{s.title}</div>
                  <div className="mini-card-desc">{shortDesc}</div>
                </div>
              );
            })}
          </div>

          <div className="panel-footer">
            <span>+{SERVICES.length - 4} more services</span>
            <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              View All →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
