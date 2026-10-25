import React, { useEffect, useRef } from 'react';
import { WHY_US } from '../config';
import './WhyUs.css';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Soft glowing circle that expands from the pointer and fades (styled in WhyUs.css)
function bloom(card, e, cls) {
  const r = card.getBoundingClientRect();
  const el = document.createElement('span');
  el.className = cls;
  el.style.left = `${e.clientX - r.left}px`;
  el.style.top = `${e.clientY - r.top}px`;
  el.addEventListener('animationend', () => el.remove());
  card.appendChild(el);
}

export default function WhyUs() {
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const onEnter = (e) => {
    if (e.pointerType !== 'mouse') return;
    e.currentTarget.classList.add('is-hover');
    if (!reduceMotion()) bloom(e.currentTarget, e, 'why-bloom');
  };

  // Cursor drives a 3D tilt, the spotlight and a small pull on the number
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || reduceMotion()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.setProperty('--rx', `${((0.5 - py) * 10).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${((px - 0.5) * 10).toFixed(2)}deg`);
    el.style.setProperty('--nx', `${((px - 0.5) * 14).toFixed(1)}px`);
    el.style.setProperty('--ny', `${((py - 0.5) * 10).toFixed(1)}px`);
  };

  const onLeave = (e) => {
    const el = e.currentTarget;
    el.classList.remove('is-hover', 'is-press');
    ['--rx', '--ry', '--nx', '--ny'].forEach(k => el.style.removeProperty(k));
  };

  const onDown = (e) => {
    e.currentTarget.classList.add('is-press');
    if (!reduceMotion()) bloom(e.currentTarget, e, 'why-bloom why-bloom--click');
  };

  return (
    <section id="why" className="why-section" ref={ref}>
      <div className="fade-in">
        <div className="section-label">Why Choose Us</div>
        <div className="section-title">Trusted by 10,000+ Families &amp; Businesses</div>
        <div className="divider" />
      </div>
      <div className="why-grid">
        {WHY_US.map((w, i) => (
          <div
            key={i}
            className="why-card fade-in"
            onPointerEnter={onEnter}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            onPointerDown={onDown}
            onPointerUp={(e) => e.currentTarget.classList.remove('is-press')}
          >
            <div className="why-num">{w.num}</div>
            <h4>{w.title}</h4>
            <p>{w.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
