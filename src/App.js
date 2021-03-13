import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import NumberFormat from "react-number-format";
import Header from "./Header";
import Table from "./Table";

// TODO:
// totalCount contains the number of entries across all pages
// each page by default has up to 10 entries
// have a while loop that fetches while there are entries still to fetch
// handle error cases
// if time, create a pagination component

function App() {
  // Initial data fetch
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState(0);

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

  useEffect(() => {
    fetch("https://resttest.bench.co/transactions/1.json")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.transactions);
      });
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
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
