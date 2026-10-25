import React, { useEffect, useRef, useState } from 'react';
import { SITE_CONFIG } from '../config';
import './ReviewCard.css';

// Starting points a happy customer can copy, tweak and paste into Google.
const SUGGESTIONS = [
  'Excellent AC service from Hari Refrigeration! The technician arrived on time, found the problem quickly and my AC is cooling like new. Highly recommended in Navi Mumbai.',
  'Very reliable and honest service. My refrigerator stopped cooling and it was fixed the same day at a fair price. Thank you, Hari Refrigeration!',
  'Professional team with genuine parts and a repair warranty. They explained the issue clearly before starting work. 5 stars!',
  'Got my washing machine repaired by Hari Refrigeration. Quick response, polite technician and no hidden charges. Would definitely call again.',
  'Fast and friendly service at my doorstep in Navi Mumbai. The team knows their work well and cleaned up after the repair. Great experience!',
  'Been using Hari Refrigeration for our AC annual maintenance. Always on time and our appliances run perfectly. Trustworthy service for 20+ years.',
  'My microwave was repaired quickly and works perfectly now. Fair pricing and a very helpful team. Thank you!',
  'Best appliance repair service around CBD Belapur. Same-day visit, quick diagnosis and a long-lasting fix. Highly recommended!',
];

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const t = document.createElement('textarea');
    t.value = text;
    t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    document.execCommand('copy');
    t.remove();
  }
}

export default function ReviewCard() {
  const [idx, setIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const paused = useRef(false);

  // The suggestion changes by itself so each visitor sees different wording
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIdx((i) => (i + 1) % SUGGESTIONS.length);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const url = SITE_CONFIG.reviewUrl || SITE_CONFIG.mapUrl;
  const next = () => { setCopied(false); setIdx((i) => (i + 1) % SUGGESTIONS.length); };

  const copyAndOpen = async () => {
    paused.current = true;
    window.open(url, '_blank', 'noopener,noreferrer'); // open inside the click, before any await
    await copyText(SUGGESTIONS[idx]);
    setCopied(true);
    setTimeout(() => { setCopied(false); paused.current = false; }, 6000);
  };

  return (
    <div
      className="review-card fade-in"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { if (!copied) paused.current = false; }}
    >
      <div className="review-head">
        <span className="review-stars" aria-hidden="true">★★★★★</span>
        <h3>Happy with our service? Rate us!</h3>
      </div>
      <blockquote key={idx} className="review-text">“{SUGGESTIONS[idx]}”</blockquote>

      <div className="review-actions">
        <button className="review-copy" onClick={copyAndOpen}>
          {copied ? '✅ Copied — paste it on Google' : '📋 Copy & open Google review'}
        </button>
        <button className="review-next" onClick={next} aria-label="Show another suggestion">🔄 Another</button>
      </div>
      <p className="review-note">Copy, paste on Google, and edit to match your experience.</p>
    </div>
  );
}
