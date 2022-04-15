import React, { useState, useEffect } from "react";
import File from "../../components/File";
import { deleteFile, getFile, saveFile } from "../../utils/filesystem";
import PropTypes from "prop-types";
import "./style.scss";
import classNames from "classnames";
import {
  createCreateFileApp,
  createTextEditorApp,
  useWindows,
} from "../../providers/windowManager";
import Icon from "../Icon";

const FileView = ({ route = "", changeRoute = () => {} }) => {
  const [files, setFiles] = useState(getFile(route)["files"]);

  useEffect(() => {
    setFiles(getFile(route)["files"]);
  }, [route]);

  const { createWindow } = useWindows();

  const createTextEditorWindow = (route) => {
    const app = createTextEditorApp(route);

    createWindow(app);
  };

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
          icon="file-alt"
          className={fileClasses}
          onDoubleClick={() => createTextEditorWindow(route + `/${filename}`)}
        ></File>
      );
    }
  });

  const goBack = () => {
    const previous = route.split("/");
    previous.pop();
    changeRoute(previous.join("/"));
  };

  const createTextFile = () => {
    const app = createCreateFileApp(
      route,
      {
        type: "text",
        text: "",
      },
      () => setFiles(getFile(route)["files"])
    );
    createWindow(app);
  };

  const createDirectory = () => {
    const app = createCreateFileApp(
      route,
      {
        type: "directory",
        files: {},
      },
      () => setFiles(getFile(route)["files"])
    );
    createWindow(app);
  };

  const deleteDirectory = () => {
    deleteFile(route);
    const previous = route.split("/");
    previous.pop();
    changeRoute(previous.join("/"));
  };

  return (
    <>
      <div className="file-view">
        <div className="file-view-actions">
          <div className="action" onClick={createTextFile}>
            <Icon name="file-plus-alt"></Icon> Create text file
          </div>
          <div className="action" onClick={createDirectory}>
            <Icon name="folder-plus"></Icon> Create folder
          </div>
          <div className="action" onClick={deleteDirectory}>
            <Icon name="folder-times"></Icon> Delete folder
          </div>
        </div>
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
      </div>
    </>
  );
};
FileView.propTypes = {
  route: PropTypes.string,
  changeRoute: PropTypes.func,
};

export default FileView;
