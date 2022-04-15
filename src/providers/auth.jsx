import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

// Note: Of course one wouldn't ever store user credentials in code or local storage this is just done for the purposes of the assignment
export const createRootUser = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const root = {
    email: import.meta.env.VITE_ROOT_USER_NAME || "borgoth@mordos.com",
    pass: import.meta.env.VITE_ROOT_USER_PASS || "12bindthem",
  };

  if (users.length === 0) {
    localStorage.setItem("users", JSON.stringify([{ ...root }]));
  } else {
    if (!users.find((user) => user.email === root.email)) {
      localStorage.setItem("users", JSON.stringify([...users, { ...root }]));
    }
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children = <></> }) => {
  const [auth, setAuth] = useLocalStorage("auth", false);

  const signin = (email, password, callback) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => email === user.email);

    if (user) {
      if (user.pass === password) {
        setAuth(true);
        callback();
      } else {
        throw new Error(
          "Auth Error: The way is shut. It was made by those who are Dead, and the Dead keep it, until the time comes. The way is shut."
        );
      }
    } else {
      throw new Error(
        "Auth Error: The way is shut. It was made by those who are Dead, and the Dead keep it, until the time comes. The way is shut."
      );
    }
  };

  const signout = () => {
    setAuth(false);
  };

  const value = { auth, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.element,
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const RequiresAuth = ({ children = <></> }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};
RequiresAuth.propTypes = {
  children: PropTypes.element,
};

export const logout = () => {
  localStorage.removeItem("auth");
};
