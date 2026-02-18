import React, { useEffect, useState } from "react";
import { getDashboard } from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboard();
        setData(res.data);
      } catch {
        alert("Unauthorized");
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Hospital Dashboard</h2>

      {/* SUMMARY CARDS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        <div style={cardStyle}>
          <h3>Total Patients</h3>
          <p>{data.totalPatients}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Doctors</h3>
          <p>{data.totalDoctors}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Appointments</h3>
          <p>{data.totalAppointments}</p>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>

        <button onClick={() => navigate("/patients")} style={btnStyle}>
          ➕ Manage Patients
        </button>

        <button onClick={() => navigate("/doctors")} style={btnStyle}>
          ➕ Manage Doctors
        </button>

        <button onClick={() => navigate("/appointments")} style={btnStyle}>
          ➕ Book Appointment
        </button>

      </div>

    </div>
  );
}

const cardStyle = {
  background: "#f4f4f4",
  padding: "20px",
  borderRadius: "10px",
  width: "200px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const btnStyle = {
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#007bff",
  color: "white",
  cursor: "pointer"
};

export default Dashboard;
