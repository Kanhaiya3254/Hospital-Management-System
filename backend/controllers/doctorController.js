function getDoctors(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Doctors from controller" }));
}

module.exports = { getDoctors };
