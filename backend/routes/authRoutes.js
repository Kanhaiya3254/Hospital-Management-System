const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "hospital_secret_key";

module.exports = (req, res) => {
  const url = req.url;
  const method = req.method;

  // REGISTER
  if (url === "/register" && method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      const { name, email, password, role } = JSON.parse(body);
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, role],
        (err) => {
          if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ message: "DB Error" }));
            return;
          }
          res.end(JSON.stringify({ message: "User Registered" }));
        }
      );
    });
    return true;
  }

  // LOGIN
  if (url === "/login" && method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const { email, password } = JSON.parse(body);

      db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err || results.length === 0) {
          res.writeHead(401);
          res.end(JSON.stringify({ message: "Invalid Email" }));
          return;
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          res.writeHead(401);
          res.end(JSON.stringify({ message: "Wrong Password" }));
          return;
        }

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1h" });

        res.end(JSON.stringify({ message: "Login Success", token }));
      });
    });
    return true;
  }

  return false;
};
