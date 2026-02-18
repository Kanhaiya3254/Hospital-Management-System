const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all doctors
router.get("/", (req, res) => {
  db.query("SELECT * FROM doctors", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

// Add doctor
router.post("/", (req, res) => {
  const { name, specialization } = req.body;

  if (!name || !specialization) {
    return res.status(400).json({ error: "All fields required" });
  }

  db.query(
    "INSERT INTO doctors (name, specialization) VALUES (?, ?)",
    [name, specialization],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Insert failed" });
      }
      res.json({ message: "Doctor added successfully" });
    }
  );
});

module.exports = router;