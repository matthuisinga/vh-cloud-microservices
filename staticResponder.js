var http = require('http'),
    fs = require('fs'),
    path = require('path');

const PORT=8080

function handleRequest(request, response) {
	console.log("it works!! Path was: " + request.url);
	var filePath = path.join(__dirname, "static", request.url);
	var stat = fs.stat(filePath, function (error, stat) {
		if (error) {
			console.log("not found: " + request.url);
			response.writeHead(404);
			response.end();
		} else {
			response.writeHead(200, {
				'Content-Type': "text/html",
				'Content-Length': stat.size
			});

			var stream = fs.createReadStream(filePath);

			stream.pipe(response);

		}

	});
}

var server = http.createServer(handleRequest);
server.listen(PORT, function () {
	console.log("Server listening on: http://localhost:%s", PORT);
});
