import axios from "axios";

const API_URL = "http://localhost:5000";

const token = localStorage.getItem("token");

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};

export const getPatients = async () => {
  const res = await axios.get(`${API_URL}/patients`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getDoctors = async () => {
  const res = await axios.get(`${API_URL}/doctors`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getAppointments = async () => {
  const res = await axios.get(`${API_URL}/appointments`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const addPatient = async (data) => {
  const res = await axios.post(`${API_URL}/patients`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const addDoctor = async (data) => {
  const res = await axios.post(`${API_URL}/doctors`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const addAppointment = async (data) => {
  const res = await axios.post(`${API_URL}/appointments`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getDashboard = async () => {
  const res = await axios.get(`${API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
