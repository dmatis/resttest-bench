import React from "react";
import "./styles/Table.scss";

function Table({ columns, columnHeaders, data }) {
  console.log(data);

  function _renderTableData(row, id) {
    return (
      <tr className="table__row" key={id}>
        {columns.map((col) => (
          <td key={col} className="table__element">
            {row[col]}
          </td>
        ))}
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
        {data.map((row, id) => _renderTableData(row, id))}
      </tbody>
    </table>
  );
}

export default Table;
