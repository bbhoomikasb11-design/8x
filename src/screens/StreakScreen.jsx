import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiFire } from 'react-icons/hi2';
import './StreakScreen.css';

export default function StreakScreen() {
  const [streakCount, setStreakCount] = useState(() => {
    const saved = localStorage.getItem('affirmme_streak');
    return saved ? parseInt(saved, 10) : 5; // Default to a 5-day streak for fresh onboarding visual
  });

  useEffect(() => {
    localStorage.setItem('affirmme_streak', streakCount.toString());
  }, [streakCount]);

  const daysOfWeek = [
    { label: 'M', completed: true },
    { label: 'T', completed: true },
    { label: 'W', completed: true },
    { label: 'T', completed: true },
    { label: 'F', completed: true },
    { label: 'S', completed: false },
    { label: 'S', completed: false }
  ];

  return (
    <div className="streak-screen">
      <div className="streak-noise" />

      {/* Screen Header */}
      <div className="streak-header">
        <h1>Streak</h1>
      </div>

      <div className="streak-content">
        {/* Flame visual */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="streak-flame-card"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              filter: [
                'drop-shadow(0 0 15px rgba(255, 102, 0, 0.4))',
                'drop-shadow(0 0 25px rgba(255, 102, 0, 0.6))',
                'drop-shadow(0 0 15px rgba(255, 102, 0, 0.4))'
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut'
            }}
            className="streak-flame-glow"
          >
            🔥
          </motion.div>
          <div className="streak-number">{streakCount}</div>
          <div className="streak-label">Day Streak</div>
        </motion.div>

        {/* Calendar Habit Row */}
        <div className="streak-calendar-row">
          {daysOfWeek.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`calendar-day-pill ${day.completed ? 'completed' : ''}`}
            >
              <span className="day-letter">{day.label}</span>
              <div className="check-dot" />
            </motion.div>
          ))}
        </div>

        {/* Bottom mindfulness focus quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="streak-quote"
        >
          "Consistency is the key to carving new pathways in the mind. Keep standing in your truth."
        </motion.p>
      </div>
    </div>
  );
}
