import { useState, useCallback, useEffect } from 'react';

const FAVORITES_STORAGE_KEY = 'favoriteQuotes';

const getStoredFavorites = () => {
  const favQuotesRaw = localStorage.getItem(FAVORITES_STORAGE_KEY);
  try {
    const favQuotesParsed = JSON.parse(favQuotesRaw || '[]');
    return Array.isArray(favQuotesParsed) ? favQuotesParsed : [];
  } catch (e) {
    console.error(`Error parsing ${FAVORITES_STORAGE_KEY} from localStorage:`, e);
    return [];
  }
};

export const useFavorites = () => {
  const [favoriteQuotes, setFavoriteQuotes] = useState(getStoredFavorites);

  const favoriteIds = favoriteQuotes.map(q => q.id);
  const favoritesCount = favoriteQuotes.length;

  const toggleFavorite = useCallback((quoteId, quote) => {
    const currentStoredFavorites = getStoredFavorites();
    const isCurrentlyFavorite = currentStoredFavorites.some(fav => fav.id === quoteId);
    let updatedStoredFavorites;

    if (isCurrentlyFavorite) {
      updatedStoredFavorites = currentStoredFavorites.filter(fav => fav.id !== quoteId);
    } else {
      if (quote && quote.id === quoteId) {
        updatedStoredFavorites = [...currentStoredFavorites, quote];
      } else {
        console.warn(`Attempted to add quote ID ${quoteId} to favorites failed.`);
        updatedStoredFavorites = currentStoredFavorites; 
      }
    }

    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedStoredFavorites));
    setFavoriteQuotes(updatedStoredFavorites);
    window.dispatchEvent(new CustomEvent('favoritesUpdated'));
  }, []);


  useEffect(() => {
    const handleFavoritesUpdatedEvent = () => {
      setFavoriteQuotes(getStoredFavorites());
    };
    window.addEventListener('favoritesUpdated', handleFavoritesUpdatedEvent);
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdatedEvent);
    };
  }, []);

  return { favoriteQuotes, favoriteIds, toggleFavorite, favoritesCount };
};
