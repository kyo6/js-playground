var http = require('http');
var cp = require("child_process");

var server = http.createServer(function (req, res) {
  var child = cp.fork(__dirname + "/fibonacci-calc.js");
  child.on('message', function (m) { 
    res.end(m.result + "\n");
  })
  var input = parseInt(req.url.substring(1), 10);
  child.send({ input: input });
})

server.listen(9000)