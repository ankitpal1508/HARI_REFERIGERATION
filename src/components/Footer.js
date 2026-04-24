import React from 'react';
import { SITE_CONFIG } from '../config';
import './Footer.css';

function FooterSnowflake() {
  return (
    <svg viewBox="0 0 48 48" width="36" height="36" fill="none">
      {/* ── 3 axes = 6 arms ── */}
      <line x1="24" y1="5"  x2="24" y2="43" stroke="#00BCD4" strokeWidth="3.2" strokeLinecap="round"/>
      <line x1="7.2" y1="15" x2="40.8" y2="33" stroke="#00BCD4" strokeWidth="3.2" strokeLinecap="round"/>
      <line x1="40.8" y1="15" x2="7.2" y2="33" stroke="#00BCD4" strokeWidth="3.2" strokeLinecap="round"/>

      {/* ── Branches — UP arm ── */}
      <line x1="24"   y1="14" x2="29.2" y2="11"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="24"   y1="14" x2="18.8" y2="11"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      {/* ── Branches — DOWN arm ── */}
      <line x1="24"   y1="34" x2="29.2" y2="37"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="24"   y1="34" x2="18.8" y2="37"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>

      {/* ── Branches — UR arm ── */}
      <line x1="32.7" y1="19" x2="37.9" y2="22"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="32.7" y1="19" x2="32.7" y2="13"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      {/* ── Branches — LL arm ── */}
      <line x1="15.3" y1="29" x2="10.1" y2="26"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="15.3" y1="29" x2="15.3" y2="35"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>

      {/* ── Branches — LR arm ── */}
      <line x1="32.7" y1="29" x2="37.9" y2="26"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="32.7" y1="29" x2="32.7" y2="35"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      {/* ── Branches — UL arm ── */}
      <line x1="15.3" y1="19" x2="10.1" y2="22"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="15.3" y1="19" x2="15.3" y2="13"   stroke="#4DD0E1" strokeWidth="2.2" strokeLinecap="round"/>

      {/* ── Tip crystals ── */}
      <circle cx="24"   cy="5"  r="2.5" fill="#E0F7FA"/>
      <circle cx="40.8" cy="15" r="2.5" fill="#E0F7FA"/>
      <circle cx="40.8" cy="33" r="2.5" fill="#E0F7FA"/>
      <circle cx="24"   cy="43" r="2.5" fill="#E0F7FA"/>
      <circle cx="7.2"  cy="33" r="2.5" fill="#E0F7FA"/>
      <circle cx="7.2"  cy="15" r="2.5" fill="#E0F7FA"/>

      {/* ── Center ── */}
      <circle cx="24" cy="24" r="5" fill="#00BCD4"/>
      <circle cx="24" cy="24" r="2.8" fill="#0D1B2A"/>
    </svg>
  );
}

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-logo-block">
            <FooterSnowflake />
            <div className="footer-logo-text">
              <div className="footer-logo-name">{SITE_CONFIG.businessName}</div>
              <div className="footer-logo-rule" />
              <div className="footer-logo-tagline">{SITE_CONFIG.tagline}</div>
            </div>
          </div>
          <div className="footer-links">
            {['services','gallery','why','testimonials','contact'].map(id => (
              <button key={id} className="footer-link" onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.businessName}, {SITE_CONFIG.location}. All rights reserved.</p>
          <p className="footer-sub">Serving Navi Mumbai since {SITE_CONFIG.foundedYear} · Licensed &amp; Insured Technicians</p>
          <p className="footer-copy">
            All brand names, logos, and trademarks are the property of their respective owners.
            Used solely for service identification. Hari Refrigeration is an independent service provider,
            not affiliated with or endorsed by any listed brand.
          </p>
        </div>
      </div>

      {/* Call floating button */}
      <a
        className="call-float"
        href={`tel:${SITE_CONFIG.phone}`}
        aria-label="Call us"
        title="Call Hari Refrigeration"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="26" height="26">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </a>

      {/* WhatsApp floating button */}
      <a
        className="whatsapp-float"
        href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${SITE_CONFIG.whatsappMsg}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  );
}
