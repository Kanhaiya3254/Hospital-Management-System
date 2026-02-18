import React, { useEffect, useState } from "react";
import { getDoctors, addDoctor } from "../api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await getDoctors();
    setDoctors(res.data);
  };

  const handleAdd = async () => {
    if (!name || !specialization) return alert("Fill all fields");

    await addDoctor({ name, specialization });
    setName("");
    setSpecialization("");
    fetchDoctors();
  };

  return (
    <div className="page">
      <h2>Doctors Section</h2>

      <div className="form">
        <input
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
        <button onClick={handleAdd}>Add Doctor</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.specialization}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;
