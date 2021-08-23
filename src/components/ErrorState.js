import React from "react";

const ErrorState = () => {
  return (
    <div className="alert alert-danger" role="alert">
      An error has ocurred!{" "}
      <a href="javascript:history.go(0)">Click here to refresh the page</a>
    </div>
  );
};

export default ErrorState;
