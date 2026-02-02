const http = require("http");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (authRoutes(req, res)) return;
  if (patientRoutes(req, res)) return;
  if (doctorRoutes(req, res)) return;
  if (appointmentRoutes(req, res)) return;
  if (dashboardRoutes(req, res)) return;

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(5000, () => console.log("Server running on port 5000"));
