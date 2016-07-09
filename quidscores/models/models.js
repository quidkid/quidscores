"use strict";

var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, index: { unique: true } },
  password: String,
  facebookId: String
});

var teamSchema = mongoose.Schema({
	name: String,
	region: String,
	roster: {
		
	}
});

var playerSchema = mongoose.Schema({
	name: String,
	region: String,
	mainPosition: {
		type: String,
		enum: ['Keeper', 'Chaser', 'Beater', 'Seeker']
	},
	otherPositions: {
		type: [String]
	},
	
});

var tournamentSchema = mongoose.Schema({
	name: String,
	date: Date,
	location: String,
	games: {
		type: [Schema.Types.ObjectId]
	}
})

module.exports = {
  User: mongoose.model('User', userSchema),
  Team: mongoose.model('Team', teamSchema),
  Player: mongoose.mode('Player', playerSchema)

};