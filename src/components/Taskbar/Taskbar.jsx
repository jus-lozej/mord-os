import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useWindows } from "../../providers/windowManager";
import Icon from "../Icon";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { logout } from "../../providers/auth";
import { useNavigate } from "react-router-dom";

const Task = ({ app, active = false, onClick = () => {} }) => {
  const classes = classNames("task", { active: active });
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, height: "0rem" }}
      animate={{ scale: 1, opacity: 1, height: "3rem" }}
      exit={{ scale: 0, opacity: 0, height: "0rem" }}
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
  const navigate = useNavigate();

  const handleTaskClick = (id) => {
    return () => showWindow(id);
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/sign-in");
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
      <div className="logout">
        <Task
          app={{ icon: "sign-out-alt" }}
          active={window.active}
          onClick={handleLogoutClick}
        ></Task>
      </div>
    </div>
  );
};

export default Taskbar;
