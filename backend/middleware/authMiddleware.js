const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "No token" }));
    return false;
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid token" }));
    return false;
  }
};
