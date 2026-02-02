const db = require("../db");
const verifyToken = require("../middleware/verifyToken");

module.exports = (req, res) => {
  const url = req.url;
  const method = req.method;

  // GET Appointments
  if (url === "/appointments" && method === "GET") {
    if (!verifyToken(req, res)) return true;

    db.query(
      "SELECT a.id, p.name AS patient_name, d.name AS doctor_name, a.date FROM appointments a JOIN patients p ON a.patient_id = p.id JOIN doctors d ON a.doctor_id = d.id",
      (err, result) => {
        if (err) return res.end(JSON.stringify({ message: "DB Error" }));
        res.end(JSON.stringify(result));
      }
    );
    return true;
  }

  // POST Add Appointment
  if (url === "/appointments" && method === "POST") {
    if (!verifyToken(req, res)) return true;

    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const { patient_id, doctor_id, date } = JSON.parse(body);
      db.query(
        "INSERT INTO appointments (patient_id, doctor_id, date) VALUES (?, ?, ?)",
        [patient_id, doctor_id, date],
        (err) => {
          if (err) return res.end(JSON.stringify({ message: "DB Error" }));
          res.end(JSON.stringify({ message: "Appointment Added" }));
        }
      );
    });
    return true;
  }

  return false;
};
