import React from "react";
import "./InputRounded.css";

const InputRounded = ({
  name,
  type,
  extraClassLabel,
  extraClassInput,
  labelText,
  placeholder,
  required,
  disabled,
  styleLabel,
  styleInput,
  handleFocus,
  handleBlur,
  validate,
  readonly,
  handleChange,
  value,
}) => {
  const getInputClass = () => {
    if (validate === "yes") {
      return "inputRounded-input-validationSuccess";
    }
    if (validate === "no") {
      return "inputRounded-input-validationError";
    }
    return "inputRounded-input";
  };
  const getLabelClass = () => {
    if (validate === "yes") {
      return "inputRounded-label-validationSuccess";
    }
    if (validate === "no") {
      return "inputRounded-label-validationError";
    }
    return "inputRounded-label";
  };

  return (
    <>
      <div>
        <label
          htmlFor={name}
          className={`${getLabelClass()} ${extraClassInput}`}
          style={styleLabel}
        >
          {labelText}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          className={`${getInputClass()} ${extraClassInput} read-only:border-0 read-only:focus:border-0 read-only:focus:ring-0`}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          style={styleInput}
          readOnly={readonly}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          value={value}
        />
      </div>
    </>
  );
};

export default InputRounded;
