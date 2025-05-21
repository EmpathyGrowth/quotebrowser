import styles from './SortDropdown.module.css';
import { FaChevronDown } from 'react-icons/fa';

export default function SortDropdown({ sortBy, setSortBy }) {
    return (
        <div className={styles.dropdown}>
            <label htmlFor="sort">Sort by</label>
            <div className={styles.selectWrapper}>
                <select id="sort" className={styles.selectElement} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">Latest</option>
                    <option value="length_desc">Length (longest to shortest)</option>
                    <option value="length_asc">Length (shortest to longest)</option>
                    <option value="author_az">Author (A-Z)</option>
                    <option value="author_za">Author (Z-A)</option>
                </select>
                <FaChevronDown className={styles.dropdownIcon} />
            </div>
        </div>
    )
}