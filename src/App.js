import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import NumberFormat from "react-number-format";
import dateFormat from "dateformat";
import Loader from "react-loader-spinner";
import Header from "./Header";
import Table from "./Table";
import Pagination from "./Pagination";
import ErrorBoundary from "./ErrorBoundary";
import "./styles/Loader.scss";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function sumTransactions(transactions) {
    if (transactions.length > 0) {
      return transactions
        .map((t) => parseFloat(t.Amount))
        .reduce((sum, val) => sum + val)
        .toFixed(2);
    }
    return 0;
  }

  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  function formatAmount(amount) {
    return (
      <NumberFormat
        value={amount}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={2}
        fixedDecimalScale
        prefix={"$"}
      />
    );
  }

  function formatTransactions(transactions) {
    transactions.forEach((t) => {
      if (t.Date) {
        t.Date = dateFormat(t.Date, "mmm dS, yyyy");
      }

      if (t.Amount) {
        t.Amount = formatAmount(t.Amount);
      }
    });
  }

  async function fetchTransactions(page = 1) {
    try {
      setIsLoading(true);
      let res = await fetch(
        `https://resttest.bench.co/transactions/${page}.json`
      );

      const data = await handleErrors(res).json();
      const { transactions, totalCount } = data;
      setAmount(sumTransactions(transactions));
      formatTransactions(transactions);
      setTransactions(transactions);
      setPage(page);
      setTotalCount(totalCount);
      setIsLoading(false);
    } catch {
      alert("Uh oh! We were unable to fetch the data!");
    }
  }

  // PreviousPage * NumElementsPerPage + NumElementsCurrentPage >= totalCount
  function isLastPage() {
    return (page - 1) * 10 + transactions.length >= totalCount;
  }

  // Fetch the first page of transactions on initial page load
  useEffect(() => {
    fetchTransactions(1);
  }, []);

  return (
    <>
      <Header title="Bench Test" />
      {isLoading ? (
        <Loader
          className="loader"
          type="Grid"
          color="#098b8c"
          height={80}
          width={80}
        />
      ) : (
        <>
          <Table
            columnHeaders={["Date", "Company", "Ledger", formatAmount(amount)]}
            data={transactions}
          />
          <Pagination
            page={page}
            isLastPage={isLastPage()}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </>
  );
}

export default function AppErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

ReactDOM.render(<AppErrorBoundary />, document.getElementById("root"));
