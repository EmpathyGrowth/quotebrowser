import styles from "./AuthorFilter.module.css";
import { FaChevronDown } from 'react-icons/fa';

export default function AuthorFilter({
  authors,
  selectedAuthor,
  setSelectedAuthor,
}) {
  return (
    <div className={styles.author}>
      <label htmlFor="author">Forfatter</label>
      <div className={styles.selectWrapper}>
          <select
            id="author"
            className={styles.selectElement}
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">All</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author.charAt(0).toUpperCase() + author.slice(1)}
              </option>
            ))}
          </select>
          <FaChevronDown className={styles.dropdownIcon} />
      </div>
    </div>
  );
}
