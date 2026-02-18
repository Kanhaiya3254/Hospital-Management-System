const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all appointments
router.get("/", (req, res) => {
  const sql = `
    SELECT appointments.id, patients.name AS patient, doctors.name AS doctor, appointments.date
    FROM appointments
    JOIN patients ON appointments.patient_id = patients.id
    JOIN doctors ON appointments.doctor_id = doctors.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

// Add appointment
router.post("/", (req, res) => {
  const { patient_id, doctor_id, date } = req.body;

  if (!patient_id || !doctor_id || !date) {
    return res.status(400).json({ error: "All fields required" });
  }

  const sql =
    "INSERT INTO appointments (patient_id, doctor_id, date) VALUES (?, ?, ?)";

  db.query(sql, [patient_id, doctor_id, date], (err, result) => {
    if (err) {
      console.log("Appointment Insert Error:", err);
      return res.status(500).json({ error: "Insert failed" });
    }
    res.json({ message: "Appointment added successfully" });
  });
});

module.exports = router;
