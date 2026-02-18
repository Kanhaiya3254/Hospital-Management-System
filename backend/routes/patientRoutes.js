const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, (req, res) => {
  db.query("SELECT * FROM patients", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.post("/", verifyToken, (req, res) => {
  const { name, age, problem } = req.body;

  db.query(
    "INSERT INTO patients (name, age, problem) VALUES (?, ?, ?)",
    [name, age, problem],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Patient Added" });
    }
  );
});

module.exports = router;
