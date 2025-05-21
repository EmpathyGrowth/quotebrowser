import styles from './Header.module.css';
import { FaHeart, FaQuoteLeft } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import appStyles from '../../App.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

export default function Header({ favoritesCount }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className={styles.header}>
      <div className={`${appStyles.glassPanel} ${styles.headerInner}`}>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
          title="Home"
        >
          <FaQuoteLeft size={28} className={styles.logoIcon} />
          <span className={styles.title}>Quote Browser</span>
        </NavLink>

        <nav className={styles.nav}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <NavLink 
            to="/favorites" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink} ${styles.favoritesLink}` : `${styles.navLink} ${styles.favoritesLink}`}
            title="Favorites"
          >
            <FaHeart size={24} />
            {favoritesCount > 0 && <span className={styles.badge}>{favoritesCount}</span>}
            <span className={styles.favoritesText}>Favorites</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
