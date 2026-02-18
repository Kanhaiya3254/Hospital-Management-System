import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";

import "./styles.css";

function App() {

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // 🔒 If not logged in → show login
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <Navbar handleLogout={handleLogout} />

      <div className="container">
        <h1 className="project-title">
          Hospital Management System
        </h1>

        <Routes>

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Patients */}
          <Route
            path="/patients"
            element={<Patients />}
          />

          {/* Doctors */}
          <Route
            path="/doctors"
            element={<Doctors />}
          />

          {/* Appointments */}
          <Route
            path="/appointments"
            element={<Appointments />}
          />

          {/* Any wrong route */}
          <Route path="*" element={<Navigate to="/dashboard" />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
