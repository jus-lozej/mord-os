import React, { useEffect } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import routes from "./router";
import { AuthProvider, createRootUser } from "./utils/auth";
import { createMockFilesystem } from "./utils/filesystem";

function App() {
  useEffect(() => {
    createRootUser();
    createMockFilesystem();
  }, []);

  const routeComponents = routes.map((route) => {
    return <Route key={route.name} path={route.path} element={route.element} />;
  });

  return (
    <AuthProvider>
      <div className="App">
        <Routes>{routeComponents}</Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
