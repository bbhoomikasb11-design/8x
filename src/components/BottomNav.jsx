import React from 'react';
import { motion } from 'framer-motion';
import { HiHome, HiHeart, HiFire } from 'react-icons/hi2';
import './BottomNav.css';

const navTabs = [
  { id: 'cards', label: 'Affirm', Icon: HiHome },
  { id: 'favorites', label: 'Saved', Icon: HiHeart },
  { id: 'streak', label: 'Streak', Icon: HiFire }
];

export default function BottomNav({ currentScreen, onSelectScreen }) {
  return (
    <div className="bottom-nav-container">
      {navTabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        const IconComponent = tab.Icon;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectScreen(tab.id)}
            className={`bottom-nav-tab ${isActive ? 'active' : ''}`}
          >
            <IconComponent className="bottom-nav-tab-icon" />
            <span>{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="activeNavTab"
                className="bottom-nav-active-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
