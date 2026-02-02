const jwt = require("jsonwebtoken");
const SECRET = "hospital_secret_key";

module.exports = (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.writeHead(401);
    res.end(JSON.stringify({ message: "No token" }));
    return false;
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    return true;
  } catch {
    res.writeHead(403);
    res.end(JSON.stringify({ message: "Invalid token" }));
    return false;
  }
};
