var mongoose = require('mongoose');
var Comment = require('./Comment');


var weiboSchma = new mongoose.Schema({
	content:String,
	reply:[Comment],
	user_name:String,
	user_id:String,
	likes:Number
});


module.exports = weiboSchma;