var express = require('express');
var router = express.Router();

// add the following first in models: 
// var User = 
// var player =
// var Team =

/* GET home page. */

router.get('/', function(req, res, next) {
	res.render('index');
});

// players
router.get('/team', function(req, res, next) {
	res.render('team');
});



//singlePlayer
router.get('/singlePlayer/:id', function(req, res, next) {
  Player.findById(req.params.id, function(error, user){
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


module.exports = router;







// login
// register
// index --> scores 
// players
// singlePlayer
// logout 