import React, { useState, lazy, Suspense } from "react";
import Loader from "react-loader-spinner";
import "./styles/Table.scss";

// Lazy load the Modal component to when it is invoked
const Modal = lazy(() => import("./Modal"));

function Table({ columnHeaders, data }) {
  const [showModal, setShowModal] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(
    <h3>Placeholder</h3>
  );

  function displayModal(e) {
    setShowModal(true);

    const nodeList = e.currentTarget.querySelectorAll("td");
    let rowItems = [];
    nodeList.forEach(function (val) {
      rowItems.push(val.innerHTML);
    });

    const modalBody = (
      <div>
        {rowItems.map((r, idx) => (
          <span className="modal__item" key={idx}>
            {r}
          </span>
        ))}
      </div>
    );

    setTransactionDetails(modalBody);
  }

  function handleKey(e) {
    if ([" ", "Enter"].includes(e.key)) {
      displayModal(e);
    }
  }

  function _renderTableData({ Date, Company, Ledger, Amount, id }) {
    return (
      <tr
        tabIndex={0}
        onClick={(e) => displayModal(e)}
        onKeyPress={(e) => handleKey(e)}
        className="table__row"
        key={id}
      >
        <td className="table__element table__element--light">{Date}</td>
        <td className="table__element">{Company}</td>
        <td className="table__element table__element--light">{Ledger}</td>
        <td className="table__element">{Amount}</td>
      </tr>
    );
  }

  function _renderTableHeader(columnHeaders = []) {
    return (
      <tr className="table__header">
        {columnHeaders.map((col) => (
          <th className="table__element" key={col}>
            {col}
          </th>
        ))}
      </tr>
    );
  }

  return (
    <>
      <table className="table">
        <tbody>
          {_renderTableHeader(columnHeaders)}
          {data.map((row, id) => _renderTableData({ ...row, id }))}
        </tbody>
      </table>
      {showModal ? (
        <Suspense
          fallback={
            <Loader
              className="loader"
              type="Grid"
              color="#098b8c"
              height={80}
              width={80}
            />
          }
        >
          <Modal setShowModal={setShowModal}>
            <h1>Transaction Details</h1>
            {transactionDetails}
          </Modal>
        </Suspense>
      ) : null}
    </>
  );
}

export default Table;
