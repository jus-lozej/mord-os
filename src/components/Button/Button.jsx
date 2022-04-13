import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
const Button = ({
  children = "",
  onClick = () => {},
  type = "button",
  className = "",
}) => {
  const classes = classNames("control", "button", className);
  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
