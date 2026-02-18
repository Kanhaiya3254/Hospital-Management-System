import React, { useEffect, useState } from "react";
import {
  getPatients,
  getDoctors,
  getAppointments,
} from "../api";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const pat = await getPatients();
    const doc = await getDoctors();
    const appt = await getAppointments();

    setPatients(pat.data);
    setDoctors(doc.data);
    setAppointments(appt.data);
  };

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>

      <div className="cards">
        <div className="card">
          <h3>Total Patients</h3>
          <p>{patients.length}</p>
        </div>

        <div className="card">
          <h3>Total Doctors</h3>
          <p>{doctors.length}</p>
        </div>

        <div className="card">
          <h3>Total Appointments</h3>
          <p>{appointments.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
