let doctors = [
  { id: 1, name: "Dr. Sharma", specialization: "Cardiologist" }
];
let doctorId = 2;

module.exports = (req, res) => {
  const url = req.url;
  const method = req.method;

  // GET All
  if (url === "/doctors" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(doctors));
    return true;
  }

  // POST
  if (url === "/doctors" && method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const data = JSON.parse(body);
      const newDoctor = { id: doctorId++, ...data };
      doctors.push(newDoctor);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newDoctor));
    });
    return true;
  }

  // PUT
  if (url.startsWith("/doctors/") && method === "PUT") {
    const id = parseInt(url.split("/")[2]);
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const data = JSON.parse(body);
      const doctor = doctors.find(d => d.id === id);
      if (!doctor) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Doctor not found" }));
        return;
      }
      Object.assign(doctor, data);
      res.end(JSON.stringify(doctor));
    });
    return true;
  }

  // DELETE
  if (url.startsWith("/doctors/") && method === "DELETE") {
    const id = parseInt(url.split("/")[2]);
    doctors = doctors.filter(d => d.id !== id);
    res.end(JSON.stringify({ message: "Doctor deleted" }));
    return true;
  }

  return false;
};
