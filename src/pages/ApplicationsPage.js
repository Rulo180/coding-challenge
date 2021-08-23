import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import Table from "../components/Table";
import FilterSection from "../components/FilterSection";
import {
  parseResponse,
  filterAndSortCandidates,
  parseQueryStringObject,
} from "../utils";

const ApplicationsPage = (props) => {
  const [candidates, setCandidates] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [isSortAscending, setIsSortAscending] = useState(false);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  // Fetch candidates on first render
  useEffect(() => {
    fetch("https://personio-fe-test.herokuapp.com/api/v1/candidates", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const parsedResponse = parseResponse(response.data);
        setCandidates(parsedResponse);
        const qs = window.location.search;
        const queryStringObj = queryString.parse(qs);

        const newFilters = parseQueryStringObject(queryStringObj);

        if (newFilters) {
          setFilters(newFilters);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error: ", err);
        setIsError(true);
      });
  }, []);

  // Set the filters based on the url params
  useEffect(() => {
    const queryStringObj = queryString.parse(location.search);

    const newFilters = parseQueryStringObject(queryStringObj);

    if (newFilters) {
      setFilters(newFilters);
    }
  }, []);

  const filteredCandidates = useMemo(
    () =>
      filterAndSortCandidates({
        candidates,
        filters,
        sortColumn,
        isSortAscending,
      }),
    [candidates, filters, sortColumn, isSortAscending]
  );

  const handleSort = (column) => {
    let newSorting = isSortAscending;
    if (column !== sortColumn) {
      newSorting = false;
    } else {
      newSorting = !isSortAscending;
    }
    setIsSortAscending(newSorting);

    setSortColumn(column);
  };

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        An error has ocurred!{" "}
        <a href="javascript:history.go(0)">Click here to refresh the page</a>
      </div>
    );
  }

  const handleOnSubmit = (filters) => {
    const queryParams = queryString.stringify(filters);
    props.history.push(`?${queryParams}`);
    setFilters(parseQueryStringObject(filters));
  };

  return (
    <div className="container">
      <div className="row mt-2 mb-4">
        <div className="col">
          <h1>Applications</h1>
        </div>
      </div>
      <FilterSection onSubmit={handleOnSubmit} initialFilters={filters} />
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <Table data={filteredCandidates} onSort={handleSort} />
      )}
    </div>
  );
};

export default ApplicationsPage;
