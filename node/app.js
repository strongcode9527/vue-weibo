var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var url = require('url');
var path = require('path');

var app = express();

app.listen(8090);
console.log('node start at 8090');

app.get('/strong123',function(req,res,next){
	console.log('strong');
	res.send({
		name:"strong"
	})
})