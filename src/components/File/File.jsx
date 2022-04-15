import React from "react";
import Icon from "../Icon";
import "./style.scss";
import PropTypes from "prop-types";
import classNames from "classnames";

const File = ({
  filename = "",
  icon = "file",
  className = "",
  onClick = () => {},
  onDoubleClick = () => {},
}) => {
  const fileClasses = classNames("file", "selected");
  const containerClasses = classNames("file-container", "className");
  return (
    <div className={containerClasses}>
      <div
        className={fileClasses}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        <div className="file-icon">
          <Icon name={icon} size="large"></Icon>
        </div>
        <div className="file-name">{filename}</div>
      </div>
    </div>
  );
};
File.propTypes = {
  filename: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
};

export default File;
