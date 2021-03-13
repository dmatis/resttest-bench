import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Table from "./Table";

// TODO:
// totalCount contains the number of entries across all pages
// each page by default has up to 10 entries
// have a while loop that fetches while there are entries still to fetch
// handle error cases
// if time, create a pagination component

// Assume:
// Columns are based on the values returned in transactions

function App() {
  // Initial data fetch
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch("https://resttest.bench.co/transactions/1.json")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.transactions);
      });
  }, []);

  return (
    <>
      <Header />
      <Table
        columns={["Date", "Company", "Ledger", "Amount"]}
        data={transactions}
      />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
