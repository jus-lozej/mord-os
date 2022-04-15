import React from "react";
import File from "../../components/File";
import { getRouteFiles } from "../../utils/filesystem";
import PropTypes from "prop-types";
import "./style.scss";
import classNames from "classnames";

const FileView = ({ route = "", changeRoute = () => {} }) => {
  const files = getRouteFiles(route);

  const fileComponents = Object.keys(files).map((filename) => {
    const fileClasses = classNames({ selected: files[filename].selected });
    if (files[filename].type === "directory") {
      return (
        <File
          key={filename}
          filename={filename}
          className={fileClasses}
          icon="folder"
          onDoubleClick={() => changeRoute(route + `/${filename}`)}
        ></File>
      );
    }
    if (files[filename].type === "text") {
      return (
        <File
          key={filename}
          filename={filename}
          icon="file"
          className={fileClasses}
        ></File>
      );
    }
  });

  const goBack = () => {
    const previous = route.split("/");
    previous.pop();
    changeRoute(previous.join("/"));
  };

  return (
    <div className="file-grid">
      {route !== "" ? (
        <File
          key={"..back"}
          filename={".."}
          icon="folder"
          onDoubleClick={goBack}
        ></File>
      ) : null}
      {fileComponents}
    </div>
  );
};
FileView.propTypes = {
  route: PropTypes.string,
  changeRoute: PropTypes.func,
};

export default FileView;