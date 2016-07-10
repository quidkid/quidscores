var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Tournament = models.Tournament;
var Team = models.Team;
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

router.post('/', function(req, res) {
  console.log("Posting");
})

// players
router.get('/team', function(req, res, next) {
  Team.find().exec(function(err, tournament) {
  res.render('team', {
  name: req.body.name,
  region: req.body.region,
  roster: req.body.roster
  })
	res.render('team');
});
})


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
  console.log("here");
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
      console.log("here: ", tour);
      res.redirect('/tournaments');
    }
  })
})


// tournaments

router.get('/tournaments', function(req, res, next) {
  Tournament.find().exec(function(err, tournament) {
      res.render('tournaments', {
        name: req.body.name,
        date: req.body.date,
        location: req.body.location
      })
  });
  res.render('tournaments');
});


// singleplayer
router.get('/singlePlayer', function(req, res, next) {
  res.render('singlePlayer');
});

// singleTournament
router.get('/singleTournament/:id', function(req,res,next) {
  Tournament.findById(req.params.id, function(error, user) {
    req.body.tournament.push(user);
    console.log(req.session.cart)
    res.render('singleTournament', {
      Tournament: req.body.tournament
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