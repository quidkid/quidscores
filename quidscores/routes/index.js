var express = require('express');
var router = express.Router();
var models = require('../models/models')

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

// players
router.get('/team', function(req, res, next) {
	res.render('team');
});



//singlePlayer
router.get('/singlePlayer/:id', function(req, res, next) {
  models.Player.findById(req.params.id, function(error, user){
      res.render('singlePlayer', {
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
  console.log("addTournaments")
  res.render('addTournaments');
});


router.post('/addTournaments', function(req, res, next) {
  var tour = new models.Tournament({
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
})


// tournaments

router.get('/tournaments', function(req, res, next) {
  res.render('tournaments');
});


// singleplayer
router.get('/singlePlayer', function(req, res, next) {
  res.render('singlePlayer');
});

// singleTournament
router.get('/singleTournament', function(req, res, next) {
  res.render('singleTournament');
});


module.exports = router;







// login
// register
// index --> scores 
// players
// singlePlayer
// logout 