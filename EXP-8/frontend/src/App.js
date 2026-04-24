import React from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const path = window.location.pathname;

  return (
    <div>
      {path === "/dashboard" ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;
