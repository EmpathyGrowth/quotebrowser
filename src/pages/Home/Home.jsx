import React, { useEffect, useState, useCallback } from "react";
import { useFavorites } from '../../hooks/useFavorites';
import styles from "./Home.module.css"; 
import appStyles from "../../App.module.css"; 

import SortDropdown from "../../components/SortDropdown/SortDropdown";
import QuoteList from "../../components/QuoteList/QuoteList";
import AuthorFilter from "../../components/AuthorFilter/AuthorFilter";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import Pagination from "../../components/Pagination/Pagination";

export default function HomePage() {
  const applyFilterAndResetPage = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const [quotes, setQuotes] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quotesPerPage] = useState(12);


  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch("https://dummyjson.com/quotes?limit=150&skip=0");
        const data = await res.json();
        setQuotes(data.quotes || []);
        const uniqueAuthors = [...new Set((data.quotes || []).map((q) => q.author))];
        setAuthors([...uniqueAuthors].sort()); 
      } catch (err) {
        console.error("Error fetching quotes:", err);
        setQuotes([]);
        setAuthors([]);
      }
    };
    fetchQuotes();
  }, []);

  const getFilteredAndSortedQuotes = () => {
    let filtered = [...quotes];

    if (selectedAuthor) {
      filtered = filtered.filter((quote) => quote.author === selectedAuthor);
    }

    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (quote) =>
          (quote.quote && quote.quote.toLowerCase().includes(lowerSearchTerm)) ||
          (quote.author && quote.author.toLowerCase().includes(lowerSearchTerm)) 
      );
    }

    if (sortBy === "author_az") {
      filtered.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortBy === "author_za") {
      filtered.sort((a, b) => b.author.localeCompare(a.author));
    } else if (sortBy === "length_asc") {
      filtered.sort((a, b) => a.quote.length - b.quote.length);
    } else if (sortBy === "length_desc") {
      filtered.sort((a, b) => b.quote.length - a.quote.length);
    }
    return filtered;
  };

  const sortedFilteredQuotes = getFilteredAndSortedQuotes();

  // Pagination logic
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = sortedFilteredQuotes.slice(indexOfFirstQuote, indexOfLastQuote);
  const totalPages = Math.ceil(sortedFilteredQuotes.length / quotesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSortBy("");
    setSearchTerm("");
    setSelectedAuthor("");
    setCurrentPage(1);
  };

  const { favoriteIds, toggleFavorite: toggleFavoriteFromHook } = useFavorites();

  const handleToggleFavorite = useCallback((quoteId) => {
    const quote = quotes.find(q => q.id === quoteId);
    if (quote || favoriteIds.includes(quoteId)) {
      toggleFavoriteFromHook(quoteId, quote);
    } else {
      console.error("Quote object not found for ID during toggleFavorite:", quoteId);
    }
  }, [quotes, toggleFavoriteFromHook, favoriteIds]);


  return (
    <div className={`${appStyles.pageContainer} ${styles.homeContainer}`}>
      <div className={`${appStyles.glassPanel} ${styles.controlsContainer}`}>
        <SearchFilter searchTerm={searchTerm} setSearchTerm={(value) => applyFilterAndResetPage(setSearchTerm, value)} />
        <AuthorFilter
          authors={authors}
          selectedAuthor={selectedAuthor}
          setSelectedAuthor={(value) => applyFilterAndResetPage(setSelectedAuthor, value)}
        />
        <SortDropdown sortBy={sortBy} setSortBy={(value) => applyFilterAndResetPage(setSortBy, value)} />
        <button onClick={handleResetFilters} className={`${appStyles.glassPanel} ${styles.resetButton}`}> 
          Reset Filters
        </button>
      </div>

      <div className={`${appStyles.glassPanel} ${styles.listContainer}`}>
        {sortedFilteredQuotes.length > 0 ? (
          <QuoteList 
            quotes={currentQuotes} 
            onToggleFavorite={handleToggleFavorite} 
            favorites={favoriteIds} 
          />
        ) : (
          <p>No quotes found matching your criteria. Try adjusting your filters.</p>
        )}
        {currentQuotes.length === 0 && sortedFilteredQuotes.length > 0 && <p>No quotes on this page, but quotes exist matching your criteria.</p>}
        {totalPages > 1 && (
          <Pagination 
            page={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        )}
      </div>
    </div>
  );
}
