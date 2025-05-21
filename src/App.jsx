import { useState, useEffect } from 'react';
import { useFavorites } from './hooks/useFavorites';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Header from './components/Header/Header'; 
import HomePage from './pages/Home/Home';
import QuoteDetailPage from './pages/QuoteDetail/QuoteDetail';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';

import { ThemeContext } from './context/ThemeContext';

export default function App() {
  const { favoritesCount } = useFavorites();
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });


  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <Header favoritesCount={favoritesCount} /> 
        <div className={styles.appContainer}>
          <main className={styles.mainContent}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quote/:id" element={<QuoteDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}
