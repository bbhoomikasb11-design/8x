import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShareAlt, FaChevronRight } from 'react-icons/fa';
import affirmations from '../data/affirmations';
import './CardScreen.css';

export default function CardScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('affirmme_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeCategory, setActiveCategory] = useState('all');
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const lastTapRef = useRef(0);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('affirmme_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter affirmations based on category
  const filteredAffirmations = activeCategory === 'all'
    ? affirmations
    : activeCategory === 'favorites'
      ? affirmations.filter(a => favorites.includes(a.id))
      : affirmations.filter(a => a.category === activeCategory);

  // Ensure currentIndex stays within bounds if filtered list changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory, favorites.length]);

  const currentCard = filteredAffirmations[currentIndex] || null;

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(fId => fId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleNext = () => {
    if (filteredAffirmations.length <= 1) return;
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % filteredAffirmations.length);
  };

  const handlePrev = () => {
    if (filteredAffirmations.length <= 1) return;
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + filteredAffirmations.length) % filteredAffirmations.length);
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 80;
    if (info.offset.x < -swipeThreshold) {
      // Swiped left -> Go to next card
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      // Swiped right -> Go to previous card (or next if user strictly wants next)
      handlePrev();
    }
  };

  const handleCardTap = () => {
    if (!currentCard) return;
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      // Double tap detected
      const isAlreadyFav = favorites.includes(currentCard.id);
      toggleFavorite(currentCard.id);
      
      // Only show heart burst on favoriting (or both, let's show it on both but it looks great)
      if (!isAlreadyFav) {
        setShowHeartBurst(true);
        setTimeout(() => setShowHeartBurst(false), 500);
      }
    }
    lastTapRef.current = now;
  };

  const handleShare = () => {
    if (!currentCard) return;
    console.log(`Sharing affirmation: "${currentCard.text}"`);
    
    // Attempt standard Web Share API, fallback to copying to clipboard
    if (navigator.share) {
      navigator.share({
        title: 'AffirmMe Daily Affirmation',
        text: currentCard.text,
        url: window.location.href
      }).catch(err => console.log('Share canceled', err));
    } else {
      navigator.clipboard.writeText(currentCard.text);
      alert('Affirmation copied to clipboard.');
    }
  };

  // Helper to check if text starts with "I am"
  const startsWithIAm = (text) => {
    return text.toLowerCase().trim().startsWith('i am');
  };

  // Categories list for top filter
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'confidence', label: 'Confidence' },
    { id: 'gratitude', label: 'Gratitude' },
    { id: 'health', label: 'Health' },
    { id: 'love', label: 'Love' },
    { id: 'success', label: 'Success' },
    { id: 'calm', label: 'Calm' },
    { id: 'favorites', label: 'Favorites' }
  ];

  // Motion variants for sliding cards
  const cardVariants = {
    enter: (dir) => ({
      x: dir * 300,
      opacity: 0,
      rotate: dir * 8
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        rotate: { type: 'spring', stiffness: 300, damping: 30 }
      }
    },
    exit: (dir) => ({
      x: dir * -300,
      opacity: 0,
      rotate: dir * -8,
      transition: {
        duration: 0.25
      }
    })
  };

  // Progress dots (up to 7 centered sliding window)
  const getProgressDots = () => {
    const total = filteredAffirmations.length;
    if (total <= 1) return [];

    let start = 0;
    let end = total;

    if (total > 7) {
      start = Math.max(0, currentIndex - 3);
      end = start + 7;
      if (end > total) {
        end = total;
        start = end - 7;
      }
    }

    const dots = [];
    for (let i = start; i < end; i++) {
      dots.push(i);
    }
    return dots;
  };

  const isCurrentCardFavorited = currentCard ? favorites.includes(currentCard.id) : false;

  // Background gradient dynamic calculation
  const defaultGradient = ['#0D0920', '#13092e'];
  const currentGradient = currentCard ? currentCard.gradient : defaultGradient;
  const backgroundStyle = {
    background: `linear-gradient(135deg, ${currentGradient[0]} 0%, ${currentGradient[1]} 100%)`,
    transition: 'background 0.5s ease'
  };

  return (
    <div className="card-screen-container" style={backgroundStyle}>
      <div className="noise-overlay" />

      {/* Elegant horizontal scroll category selector */}
      <div className="category-filter-bar">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="card-wrapper">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {!currentCard ? (
            <motion.div
              key="empty-state"
              className="affirmation-card"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            >
              <div className="card-content">
                <p className="affirmation-text" style={{ fontSize: '20px' }}>
                  {activeCategory === 'favorites'
                    ? 'Your favorite deck is empty. Tap the heart on any card to fill it.'
                    : 'No affirmations found.'}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentCard.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              onClick={handleCardTap}
              className="affirmation-card"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                boxShadow: `
                  0 20px 40px rgba(0, 0, 0, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.15),
                  0 0 40px ${currentCard.gradient[1]}20
                `
              }}
            >
              <div className="category-badge">
                {currentCard.category}
              </div>

              <div className="card-content">
                {!startsWithIAm(currentCard.text) && (
                  <span className="prefix-i-am">I Am</span>
                )}
                <p className="affirmation-text">
                  {currentCard.text}
                </p>
              </div>

              {/* Heart burst double tap feedback overlay */}
              <AnimatePresence>
                {showHeartBurst && (
                  <motion.div
                    className="heart-burst-overlay"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.6, 1.4], opacity: [0, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <FaHeart className="heart-burst-icon" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bottom-controls">
        {/* Progress dots indicating sliding cards */}
        {filteredAffirmations.length > 1 && (
          <div className="progress-dots">
            {getProgressDots().map(index => (
              <div
                key={index}
                className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
                style={{
                  width: index === currentIndex ? '20px' : '6px',
                  backgroundColor: index === currentIndex ? 'var(--accent2)' : 'rgba(255, 255, 255, 0.3)'
                }}
              />
            ))}
          </div>
        )}

        {/* Dynamic Action Buttons */}
        {currentCard && (
          <div className="action-bar">
            {/* Heart Button */}
            <motion.button
              className={`action-btn ${isCurrentCardFavorited ? 'favorite-active' : ''}`}
              onClick={() => toggleFavorite(currentCard.id)}
              whileTap={{ scale: 0.9 }}
              animate={isCurrentCardFavorited ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.2 }}
              aria-label="Favorite"
            >
              {isCurrentCardFavorited ? <FaHeart /> : <FaRegHeart />}
            </motion.button>

            {/* Share Button */}
            <motion.button
              className="action-btn"
              onClick={handleShare}
              whileTap={{ scale: 0.9 }}
              aria-label="Share"
            >
              <FaShareAlt />
            </motion.button>

            {/* Next Button */}
            <motion.button
              className="action-btn"
              onClick={handleNext}
              disabled={filteredAffirmations.length <= 1}
              whileTap={{ scale: 0.9 }}
              aria-label="Next Affirmation"
              style={{
                opacity: filteredAffirmations.length <= 1 ? 0.5 : 1,
                cursor: filteredAffirmations.length <= 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <FaChevronRight />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
