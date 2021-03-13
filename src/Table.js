import React from "react";
import "./styles/Table.scss";

// TODO: abstract this so it has no pre-existing awareness of columns
// pass in a prop called colNames
function renderTableData({ Date, Ledger, Amount, Company, id }) {
  return (
    <tr className="table__row" key={id}>
      <td className="table__element">{Date}</td>
      <td className="table__element">{Company}</td>
      <td className="table__element">{Ledger}</td>
      <td className="table__element">{Amount}</td>
    </tr>
  );
}

function renderTableHeader(columns = []) {
  return (
    <tr className="table__header">
      {columns.map((col) => (
        <th className="table__element" key={col}>
          {col}
        </th>
      ))}
    </tr>
  );
}

function Table({ columns, data }) {
  console.log(data);
  return (
    <table className="table">
      <tbody>
        {renderTableHeader(columns)}
        {data.map((row, id) => renderTableData({ ...row, id }))}
      </tbody>
    </table>
  );
}

export default Table;
