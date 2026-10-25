import React, { useEffect, useRef, useState } from 'react';
import { SITE_CONFIG } from '../config';
import ReviewCard from './ReviewCard';
import './Contact.css';

// ── Claude AI Chat Assistant ──────────────────────────────────────────────────
function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '👋 Hi! I\'m Hari\'s AI assistant. Ask me anything about our services, pricing, or how to describe your appliance problem!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const bottomRef = useRef();

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text }));

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a helpful assistant for Hari Refrigeration, a home appliance repair service in Navi Mumbai, India.
Services: AC repair, Refrigerator repair, Washing Machine repair, Microwave Oven repair, Water Purifier service, Annual Maintenance Contracts (AMC).
Service areas: Belapur(Headoffice), Seawoods, Koparkhairane (Navi Mumbai).
Phone: ${SITE_CONFIG.phone}. Working hours: Every day 9AM–11PM.
Be friendly, helpful and concise. Help customers describe their appliance issues clearly. Answer questions about typical repair costs, timelines, and what to do before the technician arrives. Always encourage them to fill the contact form or call directly for booking.`,
          messages: [
            ...history,
            { role: 'user', content: userMsg }
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, I could not understand that. Please call us directly!';
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: '⚠️ Could not connect right now. Please call us at ' + SITE_CONFIG.phone }]);
    }
    setLoading(false);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className={`ai-chat${chatOpen ? ' chat-open' : ''}`}>
      <div className="ai-header" onClick={() => setChatOpen(v => !v)}>
        <span className="ai-robot-icon">🤖</span>
        <div>
          <div className="ai-title">AI Assistant — Ask Anything</div>
          <div className="ai-sub">Powered by Claude AI</div>
        </div>
        <div className="ai-online"><span className="dot" />Online</div>
        <span className="ai-chevron">{chatOpen ? '▲' : '▼'}</span>
      </div>
      <div className="ai-body">
        <div className="ai-messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              <div className="bubble">{m.text}</div>
            </div>
          ))}
          {loading && (
            <div className="msg assistant">
              <div className="bubble typing"><span /><span /><span /></div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="ai-input-row">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="e.g. My AC is not cooling, what should I check?"
          />
          <button onClick={sendMessage} disabled={loading}>Send</button>
        </div>
      </div>
    </div>
  );
}

// ── Contact Section ───────────────────────────────────────────────────────────
export default function Contact() {
  const ref = useRef();
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  useEffect(() => {
    const obs = new IntersectionObserver(
      e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(`https://formspree.io/f/${SITE_CONFIG.formspreeId}`, {
        method: 'POST', body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) { setStatus('done'); form.reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <div id="contact" className="contact-bg">
      <div className="contact-inner" ref={ref}>

        {/* Left: info + AI assistant */}
        <div className="contact-left fade-in">
          <div className="section-label">Contact Us</div>
          <div className="section-title">Get In Touch</div>
          <div className="divider" />

          <div className="contact-detail">
            <span className="ic">👨‍🔧</span>
            <div>
              <strong>Lead Technician</strong>
              <span>Mr. Hari Pal</span>
            </div>
          </div>

          <div className="contact-detail">
            <span className="ic">📞</span>
            <div>
              <strong>Phone / WhatsApp</strong>
              <a href={`tel:+918850909842`} className="phone-link">{SITE_CONFIG.phone}</a>
              <a href={`tel:+919594985353`} className="phone-link">{SITE_CONFIG.phone2}</a>
            </div>
          </div>
          <div className="contact-detail">
            <span className="ic">📍</span>
            <div>
              <strong>Address</strong>
              <a
                href={SITE_CONFIG.mapUrl}
                className="map-link"
                target="_blank"
                rel="noreferrer"
              >
                {SITE_CONFIG.address} <span className="map-tag">📍 Open Maps</span>
              </a>
            </div>
          </div>
          <div className="contact-detail">
            <span className="ic">📧</span>
            <div>
              <strong>Email</strong>
              <span>{SITE_CONFIG.email}</span>
            </div>
          </div>
          <div className="contact-detail">
            <span className="ic">🗺️</span>
            <div>
              <strong>Service Area</strong>
              <span>{SITE_CONFIG.serviceArea}</span>
            </div>
          </div>

          <div className="contact-detail">
            <span className="ic">🕐</span>
            <div>
              <strong>Working Hours</strong>
              {SITE_CONFIG.hours.map((h, i) => (
                <div key={i} className="hours-row">
                  <span className="day">{h.day}</span>
                  <span className="time">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          <AIAssistant />
        </div>

        {/* Right: query form + review prompt */}
        <div className="contact-right">
        <div className="query-form fade-in">
          <h3>📬 Send Us Your Query</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input name="name" placeholder="Ramesh Patil" required />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input name="phone" type="tel" placeholder="+91 98XXX XXXXX" required />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input name="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>Service Required *</label>
              <select name="service" required defaultValue="">
                <option value="" disabled>-- Select Appliance --</option>
                <option>AC Repair / Service</option>
                <option>Refrigerator Repair</option>
                <option>Washing Machine Repair</option>
                <option>Microwave Oven Repair</option>
                <option>Water Purifier Service</option>
                <option>Annual Maintenance (AMC)</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Your Query / Message *</label>
              <textarea name="message" placeholder="Describe your issue… e.g. AC is not cooling, makes loud noise..." required />
            </div>
            <button type="submit" className="submit-btn" disabled={status === 'sending'}>
              {status === 'sending' ? '⏳ Sending...' : '📤 Send Query to Hari Refrigeration'}
            </button>
            {status === 'done'  && <div className="form-success">✅ Query sent! We will contact you shortly.</div>}
            {status === 'error' && <div className="form-error">❌ Error sending. Please call us directly.</div>}
          </form>
        </div>
        <ReviewCard />
        </div>

      </div>
    </div>
  );
}
