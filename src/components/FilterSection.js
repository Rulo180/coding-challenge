import React, { useEffect, useReducer } from "react";
import queryString from "query-string";
import omit from "lodash/omit";

import { setQueryString } from "../utils";
import { STATUS_OPTIONS } from "../constants";

import "./FilterSection.scss";

const reducer = (state, action) => {
  const { field, value } = action;
  // removes empty values
  if (value === "") {
    return omit(state, [field]);
  }
  return { ...state, [field]: value };
};

const FilterSection = ({ initialFilters, onSubmit }) => {
  const [filters, dispatch] = useReducer(reducer, initialFilters);

  useEffect(() => {
    initialFilters.forEach((filter) => dispatch(filter));
  }, [initialFilters]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch({ field: name, value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const filtersObj = Object.keys(filters).map((field) => {
      return { field, value: filters[field] };
    });

    const queryParams = queryString.stringify(filters);

    setQueryString(queryParams);

    onSubmit(filtersObj);
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    dispatch({ field: name, value });
  };

  const statusFilter = (
    <select
      id="inputStatus"
      name="status"
      value={filters.status}
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
    <div className="filters">
      <form onSubmit={handleOnSubmit}>
        <div className="row align-items-end">
          <div className="col col-3 filters_filter">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              name="name"
              value={filters.name?filters.name:''}
              onChange={handleOnChange}
            ></input>
          </div>
          <div className="col col-3 filters_filter">
            <label htmlFor="inputStatus" className="form-label">
              Status
            </label>
            {statusFilter}
          </div>
		  <div className="col col-3"></div>
          <div className="col-3 text-end">
            <button type="submit" className="btn btn-primary filters__button">
              Filter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterSection;
