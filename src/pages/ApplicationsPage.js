import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import {
  parseResponse,
  filterAndSortCandidates,
  parseQueryStringObject,
} from "../utils";
import Table from "../components/Table";
import FilterSection from "../components/FilterSection";
import Spinner from "../components/Spinner";
import ErrorState from "../components/ErrorState";

const ApplicationsPage = (props) => {
  const [candidates, setCandidates] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [isSortAscending, setIsSortAscending] = useState(false);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();

  // Fetch candidates on first render
  useEffect(() => {
    async function fetchCandidates() {
      try {
        const response = await fetch(
          "https://personio-fe-test.herokuapp.com/api/v1/candidates",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
		const data = await response.json();
		const parsedResponse = parseResponse(data.data);
        setCandidates(parsedResponse);
      } catch (error) {
		setError(true);
      } finally {
		  setIsLoading(false);
      }
    }
	setIsLoading(true);
	fetchCandidates()
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

  if (error) {
    return <ErrorState />;
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
        <Spinner />
      ) : (
        <Table data={filteredCandidates} onSort={handleSort} />
      )}
    </div>
  );
};

export default ApplicationsPage;
