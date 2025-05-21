import styles from './SearchFilter.module.css';
import appStyles from '../../App.module.css';

export default function SearchFilter({ searchTerm, setSearchTerm }) {
    return (
        <div className={styles.search}>
            <label htmlFor="search">Search</label>
            <input type="text" id="search" placeholder="Search Keywords or Author" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={appStyles.glassTextInput} />
        </div>
    )
}