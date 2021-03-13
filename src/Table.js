import React from "react";

function Table({ columns }) {
  return (
    <table className="table">
      <tbody>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
