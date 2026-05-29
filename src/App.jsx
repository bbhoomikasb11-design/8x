import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardScreen from './screens/CardScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import StreakScreen from './screens/StreakScreen';
import BottomNav from './components/BottomNav';
import DevPanel from './components/DevPanel';
import './App.css';

function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('cards'); // 'cards' | 'favorites' | 'streak'
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Splash screen timer
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

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

  const transitionConfig = { duration: 0.22, ease: "easeOut" };

  return (
    <div className="app-root">
      <DevPanel />
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="splash-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              AffirmMe
            </motion.h1>
            <motion.p
              className="splash-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Daily Affirmations
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && (
        !onboarded ? (
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        ) : (
          <div className="app-container">
            <div className="screen-content-wrapper">
              <AnimatePresence mode="wait">
                {currentScreen === 'cards' && (
                  <motion.div
                    key="cards"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={transitionConfig}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <CardScreen />
                  </motion.div>
                )}

                {currentScreen === 'favorites' && (
                  <motion.div
                    key="favorites"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={transitionConfig}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <FavoritesScreen />
                  </motion.div>
                )}

                {currentScreen === 'streak' && (
                  <motion.div
                    key="streak"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={transitionConfig}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <StreakScreen />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <BottomNav currentScreen={currentScreen} onSelectScreen={setCurrentScreen} />
          </div>
        )
      )}
    </div>
  );
}

export default App;
