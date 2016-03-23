var http = require('http');

const PORT=8090

function handleRequest(request, response) {
	response.end("it works!! Path was: " + request.url);
}

var server = http.createServer(handleRequest);
server.listen(PORT, function () {
	console.log("Server listening on: http://localhost:%s", PORT);
});
