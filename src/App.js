import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

import Table from "./components/Table";
import "./App.scss";
import { parseResponse, sortCandidatesBy, filterCandidates } from "./utils";
import { STATUS_OPTIONS } from "./constants";

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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error: ", err)
        setIsError(true);
      });
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

  const handleSelect = (e) => {
    setFilters([{ field: "status", value: e.target.value }]);
  };

  const statusFilter = (
    <select
      id="inputStatus"
      defaultValue=""
      className="form-select"
      onChange={handleSelect}
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1>Applications</h1>
        </div>
      </div>
      <div className="row">
        <div className="col col-4">
          <label htmlFor="inputStatus" className="form-label">
            Status
          </label>
          {statusFilter}
        </div>
      </div>
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
