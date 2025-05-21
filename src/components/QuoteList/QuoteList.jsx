import React from 'react';
import QuoteCard from '../QuoteCard/QuoteCard';
import styles from './QuoteList.module.css';


export default function QuoteList({ quotes, onToggleFavorite, favorites }) {
  if (!quotes || quotes.length === 0) {
    return <p className={styles.emptyMessage}>No quotes found. Try adjusting your filters!</p>;
  }

  return (
    <ul className={styles.quoteList}>
      {quotes.map((quote) => (
        <QuoteCard
          key={quote.id}
          quote={quote}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.some(favId => favId === quote.id)} 
        />
      ))}
    </ul>
  );
};
