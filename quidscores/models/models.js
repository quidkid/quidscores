"use strict";

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')


var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, index: { unique: true } },
  password: String,
  facebookId: String
});

userSchema.plugin(findOrCreate);


var playerSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	number: String, 
	region: String,
	age: Number,
	height: String,
	mainPosition: {
		type: String,
		enum: ['Keeper', 'Chaser', 'Beater', 'Seeker']
	},
	otherPositions: {
		type: [String]
	},
	teamId: {
		type: mongoose.Schema.Types.ObjectId,
    	ref: 'Team'
	}
	
});


var teamSchema = mongoose.Schema({
	name: String,
	region: String,
	roster: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Player'
	}]
});

var tournamentSchema = mongoose.Schema({
	name: String,
	date: Date,
	location: String,
	games: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Game'
	}

});

var gameSchema = mongoose.Schema({
	winner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Team'
	},
	loser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Team'
	},
	//pure score numbers
	winScore: Number,
	loseScore: Number,
	// this will be for example: 111*^-250
	score: String,
	tournament: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tournament'
	}
})

module.exports = {
  User: mongoose.model('User', userSchema),
  Team: mongoose.model('Team', teamSchema),
  Player: mongoose.model('Player', playerSchema),
  Tournament: mongoose.model('Tournament', tournamentSchema),
  Game: mongoose.model('Game', gameSchema)

};