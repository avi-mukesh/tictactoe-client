import React from "react";

const ValidationError = ({ children }) => {
  return <p className="validation-error">{children}</p>;
};

export default ValidationError;
