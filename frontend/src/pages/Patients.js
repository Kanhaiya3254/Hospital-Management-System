import React, { useEffect, useState } from "react";
import { getPatients, addPatient } from "../api";

const Patients = ({ token }) => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [problem, setProblem] = useState("");
  const [error, setError] = useState("");

  const fetchPatients = async () => {
    try {
      const res = await getPatients(token);
      setPatients(res);
      setError("");
    } catch {
      setError("Unauthorized or Server Error");
    }
  };

  useEffect(() => { fetchPatients(); }, [token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addPatient({ name, age, problem }, token);
      setName(""); setAge(""); setProblem("");
      fetchPatients();
    } catch {
      setError("Failed to add patient");
    }
  };

  return (
    <div>
      <h2>Patients</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAdd}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/>
        <input type="number" placeholder="Age" value={age} onChange={e=>setAge(e.target.value)} required/>
        <input placeholder="Problem" value={problem} onChange={e=>setProblem(e.target.value)} required/>
        <button type="submit">Add Patient</button>
      </form>

      <ul>
        {patients.map(p => <li key={p.id}>{p.name} - {p.age} - {p.problem}</li>)}
      </ul>
    </div>
  );
};

export default Patients;
