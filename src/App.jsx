import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import routes from "./router";

function App() {
  const routeComponents = routes.map((route) => {
    return <Route key={route.name} path={route.path} element={route.element} />;
  });

  return (
    <div className="App">
      <Routes>{routeComponents}</Routes>
    </div>
  );
}

export default App;
