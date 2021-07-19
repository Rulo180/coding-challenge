import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { getAge } from "../utils";
import "./Table.scss";
import { CANDIDATES_COLUMNS } from "../constants";

const Table = ({ data, onSort }) => {
  const rows = Object.values(data).map((candidate) => {
    const {
      id,
      name,
      email,
      birthDate,
      status,
      yearOfExperience,
      positionApplied,
      applicationDate,
    } = candidate;
    return (
      <tr key={id}>
        <td>{name}</td>
        <td>{email}</td>
        <td>{getAge(birthDate)}</td>
        <td>{yearOfExperience}</td>
        <td>{positionApplied}</td>
        <td>{applicationDate}</td>
        <td>{status}</td>
      </tr>
    );
  });

  const tableHeaders = Object.keys(CANDIDATES_COLUMNS).map((column) => {
    const columnData = CANDIDATES_COLUMNS[column];
    const thClassnames = classNames({
      "table__theader--sortable": columnData.isSortable,
    });

    return (
      <th
        key={column}
        scope="col"
        className={thClassnames}
        onClick={() => {
          if (onSort) {
            onSort(column);
          }
        }}
      >
        {columnData.display}
      </th>
    );
  });

  return (
    <table className="table table-striped">
      <thead>
        <tr>{tableHeaders}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
