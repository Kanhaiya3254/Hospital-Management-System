const jwt = require("jsonwebtoken");
const SECRET = "hospital_secret_key";

function verifyToken(req, res) {
  const authHeader = req.headers.authorization; // frontend se aayega: Bearer <token>

  if (!authHeader) {
    res.writeHead(403);
    res.end(JSON.stringify({ message: "No Token" }));
    return false;
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, SECRET); // decoded info store
    return true;
  } catch (err) {
    res.writeHead(401);
    res.end(JSON.stringify({ message: "Invalid Token" }));
    return false;
  }
}

module.exports = verifyToken;
