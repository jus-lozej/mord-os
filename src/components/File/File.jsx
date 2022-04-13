import React from "react";
import Icon from "../Icon";
import "./style.scss";
import PropTypes from "prop-types";

const File = ({ filename = "", icon = "file", onClick = () => {} }) => {
  return (
    <div className="file-container">
      <div className="file" onClick={onClick}>
        <div className="file-icon">
          <Icon name={icon}></Icon>
        </div>
        <div className="file-name">{filename}</div>
      </div>
    </div>
  );
};
File.propTypes = {
  filename: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export default File;
