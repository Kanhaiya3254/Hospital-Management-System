import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔐 Automatically attach token in every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

// ================= AUTH =================
export const loginUser = (data) => API.post("/login", data);

// ================= PATIENT =================
export const getPatients = () => API.get("/patients");
export const addPatient = (data) => API.post("/patients", data);

// ================= DOCTOR =================
export const getDoctors = () => API.get("/doctors");
export const addDoctor = (data) => API.post("/doctors", data);

// ================= APPOINTMENT =================
export const getAppointments = () => API.get("/appointments");
export const addAppointment = (data) =>
  API.post("/appointments", data);

export default API;
