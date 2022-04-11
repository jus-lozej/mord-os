import React from "react";
import FileSystem from "../pages/FileSystem";
import SignIn from "../pages/SignIn";
import { RequiresAuth } from "../utils/auth";

const routes = [
  {
    name: "Sign in",
    element: <SignIn />,
    path: "/sign-in",
  },
  {
    name: "FileSystem",
    element: (
      <RequiresAuth>
        <FileSystem />
      </RequiresAuth>
    ),
    path: "/",
  },
];

export default routes;
