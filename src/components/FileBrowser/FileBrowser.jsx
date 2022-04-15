import React, { useState } from "react";
import PropTypes from "prop-types";
import FileView from "../FileView";
import Window from "../Window";

const FileBrowser = ({ id, initialRoute = "" }) => {
  const [route, setRoute] = useState(initialRoute);

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  return (
    <Window name={`File Browser (${route})`} id={id}>
      <FileView route={route} changeRoute={handleRouteChange}></FileView>
    </Window>
  );
};
FileBrowser.propTypes = {
  id: PropTypes.string.isRequired,
  initialRoute: PropTypes.string,
};

export default FileBrowser;
