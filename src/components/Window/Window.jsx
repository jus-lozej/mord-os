import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./style.scss";
import Icon from "../Icon";
import { motion } from "framer-motion";

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const Window = ({
  children = <></>,
  name = "Window",
  open = false,
  onClose = () => {},
  onMinimize = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(open);

  const el = document.querySelector("body");
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleCloseClick = () => {
    setIsOpen(false);
    onClose();
  };

  const handleMinimizeClick = () => {
    setIsOpen(false);
    onMinimize();
  };

  return isOpen
    ? createPortal(
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="window"
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
  name: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onMinimize: PropTypes.func,
};
export default Window;
