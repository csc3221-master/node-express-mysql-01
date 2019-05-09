var express = require('express');
var app = express();
var db = require('./db');
var router = express.Router();



router.get('/', function ServerGetRootRequest(request, response) {
	db.connect(function ConnectToDatabase(){
		if (err){
			console.log("Unable to Connect to MySQL");
			process.exit(1); //Possibly need to send error page to client
		}
		db.get().query("SELECT * FROM employees LIMIT 10", function QueryHandler(err, result, fields){
			if (err)
				throw err;
			response.send(JSON.stringify(result));
		});
	});
});

app.use('/', router);

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});
