import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  icon
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text p-0" style={{ width: "42px" }}>
          <i className={icon}></i>
        </span>
      </div>
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <div className="invalid-feedback">{error ? error : ""}</div>
    </div>
  );
};

InputGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  error: propTypes.string,
  type: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  icon: propTypes.string
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
