import React, { useState, useEffect } from 'react';
import CardScreen from './screens/CardScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import './App.css';

function App() {
  const [onboarded, setOnboarded] = useState(false);

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
      {onboarded ? (
        <CardScreen />
      ) : (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
    </div>
  );
}

export default App;
