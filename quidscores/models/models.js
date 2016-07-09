"use strict";

var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;
mongoose.connect(connect);


var userSchema = mongoose.Schema({
  displayName: String,
  username: { type: String, index: { unique: true } },
  password: String, //Hashed
});

module.exports = {
  User: mongoose.model('User', userSchema)
};