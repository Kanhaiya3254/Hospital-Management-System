const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = (req, res) => {
  const { method, url } = req;

  if (url === "/auth/login" && method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const { email, password } = JSON.parse(body);
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
          if (err || results.length === 0) {
            res.writeHead(401);
            return res.end(JSON.stringify({ message: "Invalid Email" }));
          }

          const user = results[0];
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            res.writeHead(401);
            return res.end(JSON.stringify({ message: "Wrong Password" }));
          }

          const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
          res.writeHead(200);
          res.end(JSON.stringify({ message: "Login Success", token }));
        });
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ message: "Invalid Data" }));
      }
    });
    return true;
  }

  if (url === "/auth/register" && method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const { name, email, password, role } = JSON.parse(body);
        const hashed = await bcrypt.hash(password, 10);

        db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hashed, role], (err) => {
          if (err) {
            res.writeHead(500);
            return res.end(JSON.stringify({ message: "DB Error" }));
          }
          res.writeHead(201);
          res.end(JSON.stringify({ message: "User Registered" }));
        });
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ message: "Invalid Data" }));
      }
    });
    return true;
  }

  return false;
};
