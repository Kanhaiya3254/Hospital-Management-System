const db = require("../db");
const verifyToken = require("../middleware/authMiddleware");

module.exports = (req, res) => {
  const url = req.url;
  const method = req.method;

  // GET ALL PATIENTS (Protected)
  if (url === "/patients" && method === "GET") {
    if (!verifyToken(req, res)) return true;

    db.query("SELECT * FROM patients", (err, result) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ message: "DB Error" }));
        return;
      }
      res.end(JSON.stringify(result));
    });

    return true;
  }

  return false;
};
