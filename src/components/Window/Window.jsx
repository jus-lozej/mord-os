import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./style.scss";
import Icon from "../Icon";
import { motion } from "framer-motion";
import { useWindows } from "../../providers/windowManager";
import classNames from "classnames";

const Window = ({
  children = <></>,
  name = "Window",
  id = "",
  size = "normal",
  autoClose = false,
}) => {
  const { closeWindow, getWindow, minimizeWindow } = useWindows();
  const myWindow = getWindow(id);

  if (autoClose && !myWindow.active) {
    closeWindow(id);
  }

  const handleCloseClick = () => {
    closeWindow(id);
  };

  const handleMinimizeClick = () => {
    minimizeWindow(id);
  };
  const windowClasses = classNames("window", size);
  const el = document.querySelector("body");
  return myWindow.active
    ? createPortal(
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className={windowClasses}
        >
          <div className="window-toolbar">
            <div className="window-name">{name}</div>
            <div className="window-buttons">
              <div className="close-icon" onClick={handleMinimizeClick}>
                <Icon name="minus"></Icon>
              </div>
              <div className="close-icon" onClick={handleCloseClick}>
                <Icon name="times"></Icon>
              </div>
            </div>
          </div>
          <div className="window-content">{children}</div>
        </motion.div>,
        el
      )
    : null;
};
Window.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["normal", "mini"]),
  autoClose: PropTypes.bool,
};
export default Window;
