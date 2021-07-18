import React, { useState } from "react";
import classNames from "classnames";

import { getAge, sortCandidatesBy } from "../utils";
import "./Table.scss";
import { CANDIDATES_COLUMNS } from "../constants";

const Table = ({ data }) => {
  const [candidates, setCandidates] = useState(data);

  const rows = Object.values(candidates).map((candidate) => {
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
        onClick={() => handleSort(column)}
      >
        {columnData.display}
      </th>
    );
  });

  const handleSort = (sortColumn) => {
    const sortedCandidates = sortCandidatesBy(data, sortColumn);
    setCandidates(sortedCandidates);
  };

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
