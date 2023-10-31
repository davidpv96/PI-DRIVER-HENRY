import React from 'react';

const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
  const pageNumbers = [];
  const maxPageButtonsToShow = 5; // Número máximo de botones de página a mostrar

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const isAtFirstPage = currentPage === 1;
  const isAtLastPage = currentPage === pageNumbers.length;

  // Calcula el rango de páginas a mostrar
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtonsToShow / 2));
  const endPage = Math.min(pageNumbers.length, startPage + maxPageButtonsToShow - 1);

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isAtFirstPage}
          >
            Prev
          </button>
        </li>
        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isAtLastPage}
          >
            Next
          </button>
        </li>
      </ul>
      <p>
        Página {currentPage} de {pageNumbers.length} páginas
      </p>
    </div>
  );
};

export default Pagination;