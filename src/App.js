import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

import Table from "./components/Table";
import "./App.scss";
import { parseResponse } from "./utils";

const App = () => {
  const [candidates, setCandidates] = useState([]);
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
        setCandidates(parseResponse(response.data));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, []);

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        An error has ocurred!
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1>Applications</h1>
        </div>
      </div>
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <Table data={candidates} />
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
