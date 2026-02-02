const db = require("../db");
const jwt = require("jsonwebtoken");
const SECRET = "hospital_secret_key";

function verifyToken(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.writeHead(403);
    res.end(JSON.stringify({ message: "No Token" }));
    return false;
  }

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, SECRET);
    return true;
  } catch {
    res.writeHead(401);
    res.end(JSON.stringify({ message: "Invalid Token" }));
    return false;
  }
}

module.exports = (req, res) => {
  if (req.url === "/dashboard" && req.method === "GET") {
    if (!verifyToken(req, res)) return true;

    db.query("SELECT COUNT(*) AS total FROM patients", (e1, p) => {
      db.query("SELECT COUNT(*) AS total FROM doctors", (e2, d) => {
        db.query("SELECT COUNT(*) AS total FROM appointments", (e3, a) => {
          res.end(JSON.stringify({
            patients: p[0].total,
            doctors: d[0].total,
            appointments: a[0].total
          }));
        });
      });
    });

    return true;
  }
  return false;
};
