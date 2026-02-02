const jwt = require("jsonwebtoken");
const SECRET = "hospital_secret_key";

function verifyToken(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "No Token Provided" }));
    return false;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // user info future use ke liye
    return true;
  } catch (err) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid Token" }));
    return false;
  }
}

module.exports = verifyToken;
