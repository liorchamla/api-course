import React from "react";

const Input = ({
  name,
  value = "",
  type = "text",
  placeholder,
  label,
  error,
  onChange,
  help
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type || "text"}
        className={"form-control " + (error ? "is-invalid" : "")}
        placeholder={placeholder}
        value={value}
        name={name}
        id={name}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {!error && help && <small className="text-muted">{help}</small>}
    </div>
  );
};

export default Input;
