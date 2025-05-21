import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaCopy } from 'react-icons/fa';
import styles from './QuoteCard.module.css';
import appStyles from '../../App.module.css';

const authorColorMap = {
  "Unknown": 'rgba(200, 200, 200, 0.1)',
  "Abdul Kalam": 'hsla(0, 100%, 70%, 0.15)',
  "Abu Bakr": 'hsla(8, 100%, 70%, 0.15)',
  "Abu Bakr (R.A)": 'hsla(16, 100%, 70%, 0.15)',
  "Abraham Lincoln": 'hsla(24, 100%, 70%, 0.15)',
  "Al Neuharth": 'hsla(32, 100%, 70%, 0.15)',
  "Albert Camus": 'hsla(40, 100%, 70%, 0.15)',
  "Albert Einstein": 'hsla(49, 100%, 70%, 0.15)',
  "Ali ibn Abi Talib (R.A)": 'hsla(57, 100%, 70%, 0.15)',
  "Aristotle": 'hsla(65, 100%, 70%, 0.15)',
  "Ayn Rand": 'hsla(73, 100%, 70%, 0.15)',
  "Benjamin Franklin": 'hsla(81, 100%, 70%, 0.15)',
  "Bill Cosby": 'hsla(90, 100%, 70%, 0.15)',
  "Bill Gates": 'hsla(98, 100%, 70%, 0.15)',
  "Bruce Lee": 'hsla(106, 100%, 70%, 0.15)',
  "Coco Chanel": 'hsla(114, 100%, 70%, 0.15)',
  "David Brinkley": 'hsla(122, 100%, 70%, 0.15)',
  "Elizabeth Kenny": 'hsla(130, 100%, 70%, 0.15)',
  "Ernest Hemingway": 'hsla(139, 100%, 70%, 0.15)',
  "Friedrich Nietzsche": 'hsla(147, 100%, 70%, 0.15)',
  "Hamad Bin Isa Al Khalifa": 'hsla(155, 100%, 70%, 0.15)',
  "Leonardo Da Vinci": 'hsla(163, 100%, 70%, 0.15)',
  "Marilyn Monroe": 'hsla(171, 100%, 70%, 0.15)',
  "Mark Twain": 'hsla(180, 100%, 70%, 0.15)',
  "Maya Angelou": 'hsla(188, 100%, 70%, 0.15)',
  "Mother Teresa": 'hsla(196, 100%, 70%, 0.15)',
  "Muhammad Ali": 'hsla(204, 100%, 70%, 0.15)',
  "Muhammad Iqbal": 'hsla(212, 100%, 70%, 0.15)',
  "Nelson Mandela": 'hsla(220, 100%, 70%, 0.15)',
  "Oprah Winfrey": 'hsla(229, 100%, 70%, 0.15)',
  "Paulo Coelho": 'hsla(237, 100%, 70%, 0.15)',
  "Roald Dahl": 'hsla(245, 100%, 70%, 0.15)',
  "Robin Williams": 'hsla(253, 100%, 70%, 0.15)',
  "Rumi": 'hsla(261, 100%, 70%, 0.15)',
  "Socrates": 'hsla(270, 100%, 70%, 0.15)',
  "Stephen King": 'hsla(278, 100%, 70%, 0.15)',
  "Steve Jobs": 'hsla(286, 100%, 70%, 0.15)',
  "Theodore Roosevelt": 'hsla(294, 100%, 70%, 0.15)',
  "Umar ibn Al-Khattāb (R.A)": 'hsla(302, 100%, 70%, 0.15)',
  "Walt Disney": 'hsla(310, 100%, 70%, 0.15)',
  "Warren Buffett": 'hsla(319, 100%, 70%, 0.15)',
  "William Shakespeare": 'hsla(327, 100%, 70%, 0.15)',
  "Willie Nelson": 'hsla(335, 100%, 70%, 0.15)',
  "Winston Churchill": 'hsla(343, 100%, 70%, 0.15)',
  "Zig Ziglar": 'hsla(351, 100%, 70%, 0.15)'
};

const getAuthorCardColor = (authorName) => {
  const authorKey = authorName || "Unknown";
  return authorColorMap[authorKey] || authorColorMap["Unknown"]; 
};


const QuoteCard = ({ quote, onToggleFavorite, isFavorite }) => {
  const [copied, setCopied] = useState(false);
  
  if (!quote) {
    return null;
  }

  const handleFavoriteClick = () => {
    onToggleFavorite(quote.id);
  };

  const handleCopyClick = () => {
    const textToCopy = `"${quote.quote}" - ${quote.author || 'Unknown'}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const cardBackgroundColor = getAuthorCardColor(quote.author);

  const cardStyle = {
    backgroundColor: cardBackgroundColor,
  };

  return (
    <li 
      className={`${styles.quoteCard} ${appStyles.glassPanel}`}
      style={cardStyle}
    >
      <Link to={`/quote/${quote.id}`} className={styles.quoteLink}>
        <p className={styles.quoteText}>"{quote.quote}"</p>
        <p className={styles.quoteAuthor}>- {quote.author || 'Unknown'}</p>
      </Link>
      <div className={styles.buttonContainer}>
        <button
          onClick={handleCopyClick}
          className={styles.copyButton}
          aria-label="Copy quote"
          title="Copy quote to clipboard"
        >
          <FaCopy size={24} color={copied ? '#4caf50' : undefined} />
          {copied && <span className={styles.copyFeedback}>Copied!</span>}
        </button>
        <button
          onClick={handleFavoriteClick}
          className={styles.favoriteButton}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? <FaHeart color="#e91e63" size={26} /> : <FaRegHeart size={26} />}
        </button>
      </div>
    </li>
  );
};

export default QuoteCard;
