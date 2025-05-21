import styles from './Pagination.module.css';

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className={styles.paginationContainer}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      <span> Page {page} of {totalPages} </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
