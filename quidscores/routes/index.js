var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Tournament = models.Tournament;
var Team = models.Team;
var Game = models.Game;
var Player = require('../models/models');

// add the following first in models: 
// var User = 
// var player =
// var Team =

/* GET home page. */

router.get('/', function(req, res, next) {
  if(req.user) {
  res.render('index');
} else {
  res.redirect('/login')
}
});

router.post('/singleTournament/:id/newGame', function(req, res, next) {
  console.log("Posting");
  res.render('index', {
    op1: req.body
  });
})

// players
router.get('/team/:id', function(req, res, next) {

  Game.find({$or: [{winner: req.params.id}, {loser: req.params.id}]})
  .populate('tournament').exec(function(error, games) {
  res.render('team', {
  games: games
  })

  })
    
  
});


//singlePlayer
router.get('/singlePlayers/:id', function(req, res, next) {
  Player.findById(req.params.id, function(error, user){
      res.render('singlePlayers', {
     name: req.body.name,
     age: req.body.age,
     height: req.body.height,
	region: req.body.region,
	mainPosition: req.body.mainPosition,
	otherPositions: req.body.otherPositions
      })
  });
});


// score
router.get('/score', function(req, res, next) {
  res.render('score');
});

// addTournaments

router.get('/addTournaments', function(req, res, next) {
  res.render('addTournaments');
});


router.post('/addTournaments', function(req, res, next) {
  var tour = new Tournament({
    name: req.body.tName,
    date: req.body.tDate,
    location: req.body.tLocation
  })
  tour.save(function(error) {
    if(error) {
      console.log('hmm?', error)
      res.render('addTournaments', {
        error: error
      });
    } else {
      res.redirect('/tournaments');
    }
  })
});


// tournaments
router.get('/tournaments', function(req, res, next) {
  Tournament.find().exec(function(err, tour) {
      console.log("Tournament: ", tour);
      console.log("Got", tour.length, "tournaments");
      res.render('tournaments', {
        tour: tour
      })
  });
});


// singleplayer
router.get('/singlePlayer', function(req, res, next) {
  res.render('singlePlayer');
});

// singleTournament
router.get('/singleTournament/:id', function(req,res,next) {
  Tournament.findById(req.params.id)
    .populate('teams')
    .exec(function(error, tour) {
    console.log(tour._id);
    // req.body.tournament.push(tour);
    console.log('array', tour.teams);
    res.render('singleTournament', {
      // Tournament: req.body.tournament
      tour: tour
      })
    
  })
})

// add Team
router.get('/singleTournament/:id/addTeam', function(req, res, next) {
  res.render('addTeam');
})

router.post('/singleTournament/:id/addTeam', function(req, res, next) {
  var tourId = req.params.id;
  console.log("lookkeee");
  //TODO: check if a team already exists. 
  //functionality to dropdown add an existing team or create a new one
  var temp = [tourId]
  var newTeam = new Team({
    name: req.body.name,
    region: req.body.region,
    tournaments: temp
  })
  newTeam.save(function(err, team) {
    console.log("after save");
    if (err) return next(err);
    Tournament.findByIdAndUpdate(tourId, {$push: {teams: team}},  function(err, team) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.redirect('/singleTournament/' + tourId);
    });
    

  })
})
//newGame
router.get('/singleTournament/:id/newGame', function(req, res, next) {
  Tournament.findById(req.params.id, function(error, tour) {
    if (error) return next(error);
    res.render('newGame', {
      tour: tour
    })


    })
  })


module.exports = router;







// login
// register
// index --> scores 
// players
// singlePlayer
// logout 