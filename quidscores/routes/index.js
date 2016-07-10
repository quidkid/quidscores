var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Tournament = models.Tournament;
var Team = models.Team;
var Player = models.Player;


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
  return;
})

// players
router.get('/team', function(req, res, next) {
  Team.find().exec(function(err, tea) {
  res.render('team', {
  tea: tea
  })
});
})



// add team
router.get('/addTeam', function(req, res, next) {
  res.render('addTeam');
});

router.post('/addTeam', function(req, res, next) {
  var tea = new Team({
    name: req.body.name,
    region: req.body.region
  })
  tea.save(function(error) {
    if(error) {
      console.log('hmm?', error)
      res.render('addTeam', {
        error: error
      });
    } else {
      res.redirect('/team');
    }
  })
});



// add singleplayer
router.get('/singlePlayers', function(req, res, next) {
  res.render('singlePlayers');
});
//singlePlayer
router.post('/singlePlayers', function(req, res, next) {
  var playa = new Player({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    number: req.body.number,
    region: req.body.region,
    age: req.body.age,
    height: req.body.height,
    mainPosition: req.body.mainPosition
  })
  playa.save(function(error) {
    if(error) {
      console.log('hmm?', error)
      res.render('singleplayer', {
        error: error
      });
    } else {
      res.redirect('/players');
    }
  })
});

// players
router.get('/players', function(req, res, next) {
  Player.find().exec(function(err, playa) {
  res.render('players', {
  playa: playa
  })
});
})



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

router.get('/tournaments/:id', function(req, res) {
  Tournament.findById(req.params.id, function(err, tour) {
    res.render('singleTournament', {
      tour: tour
    })
  })
})




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