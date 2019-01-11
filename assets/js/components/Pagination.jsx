import React from "react";

const createPages = (currentPage, pagesCount) => {
  let last = pagesCount,
    delta = 2,
    left = currentPage - delta,
    right = currentPage + delta + 1,
    range = [],
    pages = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        pages.push(l + 1);
      } else if (i - l !== 1) {
        pages.push("...");
      }
    }
    pages.push(i);
    l = i;
  }

  return pages;
};

const Pagination = ({
  currentPage,
  itemsPerPage,
  itemsCount,
  onPageChanged
}) => {
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);

  const pages = createPages(currentPage, pagesCount);

  return (
    <div>
      <ul className="pagination">
        <li className={"page-item " + (currentPage === 1 ? "disabled" : "")}>
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>

        {pages.map(
          page =>
            (!isNaN(page) && (
              <li
                key={page}
                className={
                  "page-item " + (currentPage === page ? "active" : "")
                }
              >
                <button
                  className="page-link"
                  onClick={() => onPageChanged(page)}
                >
                  {page}
                </button>
              </li>
            )) || (
              <li key={Math.random()} className="page-item disabled">
                <button className="page-link">...</button>
              </li>
            )
        )}

        <li
          className={
            "page-item " + (currentPage === pagesCount ? "disabled" : "")
          }
        >
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.getPaginatedData = (data, currentPage, itemsPerPage) => {
  const start = currentPage * itemsPerPage - itemsPerPage;
  const end = start + itemsPerPage;

  return data.slice(start, end);
};

export default Pagination;
