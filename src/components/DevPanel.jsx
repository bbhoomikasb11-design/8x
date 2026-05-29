import React, { useEffect, useState } from 'react';

export default function DevPanel() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key.toLowerCase() === 'd') {
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!import.meta.env.DEV || !isOpen) return null;

  const setStreak = (days) => {
    localStorage.setItem('affirmme_log', JSON.stringify([])); // clear
    if (days > 0) {
      const log = [];
      const today = new Date();
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        log.push(d.toISOString().split('T')[0]);
      }
      localStorage.setItem('affirmme_log', JSON.stringify(log));
    }
    window.location.reload();
  };

  const fillFavorites = () => {
    // 6 sample items
    const sampleIds = [1, 2, 3, 4, 5, 6]; // assuming these exist
    localStorage.setItem('affirmme_favorites', JSON.stringify(sampleIds));
    window.location.reload();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 20, right: 20,
      background: 'rgba(0,0,0,0.85)',
      color: '#fff',
      padding: 16,
      borderRadius: 12,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      border: '1px solid #7C6FF7',
      fontFamily: 'sans-serif'
    }}>
      <h3 style={{ margin: 0, fontSize: 14 }}>🛠 Dev Demo Panel</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setStreak(0)}>0 Streak</button>
        <button onClick={() => setStreak(7)}>7 Streak</button>
        <button onClick={() => setStreak(30)}>30 Streak</button>
      </div>
      <button onClick={fillFavorites}>Fill 6 Favorites</button>
      <button onClick={() => setIsOpen(false)}>Close (Shift+D)</button>
    </div>
  );
}
