const http = require("http");
const port = 8081;
const host = "localhost";

const requestListener = function (req, res) {
  console.log(req.url);
  switch (req.url) {
    case "/html": {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(`<html><body><h1>This is HTML</h1></body></html>`);
      break;
    }
    case "/json": {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(`{"message": "This is a JSON response"}`);
    }
    case "/csv": {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment;filename=oceanpals.csv");
      res.writeHead(200);
      res.end(`id,name,email\n1,Sammy Shark,shark@ocean.com`);
    }

    default: {
      res.writeHead(200);
      res.end("My first server!");
    }
  }
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
