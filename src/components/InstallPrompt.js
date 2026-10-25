import React, { useEffect, useState } from 'react';
import './InstallPrompt.css';

const KEY = 'hari-install-dismissed';
const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const write = () => { try { localStorage.setItem(KEY, '1'); } catch { /* storage blocked */ } };

// Chrome fires `beforeinstallprompt` once the site is installable; we keep the
// event and show our own "Install App" button instead of the browser's mini-bar.
export default function InstallPrompt() {
  const [evt, setEvt] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || read()) return;
    const onPrompt = (e) => { e.preventDefault(); setEvt(e); };
    const onInstalled = () => setEvt(null);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (!evt) return null;

  const install = async () => {
    evt.prompt();
    await evt.userChoice;
    setEvt(null);
  };
  const dismiss = () => { write(); setEvt(null); };

  return (
    <div className="install-pill" role="dialog" aria-label="Install app">
      <img src="/icon-192.png" alt="" width="28" height="28" />
      <button className="install-go" onClick={install}>Install App</button>
      <button className="install-x" onClick={dismiss} aria-label="Dismiss">✕</button>
    </div>
  );
}
