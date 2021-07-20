import React, { useReducer } from "react";

import { STATUS_OPTIONS } from "../constants";

const initialState = {
    name: "",
    status: "",
  };

  const reducer = (state, action) => {
    const { field, value } = action;
    return { ...state, [field]: value };
  };

const FilterSection = ({ onSubmit }) => {
  const [filters, dispatch ] = useReducer(reducer, initialState);

  const handleOnChange = (e) => {
	const {name, value} = e.target;
	dispatch({field: name, value});
}

  const handleOnSubmit = (event) => {
    event.preventDefault();
	const filtersObj = Object.keys(filters).map((field) => {
		return { field, value: filters[field] }
	})
	onSubmit(filtersObj)
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    dispatch({ field: name, value });
    // onSelect([{ field: "status", value: e.target.value }]);
  };

  const statusFilter = (
    <select
      id="inputStatus"
      name="status"
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
    <form onSubmit={handleOnSubmit}>
      <div className="row">
        <div className="col col-4">
          <label htmlFor="inputStatus" className="form-label">
            Status
          </label>
          {statusFilter}
        </div>
        <div className="col col-4">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            name="name"
			onChange={handleOnChange}
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Filter
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterSection;
