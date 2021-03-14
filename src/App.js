import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import NumberFormat from "react-number-format";
import Header from "./Header";
import Table from "./Table";
import Pagination from "./Pagination";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // This idea was considered for dynamically generating table headers
  // but was dropped because the order of the keys from the API is not necessarily
  // how we would want to display it
  // function getColumns() {
  //   if (transactions.length > 0) {
  //     return Object.keys(transactions[0]);
  //   }
  // }

  function sumTransactions() {
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

  function fetchTransactions(page = 1) {
    fetch(`https://resttest.bench.co/transactions/${page}.json`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((data) => {
        const { transactions, totalCount } = data;
        setTransactions(transactions);
        setPage(page);
        setTotalCount(totalCount);
      })
      .catch(() => alert("Uh oh! We were unable to fetch the data!"));
  }

  // PreviousPage * NumElementsPerPage + NumElementsCurrentPage >= totalCount
  function isLastPage() {
    return (page - 1) * 10 + transactions.length >= totalCount;
  }

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  useEffect(() => {
    setAmount(sumTransactions());
  }, [transactions]);

  const formattedAmount = (
    <NumberFormat
      value={amount}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"$"}
    />
  );

  return (
    <>
      <Header />
      <Table
        columns={["Date", "Company", "Ledger", "Amount"]}
        columnHeaders={["Date", "Company", "Ledger", formattedAmount]}
        data={transactions}
      />
      <Pagination
        page={page}
        isLastPage={isLastPage()}
        fetchTransactions={fetchTransactions}
      />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
