var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db=mongojs('contactlist',['contactlist']);
var bodyParser= require('body-parser');




app.use(bodyParser.json());﻿

app.use(express.static(__dirname + "/public"));

app.get("/contactlist",function(req,res){
	console.log("I receive a GET request");
	db.contactlist.find(function(err,docs) {
		console.log(docs);
		res.json(docs);
	})

});

app.post("/contactlist",function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,doc){
		res.json(doc);
	});
});

app.delete("/contactlist/:id",function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.get("/contactlist/:id",function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id : mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
		//console.log("da");
	}) ;
});

app.put("/contactlist/:id",function(req,res){
	var id= req.params.id;
	console.log("modific "+req.body.name);
	db.contactlist.findAndModify( {query:{_id : mongojs.ObjectId(id)},
		update: {$set: {_id:mongojs.ObjectId(id), name: req.body.name, email: req.body.email, number: req.body.number}},
		new : true},function(err,doc){
			console.log("da");
			res.json(doc);
		});
});

app.listen(3000);
console.log("server running on port 3000")