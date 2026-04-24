import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config';
import './Navbar.css';

function SnowflakeLogo({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
      <line x1="24" y1="5"  x2="24" y2="43" stroke="#00BCD4" strokeWidth="3.2" strokeLinecap="round"/>
      <line x1="7.2" y1="15" x2="40.8" y2="33" stroke="#00BCD4" strokeWidth="3.2" strokeLinecap="round"/>
      <line x1="40.8" y1="15" x2="7.2" y2="33" stroke="#00BCD4" strokeWidth="3.2" strokeLinecap="round"/>
      <line x1="24"   y1="14" x2="29.2" y2="11"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="24"   y1="14" x2="18.8" y2="11"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="24"   y1="34" x2="29.2" y2="37"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="24"   y1="34" x2="18.8" y2="37"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="32.7" y1="19" x2="37.9" y2="22"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="32.7" y1="19" x2="32.7" y2="13"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="15.3" y1="29" x2="10.1" y2="26"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="15.3" y1="29" x2="15.3" y2="35"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="32.7" y1="29" x2="37.9" y2="26"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="32.7" y1="29" x2="32.7" y2="35"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="15.3" y1="19" x2="10.1" y2="22"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="15.3" y1="19" x2="15.3" y2="13"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="24"   cy="5"  r="2.5" fill="#E0F7FA"/>
      <circle cx="40.8" cy="15" r="2.5" fill="#E0F7FA"/>
      <circle cx="40.8" cy="33" r="2.5" fill="#E0F7FA"/>
      <circle cx="24"   cy="43" r="2.5" fill="#E0F7FA"/>
      <circle cx="7.2"  cy="33" r="2.5" fill="#E0F7FA"/>
      <circle cx="7.2"  cy="15" r="2.5" fill="#E0F7FA"/>
      <circle cx="24" cy="24" r="5" fill="#00BCD4"/>
      <circle cx="24" cy="24" r="2.8" fill="#0D1B2A"/>
    </svg>
  );
}

const NAV_LINKS        = ['services', 'gallery', 'why', 'testimonials', 'contact'];
const MOBILE_NAV_LINKS = ['services', 'gallery', 'testimonials', 'contact'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => { if (!e.target.closest('.navbar')) setMenuOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuOpen]);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="nav-logo" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }}>
        <SnowflakeLogo size={48} />
        <div className="logo-text-block">
          <div className="logo-name">Hari Refrigeration</div>
          <div className="logo-rule" />
          <div className="logo-tagline">{SITE_CONFIG.tagline}</div>
        </div>
      </div>

      {/* Desktop nav links */}
      <div className="nav-links">
        {NAV_LINKS.map(id => (
          <button key={id} className="nav-link" onClick={() => scrollTo(id)}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
      </div>

      {/* Desktop CTA */}
      <button className="nav-cta" onClick={() => scrollTo('contact')}>
        📞 Book Service
      </button>

      {/* Hamburger button — mobile only */}
      <button
        className={`hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>

      {/* Mobile slide-down menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {MOBILE_NAV_LINKS.map(id => (
          <button key={id} className="mobile-nav-link" onClick={() => scrollTo(id)}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
        <a
          href={`tel:${SITE_CONFIG.phone}`}
          className="mobile-call-btn"
          onClick={() => setMenuOpen(false)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          Call Now — {SITE_CONFIG.phone}
        </a>
      </div>

    </nav>
  );
}
