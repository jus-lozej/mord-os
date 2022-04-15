import React, { useEffect } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import routes from "./router";
import { AuthProvider, createRootUser } from "./providers/auth";
import { createMockFilesystem } from "./utils/filesystem";
import { WindowProvider } from "./providers/windowManager";

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
      <WindowProvider>
        <div className="App">
          <Routes>{routeComponents}</Routes>
        </div>
      </WindowProvider>
    </AuthProvider>
  );
}

export default App;
