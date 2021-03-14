import React from "react";
import "./styles/Table.scss";

function Table({ columnHeaders, data }) {
  function _renderTableData({ Date, Company, Ledger, Amount, id }) {
    return (
      <tr tabIndex={0} className="table__row" key={id}>
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
    <table className="table">
      <tbody>
        {_renderTableHeader(columnHeaders)}
        {data.map((row, id) => _renderTableData({ ...row, id }))}
      </tbody>
    </table>
  );
}

export default Table;
