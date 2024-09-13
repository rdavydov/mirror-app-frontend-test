import React from "react";

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const maxPagesToShow = 7;
  const halfRange = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(2, currentPage - halfRange);
  let endPage = Math.min(totalPages - 1, currentPage + halfRange);

  if (currentPage <= halfRange) {
    endPage = Math.min(totalPages - 1, maxPagesToShow - 1);
  }

  if (currentPage + halfRange >= totalPages) {
    startPage = Math.max(2, totalPages - maxPagesToShow + 1);
  }

  if (totalPages > 1) {
    pageNumbers.push(1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Добавляем последнюю страницу
  if (totalPages > 1) {
    pageNumbers.push(totalPages);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number, index) =>
          (index === 1 && number > 2) ||
          (index === pageNumbers.length - 2 && number < totalPages - 1) ? (
            <li key={number}>
              <span>...</span>
            </li>
          ) : (
            <li key={number} className={currentPage === number ? "active" : ""}>
              <button onClick={() => paginate(number)}>{number}</button>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
