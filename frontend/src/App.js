import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import "./styles.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) return <Login setToken={setToken} />;

  return (
    <Router>
      <Navbar handleLogout={handleLogout} />
      <div className="container">
        <h1 className="project-title">Hospital Management System</h1>
        <Routes>
          <Route path="/" element={<Dashboard token={token} />} />
          <Route path="/patients" element={<Patients token={token} />} />
          <Route path="/doctors" element={<Doctors token={token} />} />
          <Route path="/appointments" element={<Appointments token={token} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
