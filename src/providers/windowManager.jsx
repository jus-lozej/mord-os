import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const WindowContext = createContext(null);

export const WindowProvider = ({ children = <></> }) => {
  const [windows, setWindows] = useState([]);

  const createWindow = (app) => {
    let id = uuidv4();

    while (windows.find((window) => window.id === id)) {
      id = uuidv4();
    }

    const newWindow = {
      id: id,
      active: true,
      app,
    };

    const newWindows = windows.map((window) => ({
      ...window,
      active: false,
    }));

    newWindows.push(newWindow);
    setWindows(newWindows);
  };

  const closeWindow = (id) => {
    const newWindows = windows.filter((window) => window.id !== id);
    setWindows(newWindows);
  };

  const getWindow = (id) => {
    return windows.find((window) => window.id === id);
  };

  const showWindow = (id) => {
    const newWindows = windows.map((window) => ({
      ...window,
      active: window.id === id,
    }));

    setWindows(newWindows);
  };

  const minimizeWindow = (id) => {
    const newWindows = windows.map((window) => ({
      ...window,
      active: window.id === id ? false : window.active,
    }));

    setWindows(newWindows);
  };

  const value = {
    windows,
    createWindow,
    closeWindow,
    getWindow,
    showWindow,
    minimizeWindow,
  };

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
};
WindowProvider.propTypes = {
  children: PropTypes.element,
};

export const useWindows = () => {
  return useContext(WindowContext);
};

export const createFileBrowserApp = (route) => {
  return {
    type: "file-browser",
    name: "File Browser",
    icon: "folder",
    route: route,
  };
};

export const createTextEditorApp = (route) => {
  return {
    type: "text-editor",
    name: "Text Ediotr",
    icon: "file-alt",
    route: route,
  };
};
