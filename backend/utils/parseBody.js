function parseBody(req) {
  return new Promise((resolve) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      resolve(body ? JSON.parse(body) : {});
    });
  });
}

module.exports = parseBody;
