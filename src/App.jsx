import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardScreen from './screens/CardScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import StreakScreen from './screens/StreakScreen';
import BottomNav from './components/BottomNav';
import './App.css';

function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('cards'); // 'cards' | 'favorites' | 'streak'

  useEffect(() => {
    const prefs = localStorage.getItem('affirmme_prefs');
    if (prefs) {
      const parsed = JSON.parse(prefs);
      if (parsed.onboarded) {
        setOnboarded(true);
      }
    }
  }, []);

  const handleOnboardingComplete = (prefs) => {
    setOnboarded(true);
  };

  return (
    <div className="app-root">
      {!onboarded ? (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      ) : (
        <div className="app-container">
          <div className="screen-content-wrapper">
            <AnimatePresence mode="wait">
              {currentScreen === 'cards' && (
                <motion.div
                  key="cards"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <CardScreen />
                </motion.div>
              )}

              {currentScreen === 'favorites' && (
                <motion.div
                  key="favorites"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <FavoritesScreen />
                </motion.div>
              )}

              {currentScreen === 'streak' && (
                <motion.div
                  key="streak"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <StreakScreen />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <BottomNav currentScreen={currentScreen} onSelectScreen={setCurrentScreen} />
        </div>
      )}
    </div>
  );
}

export default App;
