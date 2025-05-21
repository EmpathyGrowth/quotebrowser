import React, { useEffect, useState, useCallback } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import styles from './QuoteDetail.module.css';
import appStyles from '../../App.module.css';

export default function QuoteDetailPage() {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { favoriteIds, toggleFavorite: toggleFavoriteFromHook } = useFavorites();
  const isFavorite = quote ? favoriteIds.includes(quote.id) : false;



  useEffect(() => {
    const fetchQuoteDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/quotes/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Quote not found.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuote(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setQuote(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuoteDetail();
  }, [id]);

  const handleToggleFavorite = useCallback(() => {
    if (!quote) return;
    toggleFavoriteFromHook(quote.id, quote);
  }, [quote, toggleFavoriteFromHook]);
  

  if (loading) {
    return (
      <div className={styles.detailPageWrapper}>
        <div className={`${appStyles.glassPanel} ${styles.message}`}>Loading quote...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.detailPageWrapper}>
        <div className={`${appStyles.glassPanel} ${styles.message} ${styles.error}`}>Error: {error}</div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className={styles.detailPageWrapper}>
        <div className={`${appStyles.glassPanel} ${styles.message}`}>Quote data not available.</div>
      </div>
    );
  }

  return (
    <div className={styles.detailPageWrapper}>
      <div className={`${appStyles.glassPanel} ${styles.detailContainer}`}>
      <Link to="/" className={styles.backButton} title="Back to Home">
        <FaArrowLeft /> Back to list
      </Link>
      <h2 className={styles.quoteText}>"{quote.quote}"</h2>
      <p className={styles.quoteAuthor}>- {quote.author || 'Unknown'}</p>
      {quote.tags && quote.tags.length > 0 && (
        <div className={styles.tagsContainer}>
          <strong>Tags:</strong> {quote.tags.join(', ')}
        </div>
      )}
      <button
        onClick={handleToggleFavorite}
        className={`${styles.favoriteButtonDetail} ${isFavorite ? styles.favorited : ''}`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? <FaHeart color="#e91e63" size={24} /> : <FaRegHeart size={24} />}
        <span className={styles.buttonText}>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
      </button>
      </div>
    </div>
  );
}
