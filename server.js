var express = require("express");
var server = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const objectID = require('mongodb').ObjectID;
server.use(cors());
server.use(express.static('client/build'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));

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

	server.post('/api/bucketlist', function(req, res){
	db.collection('bucketlist').save(req.body, function(err, result){
		if(err){
			console.log(err);
			res.status(500);
			res.send();
		}
		res.status(201);
		res.json(result.ops[0]);
		console.log("saved to database");
	});
});

server.delete('/api/bucketlist', function(req, res){
	db.collection('bucketlist').remove(req.body, function(err, result){
		if(err){
			console.log(err);
			res.status(500);
			res.send();
		}
		res.status(204);
		res.send();
	});
});

server.put('/api/bucketlist/:id', function(req, res){
	db.collection('bucketlist').update({_id: objectID(req.params.id)},req.body, function(err, result){
		if(err){
			console.log(err);
			res.status(500);
			res.send();
		}
		res.status(204);
		res.send();
	});
});


	server.use(express.static("build"));

	server.listen(5000, function(){
		console.log("App running on port: " + this.address().port);
	});

});
