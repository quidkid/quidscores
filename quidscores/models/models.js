"use strict";

var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  displayName: String,
  username: { type: String, index: { unique: true } },
  password: String, //Hashed
});

module.exports = {
  User: mongoose.model('User', userSchema)
};