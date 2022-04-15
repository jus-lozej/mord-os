import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useWindows } from "../../providers/windowManager";
import Icon from "../Icon";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

const Task = ({ app, active = false, onClick = () => {} }) => {
  const classes = classNames("task", { active: active });
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, width: "0rem" }}
      animate={{ scale: 1, opacity: 1, width: "3rem" }}
      exit={{ scale: 0, opacity: 0, width: "0rem" }}
      className={classes}
      onClick={onClick}
    >
      <Icon name={app.icon} size="large"></Icon>
    </motion.div>
  );
};
Task.propTypes = {
  app: PropTypes.object,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

const Taskbar = () => {
  const { windows, showWindow } = useWindows();

  const handleTaskClick = (id) => {
    return () => showWindow(id);
  };

  const tasks = windows.map((window) => {
    return (
      <Task
        key={window.id}
        app={window.app}
        active={window.active}
        onClick={handleTaskClick(window.id)}
      ></Task>
    );
  });

  return (
    <div className="taskbar">
      <AnimatePresence>{tasks}</AnimatePresence>
    </div>
  );
};

export default Taskbar;
