var exec = require("child_process").exec;
var querystring = require("querystring");
fs = require("fs");
var formidable = require("formidable");

function iniciar(response, request) {
  console.log("Manipulador de peticiones 'iniciar' fue llamado.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
	'<form action="/subir" enctype="multipart/form-data" ' + 
	'method="post"> ' +
	'<input type="text" name="title"><br>' +
	'<input type="file" name="upload" multiple="multiple"><br>' +
	'<input type="submit" value = "Upload">' +
	'</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function subir(response, request) {
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request,function(error,fields,files) {
								console.log ("parsing done");
								/**posible windows error**/
								fs.rename(files.upload.path, "./tmp/test.png",function (err) {
																					   if (err) {
																						    console.log("ha habido error: " + err);
																							fs.unlink("./tmp/test.png");
																							fs.rename(files.upload.path,"./tmp/test.png");
																					   } else {
																							console.log("no ha habido error");   
																						}
																						});
								});
  console.log("Manipulador de peticiones 'subir' fue llamado.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Imagen recibida");
  response.write("<img src='/show' />");
  response.end();
}

function show(response, request) {
	console.log("request handler show ha sido llamado");
	fs.readFile("./tmp/test.png","binary",function(error,file) {
												  if (error) {
													    console.log("uno");
												  		response.writeHead(500,{ "Content-Type":"text/plain" });
												  		response.write(error + "\n");
														response.end();
												  } else {
													    console.log("dos");
												  		response.writeHead(200,{ "Content-Type":"image/png" });
												  		response.write(file,"binary");
														response.end();
												  }
										  });
}

exports.iniciar = iniciar;
exports.subir = subir;
exports.show = show;

//subir2 e iniciar2 funcionan perfectamente pero son otra casuística

function iniciar2(response) {
	console.log("manipulador de petición iniciar ha sido llamado");	
	exec("dir /s", 
		 function(error,stdout,stderr) {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(stdout);
			response.end();	}
		 );
}

function subir2(response) {
	console.log("manipulador de petición subir ha sido llamado");	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("soy subir");
	response.end();		
}


