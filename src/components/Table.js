import React from "react";

import { getAge } from "../utils";

const Table = ({ data }) => {
  const rowNodes = Object.values(data).map((candidate) => {
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
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Age</th>
          <th scope="col">Years of experience</th>
          <th scope="col">Position applied</th>
          <th scope="col">Application date</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>{rowNodes}</tbody>
    </table>
  );
};

export default Table;
