import React, { useEffect, useState } from "react";
import { getDashboard } from "../api";

const Dashboard = ({ token }) => {
  const [data, setData] = useState({ patients:0, doctors:0, appointments:0 });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDashboard(token);
      setData(res);
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Patients: {data.patients}</p>
      <p>Total Doctors: {data.doctors}</p>
      <p>Total Appointments: {data.appointments}</p>
    </div>
  );
};

export default Dashboard;
