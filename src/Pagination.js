import React from "react";
import "./styles/Pagination.scss";

// TODO:
// Figure out when to disable the Prev and Next buttons
// Prev: When page is 1, disable Prev
// Next: prevPage * 10 + transactions.length => 1 * 10 = 10 records, 2 * 10 = 20 records

function Pagination(props) {
  const { page = 1, isLastPage = false, fetchTransactions } = props;
  return (
    <div className="pagination">
      <button
        disabled={page == 1}
        onClick={() => fetchTransactions(page - 1)}
        className="pagination__button"
      >
        Prev
      </button>
      <span className="pagination__page">{page}</span>
      <button
        disabled={isLastPage}
        onClick={() => fetchTransactions(page + 1)}
        className="pagination__button"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
