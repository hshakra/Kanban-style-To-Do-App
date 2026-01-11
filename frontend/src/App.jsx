import { useState } from "react";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import "./App.css";

function App() {
  const [view, setView] = useState("home");

  return (
    <>
      {view === "home" && (
        <Home
          onLogin={() => setView("login")} />
      )}

      {view === "create" && (
        <CreateTask onUserHome={() => setView("UserHome")} />
      )}

      {view === "login" && (
        <Login
          onBack={() => setView("home")}
          onUserHome={() => setView("UserHome")} />
      )}

      {view === "UserHome" && (
        <UserHome onBack={() => setView("home")}
          onCreateTask={() => setView("create")}
        />

      )}

    </>
  );
}

export default App;
