function route(handle, pathname, response, request) {
	console.log("a punto de enrutar peticion para " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	} else {
		console.log("no request handler para el " + pathname);
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write("404 not found");
		response.end();	
	}
}

exports.route = route;