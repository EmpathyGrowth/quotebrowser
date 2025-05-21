import React, { useCallback } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import QuoteList from '../../components/QuoteList/QuoteList';
import styles from './FavoritesPage.module.css';
import appStyles from '../../App.module.css';

const FavoritesPage = () => {
  const { favoriteQuotes, favoriteIds, toggleFavorite: toggleFavoriteFromHook } = useFavorites();

  const handleToggleFavorite = useCallback((quoteId) => {
    const quoteObject = favoriteQuotes.find(q => q.id === quoteId);
    toggleFavoriteFromHook(quoteId, quoteObject);
  }, [favoriteQuotes, toggleFavoriteFromHook]);

  return (
    <div className={`${appStyles.pageContainer} ${styles.favoritesPage}`}>
      <h1 className={styles.pageTitle}>Your Favorite Quotes</h1>
      {favoriteQuotes.length === 0 ? (
        <p className={styles.noFavoritesMessage}>
          You haven't added any quotes to your favorites yet. Go exploring!
        </p>
      ) : (
        <QuoteList
          quotes={favoriteQuotes}
          onToggleFavorite={handleToggleFavorite}
          favorites={favoriteIds}
        />
      )}
    </div>
  );
};

export default FavoritesPage;
