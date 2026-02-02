import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ handleLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/">Dashboard</Link>
      <Link to="/patients">Patients</Link>
      <Link to="/doctors">Doctors</Link>
      <Link to="/appointments">Appointments</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
