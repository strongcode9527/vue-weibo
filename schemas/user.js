var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	account:String,
	password:String
})

module.exports = userSchema;