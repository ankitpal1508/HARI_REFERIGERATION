import React, { useEffect, useRef } from 'react';
import './CursorFX.css';

const COLORS = ['#00BCD4', '#4DD0E1', '#E0F7FA', '#FFA726'];
const INTERACTIVE = 'a, button, [role="button"], label, select, .svc, .why-card, .gallery-dot';
const TEXTUAL = 'input, textarea';

// Site-wide cursor: a trailing ring that reacts to what it is over, a frost
// sparkle trail and a burst on click. Mouse only; skipped for touch / reduced motion.
export default function CursorFX() {
  const ringRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;

    const ring = ringRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const mouse = { x: -100, y: -100, px: -100, py: -100 };
    const pos = { x: -100, y: -100 };
    const flakes = [];
    let raf = 0, idleFrames = 0;
    let selecting = false;           // text is selected (or being dragged) → hide the effect
    const down = { x: 0, y: 0, active: false };

    const spawn = (x, y, spread = 1, speed = 1) => {
      if (flakes.length > 140) flakes.shift();
      const a = Math.random() * Math.PI * 2;
      flakes.push({
        x, y,
        vx: Math.cos(a) * 0.6 * spread * speed,
        vy: Math.sin(a) * 0.6 * spread * speed + 0.35,
        life: 1, decay: 0.014 + Math.random() * 0.016,
        r: 1.5 + Math.random() * 2.6,
        rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.12,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        star: Math.random() < 0.5,
      });
    };

    const draw = (f) => {
      ctx.globalAlpha = Math.max(f.life, 0);
      ctx.strokeStyle = f.c; ctx.fillStyle = f.c;
      if (f.star) {
        ctx.lineWidth = 1; ctx.lineCap = 'round';
        ctx.beginPath();
        for (let k = 0; k < 3; k++) {
          const a = f.rot + (k * Math.PI) / 3;
          ctx.moveTo(f.x - Math.cos(a) * f.r * 1.6, f.y - Math.sin(a) * f.r * 1.6);
          ctx.lineTo(f.x + Math.cos(a) * f.r * 1.6, f.y + Math.sin(a) * f.r * 1.6);
        }
        ctx.stroke();
      } else {
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 0.6, 0, Math.PI * 2); ctx.fill();
      }
    };

    const frame = () => {
      raf = 0;
      pos.x += (mouse.x - pos.x) * 0.2;
      pos.y += (mouse.y - pos.y) * 0.2;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = flakes.length - 1; i >= 0; i--) {
        const f = flakes[i];
        f.x += f.vx; f.y += f.vy; f.vy += 0.012; f.rot += f.vr; f.life -= f.decay;
        if (f.life <= 0) { flakes.splice(i, 1); continue; }
        draw(f);
      }
      ctx.globalAlpha = 1;

      const settled = Math.abs(mouse.x - pos.x) < 0.3 && Math.abs(mouse.y - pos.y) < 0.3;
      idleFrames = settled && !flakes.length ? idleFrames + 1 : 0;
      if (idleFrames < 3) raf = requestAnimationFrame(frame); // sleep when nothing moves
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(frame); };

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      if (mouse.x === -100) { pos.x = e.clientX; pos.y = e.clientY; }
      mouse.px = mouse.x; mouse.py = mouse.y;
      mouse.x = e.clientX; mouse.y = e.clientY;
      ring.classList.add('on');
      if (selecting) return;

      const t = e.target;
      const link = t.closest?.(INTERACTIVE);
      ring.classList.toggle('is-link', !!link);
      ring.classList.toggle('is-text', !link && !!t.closest?.(TEXTUAL));

      // sparkles scale with how fast the cursor travels
      const dist = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
      const n = Math.min(Math.floor(dist / 14), 3);
      for (let i = 0; i < n; i++) spawn(mouse.x, mouse.y);
      wake();
    };
    const burst = () => {
      for (let i = 0; i < 14; i++) spawn(mouse.x, mouse.y, 4, 3.2);
      wake();
    };
    // Buttons/cards burst immediately; elsewhere only on a plain click, so that
    // pressing down to select text doesn't throw sparkles.
    const onDown = (e) => {
      ring.classList.add('is-down');
      down.x = e.clientX; down.y = e.clientY;
      down.active = !e.target.closest?.(INTERACTIVE) && !e.target.closest?.(TEXTUAL);
      if (!down.active && !e.target.closest?.(TEXTUAL)) burst();
    };
    const onUp = (e) => {
      ring.classList.remove('is-down');
      if (down.active && !selecting && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 5) burst();
      down.active = false;
    };
    const onSelect = () => {
      const sel = document.getSelection();
      selecting = !!sel && !sel.isCollapsed && sel.toString().trim().length > 0;
      ring.classList.toggle('hide', selecting);
      if (selecting) flakes.length = 0;
    };

    const onLeave = () => ring.classList.remove('on');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('resize', resize);
    document.addEventListener('selectionchange', onSelect);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('resize', resize);
      document.removeEventListener('selectionchange', onSelect);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
