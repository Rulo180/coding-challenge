import React from "react";
import classNames from "classnames";
import isEmpty from "lodash/isEmpty";

import { getAge } from "../utils";
import { CANDIDATES_COLUMNS } from "../constants";
import SearchImage from "../images/search-image.svg";

import "./Table.scss";

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
      {isEmpty(data) ? (
        <tr>
          <td colSpan="7">
            <div className="empty-state">
              <div className="row justify-content-center pt-5 pb-5">
                <div className="col-6">
                  <div className="empty-state__icon">
                    <img width="50" src={SearchImage} alt="Search icon" />
                  </div>
                  <h3 className="empty-state__title">No results found</h3>
                  <p className="empty-state__description">
                    It seems there are no candidates who match all the criteria.
                    Try adjusting your filters to find what you are looking for.
                  </p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      ) : (
        <tbody>{rows}</tbody>
      )}
    </table>
  );
};

export default Table;
