import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config';
import './BookingNudge.css';

export default function BookingNudge() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed) setVisible(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  const dismiss = (e) => {
    e.stopPropagation();
    setDismissed(true);
    setVisible(false);
  };

  const bookNow = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  if (!visible) return null;

  return (
    <div className="booking-nudge" role="banner">
      <span className="nudge-text">⚡ Same-day service available</span>
      <div className="nudge-actions">
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${SITE_CONFIG.whatsappMsg}`}
          className="nudge-wa"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
        >
          WhatsApp
        </a>
        <button className="nudge-book" onClick={bookNow}>Book Now</button>
      </div>
      <button className="nudge-close" onClick={dismiss} aria-label="Dismiss">✕</button>
    </div>
  );
}
