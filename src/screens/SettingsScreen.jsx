import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiCog6Tooth } from 'react-icons/hi2';
import { requestPermission, scheduleDaily, cancelDaily, getSavedTime, isScheduled } from '../utils/notify';
import useFavorites from '../hooks/useFavorites';
import './SettingsScreen.css';

export default function SettingsScreen({ onClose }) {
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [time, setTime] = useState('09:00');
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showConfirmClearFav, setShowConfirmClearFav] = useState(false);
  const { clearAll } = useFavorites();

  useEffect(() => {
    if (isScheduled()) {
      setReminderEnabled(true);
      const saved = getSavedTime();
      if (saved) setTime(saved);
    }
  }, []);

  const handleToggleReminder = async () => {
    if (!reminderEnabled) {
      setReminderEnabled(true);
    } else {
      setReminderEnabled(false);
      cancelDaily();
    }
  };

  const handleSaveReminder = async () => {
    const perm = await requestPermission();
    if (perm === 'denied') {
      setPermissionDenied(true);
      return;
    }
    setPermissionDenied(false);
    scheduleDaily(time);
    alert('Daily reminder scheduled!');
  };

  const handleResetOnboarding = () => {
    localStorage.removeItem('affirmme_prefs');
    // Reload page to reset state (simple way)
    window.location.reload();
  };

  const handleClearFavorites = () => {
    clearAll();
    setShowConfirmClearFav(false);
  };

  return (
    <motion.div 
      className="settings-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="settings-sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.y > 100) {
            onClose();
          }
        }}
      >
        <div className="settings-drag-handle" />
        
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="settings-close-btn" onClick={onClose}><HiXMark /></button>
        </div>

        <div className="settings-scroll-content">
          {/* Section 1: Daily Reminder */}
          <section className="settings-section">
            <h3 className="settings-section-title">Daily Reminder</h3>
            
            <div className="settings-row">
              <span className="settings-label">Remind me daily</span>
              <button 
                className={`toggle-switch ${reminderEnabled ? 'on' : 'off'}`} 
                onClick={handleToggleReminder}
                aria-pressed={reminderEnabled}
              >
                <motion.div 
                  className="toggle-thumb" 
                  layout 
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            <AnimatePresence>
              {reminderEnabled && (
                <motion.div 
                  className="time-picker-container"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="time-picker-row">
                    <input 
                      type="time" 
                      value={time} 
                      onChange={(e) => setTime(e.target.value)}
                      className="time-picker-input"
                    />
                    <button className="settings-save-btn" onClick={handleSaveReminder}>Save</button>
                  </div>
                  {permissionDenied && (
                    <div className="permission-warning">
                      <HiCog6Tooth className="warning-icon" />
                      <span>Open your browser settings to allow notifications</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Section 2: Preferences */}
          <section className="settings-section">
            <h3 className="settings-section-title">Preferences</h3>
            
            <div className="settings-action-row">
              <button className="settings-text-btn" onClick={() => setShowConfirmReset(true)}>
                Reset onboarding
              </button>
            </div>
            <div className="settings-action-row">
              <button className="settings-text-btn danger" onClick={() => setShowConfirmClearFav(true)}>
                Clear all favorites
              </button>
            </div>
          </section>

          {/* Section 3: About */}
          <section className="settings-section">
            <h3 className="settings-section-title">About</h3>
            <div className="settings-about">
              <p className="about-version">AffirmMe v1.0</p>
              <p className="about-credit">Built with ❤️ for daily mindset work</p>
            </div>
          </section>
        </div>

        {/* Dialog Overlays */}
        <AnimatePresence>
          {showConfirmReset && (
            <motion.div className="dialog-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="dialog-box" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
                <h4>Reset App?</h4>
                <p>This will restart the onboarding process. Are you sure?</p>
                <div className="dialog-actions">
                  <button onClick={() => setShowConfirmReset(false)}>Cancel</button>
                  <button className="danger" onClick={handleResetOnboarding}>Reset</button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {showConfirmClearFav && (
            <motion.div className="dialog-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="dialog-box" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
                <h4>Clear Favorites?</h4>
                <p>This will permanently remove all your saved affirmations.</p>
                <div className="dialog-actions">
                  <button onClick={() => setShowConfirmClearFav(false)}>Cancel</button>
                  <button className="danger" onClick={handleClearFavorites}>Clear All</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
