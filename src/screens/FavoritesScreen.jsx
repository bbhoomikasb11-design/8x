import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiHeart, HiOutlineHeart, HiXMark } from 'react-icons/hi2';
import affirmations from '../data/affirmations';
import useFavorites from '../hooks/useFavorites';
import './FavoritesScreen.css';

export default function FavoritesScreen() {
  const { favorites, removeFavorite } = useFavorites();

  // Map favorite IDs to their full affirmation objects
  const savedAffirmations = affirmations.filter(a => favorites.includes(a.id));

  // Helper to check if text starts with "I am"
  const startsWithIAm = (text) => {
    return text.toLowerCase().trim().startsWith('i am');
  };

  return (
    <div className="favorites-screen">
      <div className="favorites-noise" />

      {/* Sticky Screen Header */}
      <div className="favorites-header">
        <h1>Saved</h1>
        <div className="favorites-count-badge">
          {savedAffirmations.length} {savedAffirmations.length === 1 ? 'saved' : 'saved'}
        </div>
      </div>

      <div className="favorites-scroll-container">
        <AnimatePresence mode="popLayout">
          {savedAffirmations.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="favorites-empty-state"
            >
              <HiOutlineHeart className="empty-heart-icon" />
              <h2 className="empty-title">Nothing saved yet</h2>
              <p className="empty-subtitle">Double-tap any card to save it</p>
            </motion.div>
          ) : (
            savedAffirmations.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.06,
                    y: { type: 'spring', stiffness: 300, damping: 30 }
                  }
                }}
                exit={{ x: 100, opacity: 0, transition: { duration: 0.2 } }}
                className="favorites-card"
                style={{
                  background: `linear-gradient(135deg, ${item.gradient[0]} 0%, ${item.gradient[1]} 100%)`
                }}
              >
                <div className="fav-card-badge">{item.category}</div>
                
                <button
                  onClick={() => removeFavorite(item.id)}
                  className="fav-card-remove-btn"
                  aria-label="Remove from saved"
                >
                  <HiXMark />
                </button>

                <div className="fav-card-content">
                  <p className="fav-card-text">{item.text}</p>
                </div>

                <div className="fav-card-footer">
                  {!startsWithIAm(item.text) ? 'I am ·' : 'I am'}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
