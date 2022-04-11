import React from "react";
import FileSystem from "../pages/FileSystem";
import SignIn from "../pages/SignIn";

const routes = [
  {
    name: "Sign in",
    element: <SignIn />,
    path: "/sign-in",
  },
  {
    name: "FileSystem",
    element: <FileSystem />,
    path: "/",
  },
];

export default routes;
