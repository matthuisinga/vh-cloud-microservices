var http = require('http'),
    fs = require('fs'),
    mime = require('node-mime'),
    process = require('process'),
    path = require('path');

const PORT=process.argv[2] || 8080;
const docBase = process.argv[3] || "static";

function makeAbsolute(pathStr) {
	var absolute = pathStr;
	if (!path.isAbsolute(pathStr)) {
		absolute = path.join(__dirname, pathStr);
	}
	return absolute;
}
function handleRequest(request, response) {
	
	var filePath = makeAbsolute(path.join(docBase, request.url));
	var stat = fs.stat(filePath, function (error, stat) {
		if (error) {
			console.log("not found: " + request.url + " in " + filePath);
			response.writeHead(404);
			response.end();
		} else {
			console.log("Found Path: " + filePath);
			var mimeType = mime.lookUpType(filePath.split(".").pop());
			console.log("Determined Mime Type: " + mimeType);
			response.writeHead(200, {
				'Content-Type': mimeType,
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
