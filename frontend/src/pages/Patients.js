import React, { useEffect, useState } from "react";
import { getPatients } from "../api";

function Patients() {

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPatients();
        setPatients(res.data);
      } catch {
        alert("Unauthorized or Server Error");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      {patients.map(p => (
        <div key={p.id}>
          {p.name} - {p.age} - {p.problem}
        </div>
      ))}
    </div>
  );
}

export default Patients;
