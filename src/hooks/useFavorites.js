import { useState, useEffect } from 'react';

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('affirmme_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading favorites from localStorage', e);
      return [];
    }
  });

  // Save favorites when changed
  useEffect(() => {
    try {
      localStorage.setItem('affirmme_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Error saving favorites to localStorage', e);
    }
  }, [favorites]);

  const addFavorite = (affirmation) => {
    const id = typeof affirmation === 'object' ? affirmation.id : affirmation;
    if (id === undefined || id === null) return;
    
    setFavorites(prev => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const removeFavorite = (id) => {
    if (id === undefined || id === null) return;
    
    setFavorites(prev => {
      const targetId = typeof id === 'object' ? id.id : id;
      return prev.filter(item => item !== targetId);
    });
  };

  const isFavorite = (id) => {
    if (id === undefined || id === null) return false;
    const targetId = typeof id === 'object' ? id.id : id;
    return favorites.includes(targetId);
  };

  const clearAll = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearAll
  };
}
