import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./style.scss";

const Input = ({
  type = "text",
  placeholder = "",
  onChange = () => {},
  value,
  fluid,
  className,
}) => {
  const classes = classNames("control", "input", { fluid: fluid }, className);
  return (
    <input
      className={classes}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  fluid: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
