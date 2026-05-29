import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock } from 'react-icons/fa';
import './OnboardingScreen.css';

const ONBOARDING_CATEGORIES = [
  { id: 'confidence', label: 'Confidence', emoji: '💪', desc: 'I am enough.', color: '#1a0a3b' },
  { id: 'gratitude', label: 'Gratitude', emoji: '🙏', desc: 'Thankful for today.', color: '#0a2a2a' },
  { id: 'health', label: 'Health', emoji: '💚', desc: 'Vibrant and strong.', color: '#0a2010' },
  { id: 'love', label: 'Love', emoji: '💖', desc: 'Cherished and loving.', color: '#2a0a1a' },
  { id: 'success', label: 'Success', emoji: '⭐', desc: 'Magnet for victory.', color: '#1a1400' },
  { id: 'calm', label: 'Calm', emoji: '🧘', desc: 'At peace always.', color: '#0a1020' }
];

export default function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedCats, setSelectedCats] = useState([]);
  const [reminderTime, setReminderTime] = useState('08:00');

  const toggleCategory = (catId) => {
    setSelectedCats(prev => {
      if (prev.includes(catId)) {
        return prev.filter(id => id !== catId);
      } else {
        return [...prev, catId];
      }
    });
  };

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handleFinishOnboarding = () => {
    const prefs = {
      categories: selectedCats,
      notifTime: reminderTime,
      onboarded: true
    };
    localStorage.setItem('affirmme_prefs', JSON.stringify(prefs));
    onComplete(prefs);
  };

  const handleSkipNotifications = () => {
    setReminderTime('');
    handleNextStep();
  };

  // Step variants for fluid transitions
  const stepVariants = {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, x: -80, transition: { duration: 0.25, ease: 'easeIn' } }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-noise" />

      <div className="onboarding-step-wrapper">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ width: '100%' }}
            >
              <div className="onboarding-header">
                <h1 className="onboarding-title">What do you want to focus on?</h1>
                <p className="onboarding-subtitle">Pick all that speak to you</p>
              </div>

              <div className="categories-grid">
                {ONBOARDING_CATEGORIES.map(cat => {
                  const isSelected = selectedCats.includes(cat.id);
                  return (
                    <div
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`focus-card ${isSelected ? 'selected' : ''}`}
                      style={{
                        background: `linear-gradient(135deg, ${cat.color}aa 0%, #05030f 100%)`
                      }}
                    >
                      <div className="focus-card-overlay" />
                      <div className="focus-card-emoji">{cat.emoji}</div>
                      <div className="focus-card-info">
                        <span className="focus-card-label">{cat.label}</span>
                        <span className="focus-card-desc">{cat.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ width: '100%' }}
            >
              <div className="reminder-wrapper">
                <FaClock className="clock-icon-large" />
                <div className="onboarding-header">
                  <h1 className="onboarding-title">Set your daily reminder</h1>
                  <p className="onboarding-subtitle">When do you want your daily affirmation?</p>
                </div>

                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="styled-time-input"
                />

                <button onClick={handleSkipNotifications} className="maybe-later-link">
                  Maybe later
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="splash-wrapper"
            >
              {/* Confetti scatter overlay */}
              <div className="confetti-container">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="confetti-particle" />
                ))}
              </div>

              <h1 className="splash-title">You're ready.</h1>
              <p className="splash-subtitle">Your journey to a better mindset starts now.</p>

              {/* Show selected category badges as pills (up to first 3 or all) */}
              <div className="selected-pills-row">
                {selectedCats.map(catId => {
                  const catObj = ONBOARDING_CATEGORIES.find(c => c.id === catId);
                  return catObj ? (
                    <span key={catId} className="splash-pill">
                      {catObj.emoji} {catObj.label}
                    </span>
                  ) : null;
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="footer-action">
        {step === 1 && (
          <button
            onClick={handleNextStep}
            disabled={selectedCats.length === 0}
            className="onboarding-btn"
          >
            Continue
          </button>
        )}

        {step === 2 && (
          <button
            onClick={handleNextStep}
            className="onboarding-btn"
          >
            Set Reminder
          </button>
        )}

        {step === 3 && (
          <button
            onClick={handleFinishOnboarding}
            className="onboarding-btn"
          >
            Begin
          </button>
        )}
      </div>
    </div>
  );
}
