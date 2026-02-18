const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const SECRET_KEY = "supersecretkey";

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

// ================== DATABASE CONNECTION ==================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mithu@2003",
  database: "hospital_db",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed ❌", err);
  } else {
    console.log("MySQL Connected Successfully ✅");
  }
});

// ================== LOGIN ROUTE ==================
app.post("/api/login", (req, res) => {
  const username = req.body.username?.trim();
  const password = req.body.password?.trim();

  if (!username || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  db.query(
    "SELECT * FROM admins WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (result.length === 0) {
        return res.status(401).json({ error: "User not found" });
      }

      if (result[0].password !== password) {
        return res.status(401).json({ error: "Wrong password" });
      }

      const token = jwt.sign(
        { id: result[0].id, username: result[0].username },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({ token });
    }
  );
});

// ================== AUTH MIDDLEWARE ==================
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "Token required" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

// ================== PATIENT ROUTES ==================
app.get("/api/patients", verifyToken, (req, res) => {
  db.query("SELECT * FROM patients", (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(result);
  });
});

app.post("/api/patients", verifyToken, (req, res) => {
  const { name, age, problem } = req.body;

  db.query(
    "INSERT INTO patients (name, age, problem) VALUES (?, ?, ?)",
    [name, age, problem],
    (err) => {
      if (err) return res.status(500).json({ error: "Insert failed" });
      res.json({ message: "Patient added successfully" });
    }
  );
});

// ================== DOCTOR ROUTES ==================
app.get("/api/doctors", verifyToken, (req, res) => {
  db.query("SELECT * FROM doctors", (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(result);
  });
});

app.post("/api/doctors", verifyToken, (req, res) => {
  const { name, specialization } = req.body;

  db.query(
    "INSERT INTO doctors (name, specialization) VALUES (?, ?)",
    [name, specialization],
    (err) => {
      if (err) return res.status(500).json({ error: "Insert failed" });
      res.json({ message: "Doctor added successfully" });
    }
  );
});

// ================== APPOINTMENT ROUTES ==================
app.get("/api/appointments", verifyToken, (req, res) => {
  const sql = `
    SELECT appointments.id,
           patients.name AS patient,
           doctors.name AS doctor,
           appointments.date
    FROM appointments
    JOIN patients ON appointments.patient_id = patients.id
    JOIN doctors ON appointments.doctor_id = doctors.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(result);
  });
});

app.post("/api/appointments", verifyToken, (req, res) => {
  const { patient_id, doctor_id, date } = req.body;

  db.query(
    "INSERT INTO appointments (patient_id, doctor_id, date) VALUES (?, ?, ?)",
    [patient_id, doctor_id, date],
    (err) => {
      if (err) return res.status(500).json({ error: "Insert failed" });
      res.json({ message: "Appointment added successfully" });
    }
  );
});

// ================== SERVER START ==================
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
