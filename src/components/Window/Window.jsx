import React, { useEffect, useRef, useState } from "react";
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
  const { closeWindow, showWindow, getWindow, minimizeWindow } = useWindows();
  const myWindow = getWindow(id);

  const [dragging, setDragging] = useState(false);

  const [positionX, setPositionX] = useState(10);
  const [positionY, setPositionY] = useState(10);

  const prevX = useRef(10);
  const prevY = useRef(10);

  if (autoClose && !myWindow.active) {
    closeWindow(id);
  }

  const handleCloseClick = (e) => {
    e.stopPropagation();
    closeWindow(id);
  };

  const handleMinimizeClick = (e) => {
    e.stopPropagation();
    minimizeWindow(id);
  };

  const handleMouseStartDrag = (e) => {
    e.preventDefault();

    prevX.current = e.clientX;
    prevY.current = e.clientY;

    setDragging(true);
  };

  const handleMouseEndDrag = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleMouseDrag = (e) => {
    e.preventDefault();
    if (dragging) {
      const offsetPosX = prevX.current - e.clientX;
      const offsetPosY = prevY.current - e.clientY;
      // Replace the previous positions with the new x and y positions of the mouse
      prevX.current = e.clientX;
      prevY.current = e.clientY;

      setPositionX(positionX - offsetPosX);
      setPositionY(positionY - offsetPosY);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseDrag);
    document.addEventListener("mouseup", handleMouseEndDrag);
    return () => {
      document.removeEventListener("mousemove", handleMouseDrag);
      document.removeEventListener("mouseup", handleMouseEndDrag);
    };
  }, [dragging, positionX, positionY]);

  const handleClick = (e) => {
    e.stopPropagation();
    showWindow(id);
  };
  const windowClasses = classNames("window", size);
  const el = document.querySelector("body");

  const windowsStyle = {
    top: positionY,
    left: positionX,
    zIndex: myWindow.zIndex,
  };

  return myWindow.active
    ? createPortal(
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className={windowClasses}
          style={windowsStyle}
          onMouseDown={handleClick}
        >
          <div className="window-toolbar" onMouseDown={handleMouseStartDrag}>
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
