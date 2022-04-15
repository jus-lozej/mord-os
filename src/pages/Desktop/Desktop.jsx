import React from "react";
import CreateFileWindow from "../../components/CreateFileWindow/CreateFileWindow";
import File from "../../components/File";
import FileBrowser from "../../components/FileBrowser";
import NewsFeed from "../../components/NewsFeed/NewsFeed";
import Taskbar from "../../components/Taskbar";
import TextEditor from "../../components/TextEditor/TextEditor";
import {
  createFileBrowserApp,
  createNewsFeedApp,
  useWindows,
} from "../../providers/windowManager";
import "./style.scss";

const Desktop = () => {
  const { windows, createWindow } = useWindows();

  const createFileBrowserWindow = () => {
    const app = createFileBrowserApp("");

    createWindow(app);
  };

  const createNewsFeedWindow = () => {
    const app = createNewsFeedApp();

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

    if (window.app.type === "text-editor") {
      return (
        <TextEditor
          key={window.id}
          id={window.id}
          fileRoute={window.app.route}
        ></TextEditor>
      );
    }

    if (window.app.type === "create-file") {
      return (
        <CreateFileWindow
          key={window.id}
          id={window.id}
          route={window.app.route}
          file={window.app.file}
        ></CreateFileWindow>
      );
    }
    if (window.app.type === "news-feed") {
      return <NewsFeed key={window.id} id={window.id}></NewsFeed>;
    }
  });

  return (
    <div className="desktop">
      {windowComponents}
      <div className="desktop-taskbar">
        <Taskbar></Taskbar>
      </div>
      <div className="desktop-apps">
        <File
          filename="File Browser"
          icon="folder"
          onDoubleClick={createFileBrowserWindow}
        ></File>
        <File
          filename="News Feed"
          icon="newspaper"
          onDoubleClick={createNewsFeedWindow}
        ></File>
      </div>
    </div>
  );
};

export default Desktop;
