import React from "react";
// import "./InputFloater.css";

const InputFloater = ({
  name,
  value,
  handleChange,
  label,
  elementClass,
  type,
  disabled,
  required,
  error,
}) => {
  return (
    <div className={`relative ${elementClass}`}>
      <input
        type={type}
        className={`inputFloater ${error ? "validFalse" : "validTrue"} peer`}
        id={name}
        placeholder=" "
        value={value}
        onChange={handleChange}
        name={name}
        disabled={disabled}
        required={required}
      />
      <label htmlFor={name} className="labelLogin">
        {label}{" "}
        {error && <span className="italic text-sm text-red-300">{error}</span>}
      </label>
    </div>
  );
};

export default InputFloater;
