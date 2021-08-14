import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import queryString from "query-string";

import Table from "./components/Table";
import "./App.scss";
import {
  parseResponse,
  filterAndSortCandidates,
  parseQueryStringObject,
} from "./utils";
import FilterSection from "./components/FilterSection";


const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [isSortAscending, setIsSortAscending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const filteredCandidates = useMemo(
    () =>
      filterAndSortCandidates({candidates, filters, sortColumn, isSortAscending}),
    [candidates, filters, sortColumn, isSortAscending]
  );

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
    const qs = window.location.search;
    const queryStringObj = queryString.parse(qs);

    const newFilters = parseQueryStringObject(queryStringObj);

    if (newFilters) {
      setFilters(newFilters);
    }
  }, []);

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        An error has ocurred!{" "}
        <a href="javascript:history.go(0)">Click here to refresh the page</a>
      </div>
    );
  }

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

  return (
    <div className="container">
      <div className="row mt-2 mb-4">
        <div className="col">
          <h1>Applications</h1>
        </div>
      </div>
      <FilterSection onSubmit={setFilters} initialFilters={filters} />
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

const mapStateToProps = (state) => {
  return {
    candidates: state.candidates,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCandidates: dispatch({
    type: "FETCH_DATA",
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
