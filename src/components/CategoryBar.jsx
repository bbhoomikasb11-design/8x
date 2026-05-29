import React from 'react';
import { motion } from 'framer-motion';
import './CategoryBar.css';

const categories = [
  { id: 'all', label: 'All', emoji: '🌟' },
  { id: 'confidence', label: 'Confidence', emoji: '💪' },
  { id: 'gratitude', label: 'Gratitude', emoji: '🙏' },
  { id: 'health', label: 'Health', emoji: '💚' },
  { id: 'love', label: 'Love', emoji: '💖' },
  { id: 'success', label: 'Success', emoji: '⭐' },
  { id: 'calm', label: 'Calm', emoji: '🧘' }
];

export default function CategoryBar({ activeCategory, onSelectCategory }) {
  return (
    <div className="category-bar-wrapper">
      <div className="category-bar-scroll">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`category-pill ${isActive ? 'active' : ''}`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="active-pill-bg"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
