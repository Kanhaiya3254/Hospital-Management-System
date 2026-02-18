import React, { useEffect, useState } from "react";
import {
  getAppointments,
  addAppointment,
  getPatients,
  getDoctors,
} from "../api";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const appt = await getAppointments();
    const pat = await getPatients();
    const doc = await getDoctors();

    setAppointments(appt.data);
    setPatients(pat.data);
    setDoctors(doc.data);
  };

  const handleAdd = async () => {
    if (!patientId || !doctorId || !date)
      return alert("Fill all fields");

    await addAppointment({
      patient_id: patientId,
      doctor_id: doctorId,
      date,
    });

    setPatientId("");
    setDoctorId("");
    setDate("");
    fetchData();
  };

  return (
    <div className="page">
      <h2>Appointments</h2>

      <div className="form">
        <select
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={handleAdd}>Book Appointment</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.patient_name}</td>
              <td>{a.doctor_name}</td>
              <td>{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
