import React, { Component } from "react";

const Pagination = ({
  currentPage,
  itemsPerPage,
  itemsCount,
  onPageChanged
}) => {
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);

  const pages = Array(pagesCount)
    .fill("x")
    .map((x, i) => i + 1);

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

        {pages.map(page => (
          <li
            key={page}
            className={"page-item " + (currentPage === page ? "active" : "")}
          >
            <button className="page-link" onClick={() => onPageChanged(page)}>
              {page}
            </button>
          </li>
        ))}

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
