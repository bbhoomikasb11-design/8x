import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getStreak, getLongestStreak, getTotalDays, getLast35Days } from '../utils/streakEngine';
import './StreakScreen.css';

const AnimatedCounter = ({ to }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const duration = 600;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * to));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(to);
      }
    };

    requestAnimationFrame(updateCount);
  }, [to]);

  return <>{count}</>;
};

export default function StreakScreen() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [last35, setLast35] = useState([]);

  useEffect(() => {
    setCurrentStreak(getStreak());
    setBestStreak(getLongestStreak());
    setTotalDays(getTotalDays());
    setLast35(getLast35Days());
  }, []);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const now = new Date();
  const monthName = monthNames[now.getMonth()];
  const year = now.getFullYear();

  const getMotivationalText = (streak) => {
    if (streak === 0) return { title: "Start today 🌱", subtitle: "Every expert was once a beginner.", tier: "tier-0" };
    if (streak <= 6) return { title: "Keep going 🔥", subtitle: "You're building something real.", tier: "tier-1" };
    if (streak <= 20) return { title: "Habit forming 💪", subtitle: "7 days strong. Don't break the chain.", tier: "tier-2" };
    if (streak <= 29) return { title: "Almost a month! 🌟", subtitle: "This is who you are now.", tier: "tier-3" };
    return { title: "Unstoppable 🚀", subtitle: "30 days. You've transformed.", tier: "tier-4" };
  };

  const motivation = getMotivationalText(currentStreak);
  const weekLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="streak-screen">
      <div className="streak-noise" />

      <div className="streak-header">
        <h1>Streak</h1>
      </div>

      <div className="streak-scroll-container">
        
        {/* Stat cards row */}
        <div className="streak-stats-row">
          <div className="stat-card">
            <div className="stat-number"><AnimatedCounter to={currentStreak} /></div>
            <div className="stat-label">🔥 Current</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><AnimatedCounter to={bestStreak} /></div>
            <div className="stat-label">⭐ Best</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><AnimatedCounter to={totalDays} /></div>
            <div className="stat-label">📅 Total</div>
          </div>
        </div>

        {/* Calendar section */}
        <div className="calendar-section">
          <div className="calendar-heading">{monthName} {year}</div>
          <div className="calendar-weekdays">
            {weekLabels.map((l, i) => <div key={i} className="weekday-label">{l}</div>)}
          </div>
          <div className="calendar-grid">
            {last35.map((day, i) => {
              if (day.isFuture) {
                return <div key={i} className="calendar-square future" />;
              }

              // Parse carefully to avoid timezone issues
              // date string is YYYY-MM-DD
              const dParts = day.date.split('-');
              const dParsed = new Date(dParts[0], dParts[1] - 1, dParts[2]);
              const dateStringParts = dParsed.toDateString().split(' '); // e.g. "Thu May 22 2026"
              const tooltipText = `${dateStringParts[0]}, ${dParsed.getDate()} ${dateStringParts[1]}${day.logged ? ' ✓' : ''}`;

              let classes = 'calendar-square';
              if (day.logged) classes += ' logged';
              if (day.isToday) classes += ' today';
              
              return (
                <motion.div
                  key={i}
                  className={classes}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.015, type: 'spring', stiffness: 300, damping: 20 }}
                  data-tooltip={tooltipText}
                />
              );
            })}
          </div>
        </div>

        {/* Motivational section */}
        <div className={`motivation-card ${motivation.tier}`}>
          <div className="motivation-title">{motivation.title}</div>
          <div className="motivation-subtitle">{motivation.subtitle}</div>
        </div>

      </div>
    </div>
  );
}
