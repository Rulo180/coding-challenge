import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import queryString from "query-string";

import Table from "./components/Table";
import "./App.scss";
import {
  parseResponse,
  sortCandidatesBy,
  filterCandidates,
  parseQueryStringObject,
} from "./utils";
import FilterSection from "./components/FilterSection";

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
        setFilteredCandidates(parsedResponse);
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

  useEffect(() => {
    const qs = window.location.search;
    const queryStringObj = queryString.parse(qs);

    const newFilters = parseQueryStringObject(queryStringObj);

    if (newFilters) {
      setFilters(newFilters);
    }
  }, []);

  useEffect(() => {
    let filteredCandidates = filterCandidates(candidates, filters);
    if (sortColumn) {
      filteredCandidates = sortCandidatesBy(filteredCandidates, sortColumn);
    }
    setFilteredCandidates(filteredCandidates);
  }, [filters]);

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        An error has ocurred!
      </div>
    );
  }

  const handleSort = (sortColumn) => {
    const sortedCandidates = sortCandidatesBy(filteredCandidates, sortColumn);
    setFilteredCandidates(sortedCandidates);
    setSortColumn(sortColumn);
  };

  return (
    <div className="container-fluid">
      <div className="row">
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
