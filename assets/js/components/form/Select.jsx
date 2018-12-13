import React from "react";

const Select = ({ name, label, children, error, help, onChange, value }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={"form-control " + (error ? "is-invalid" : "")}
      >
        {children}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
      {help && !error && <small className="text-faded">{help}</small>}
    </div>
  );
};

export default Select;
