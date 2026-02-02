import React, { useState, useEffect } from "react";
import { getAppointments, addAppointment, getPatients, getDoctors } from "../api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const fetchAppointments = async () => {
    const res = await getAppointments();
    setAppointments(res);
  };

  const fetchPatientsDoctors = async () => {
    const p = await getPatients();
    const d = await getDoctors();
    setPatients(p);
    setDoctors(d);
  };

  useEffect(() => { 
    fetchAppointments(); 
    fetchPatientsDoctors(); 
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addAppointment({ patient_id: patientId, doctor_id: doctorId, date });
    setPatientId(""); setDoctorId(""); setDate("");
    fetchAppointments();
  };

  return (
    <div>
      <h2>Appointments</h2>
      <form onSubmit={handleAdd}>
        <select value={patientId} onChange={e=>setPatientId(e.target.value)} required>
          <option value="">Select Patient</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={doctorId} onChange={e=>setDoctorId(e.target.value)} required>
          <option value="">Select Doctor</option>
          {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} required/>
        <button type="submit">Add Appointment</button>
      </form>

      <ul>
        {appointments.map(a => {
          const patient = patients.find(p => p.id === a.patient_id);
          const doctor = doctors.find(d => d.id === a.doctor_id);
          return (
            <li key={a.id}>
              {patient?.name} with {doctor?.name} on {a.date}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Appointments;
