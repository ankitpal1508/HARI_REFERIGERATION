import React, { useEffect, useRef } from 'react';
import { WHY_US } from '../config';
import './WhyUs.css';

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

  return (
    <section id="why" className="why-section" ref={ref}>
      <div className="fade-in">
        <div className="section-label">Why Choose Us</div>
        <div className="section-title">Trusted by 10,000+ Families &amp; Businesses</div>
        <div className="divider" />
      </div>
      <div className="why-grid">
        {WHY_US.map((w, i) => (
          <div key={i} className="why-card fade-in">
            <div className="why-num">{w.num}</div>
            <h4>{w.title}</h4>
            <p>{w.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
