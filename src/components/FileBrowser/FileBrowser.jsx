import React, { useState } from "react";
import PropTypes from "prop-types";
import FileView from "../FileView";
import Window from "../Window";
import { useWindows } from "../../providers/windowManager";

const FileBrowser = ({ id, initialRoute = "" }) => {
  const { closeWindow, getWindow, minimizeWindow } = useWindows();
  const [route, setRoute] = useState(initialRoute);

  const myWindow = getWindow(id);

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  const closeFileBrowser = () => {
    closeWindow(id);
  };

  const minimizeFileBrowser = () => {
    minimizeWindow(id);
  };

  return (
    <Window
      name={`File Browser (${route})`}
      open={myWindow?.active ?? false}
      onClose={closeFileBrowser}
      onMinimize={minimizeFileBrowser}
    >
      <FileView route={route} changeRoute={handleRouteChange}></FileView>
    </Window>
  );
};
FileBrowser.propTypes = {
  id: PropTypes.string.isRequired,
  initialRoute: PropTypes.string,
};

export default FileBrowser;
