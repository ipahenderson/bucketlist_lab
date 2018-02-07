var express = require("express");
var server = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
server.use(cors());

MongoClient.connect("mongodb://localhost:27017", function(err, client){

	if(err){
		console.log(err);
		return;
	}

	const db = client.db('bucketlist');

	server.get("/api/bucketlist", function(req, res){
		db.collection("bucketlist").find().toArray(function(err, result){
			res.status(200);
			res.json(result);
		});
	})

	server.use(express.static("build"));

	server.listen(5000, function(){
		console.log("App running on port: " + this.address().port);
	});

});
