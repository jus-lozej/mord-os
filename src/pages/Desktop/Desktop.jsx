import React from "react";
import File from "../../components/File";
import FileBrowser from "../../components/FileBrowser";
import Taskbar from "../../components/Taskbar";
import {
  createFileBrowserApp,
  useWindows,
} from "../../providers/windowManager";
import "./style.scss";

const Desktop = () => {
  const { windows, createWindow } = useWindows();

  const createFileBrowserWindow = () => {
    const app = createFileBrowserApp("");

    createWindow(app);
  };

  const windowComponents = windows.map((window) => {
    if (window.app.type === "file-browser") {
      return (
        <FileBrowser
          key={window.id}
          id={window.id}
          initialRoute=""
        ></FileBrowser>
      );
    }
  });

  return (
    <div className="desktop">
      {windowComponents}
      <div className="desktop-apps">
        <File
          filename="File Browser"
          icon="folder"
          onClick={createFileBrowserWindow}
        ></File>
      </div>
      <div className="desktop-taskbar">
        <Taskbar></Taskbar>
      </div>
    </div>
  );
};

export default Desktop;
