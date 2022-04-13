import React, { useState } from "react";
import "./style.scss";
import File from "../../components/File";
import { getRouteFiles } from "../../utils/filesystem";
import PropTypes from "prop-types";

const FileView = ({ route = "", changeRoute = () => {} }) => {
  const files = getRouteFiles(route);

  const fileComponents = Object.keys(files).map((filename) => {
    if (files[filename].type === "directory") {
      return (
        <File
          filename={filename}
          icon="folder"
          onClick={() => changeRoute(route + `/${filename}`)}
        ></File>
      );
    }
    if (files[filename].type === "text") {
      return <File filename={filename} icon="file"></File>;
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
        <File filename={".."} icon="folder" onClick={goBack}></File>
      ) : null}
      {fileComponents}
    </div>
  );
};
FileView.propTypes = {
  route: PropTypes.string,
  changeRoute: PropTypes.func,
};

const FileSystem = () => {
  const [route, setRoute] = useState("");

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
  };
  return (
    <div className="file-system">
      <FileView route={route} changeRoute={handleRouteChange}></FileView>
    </div>
  );
};

export default FileSystem;
