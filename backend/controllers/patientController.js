const patients = [];

function getPatients(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(patients));
}

function addPatient(req, res) {
  let body = "";

  req.on("data", chunk => body += chunk);

  req.on("end", () => {
    const patient = JSON.parse(body);
    patients.push(patient);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Patient added successfully",
      patient
    }));
  });
}

module.exports = { getPatients, addPatient };
