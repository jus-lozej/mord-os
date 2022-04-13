import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const Icon = ({ name = "folder", size = "normal" }) => {
  const iconClass = classNames("uil", `uil-${name}`);
  const classes = classNames("icon", size);
  return (
    <span className={classes}>
      <i className={iconClass}></i>
    </span>
  );
};
Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.oneOf(["small", "normal", "large"]),
};

export default Icon;
