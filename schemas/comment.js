var mongoose = require('mongoose');

var Comment = new mongoose.Schema({
	reply_name : String,
	reply_id:String,
	content:String,
	likes:Number
})

module.exports = Comment;