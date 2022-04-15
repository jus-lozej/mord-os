import React from "react";
import Desktop from "../pages/Desktop";
import SignIn from "../pages/SignIn";
import { RequiresAuth } from "../providers/auth";

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
        <Desktop />
      </RequiresAuth>
    ),
    path: "/",
  },
];

export default routes;
