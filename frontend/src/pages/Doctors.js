import React, { useState, useEffect } from "react";
import { getDoctors, addDoctor } from "../api";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");

  const fetchDoctors = async () => {
    const res = await getDoctors();
    setDoctors(res);
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoctor({ name, specialization });
    setName(""); setSpecialization("");
    fetchDoctors();
  };

  return (
    <div>
      <h2>Doctors</h2>
      <form onSubmit={handleAdd}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/>
        <input placeholder="Specialization" value={specialization} onChange={e=>setSpecialization(e.target.value)} required/>
        <button type="submit">Add Doctor</button>
      </form>
      <ul>
        {doctors.map(d => <li key={d.id}>{d.name} - {d.specialization}</li>)}
      </ul>
    </div>
  );
};

export default Doctors;
