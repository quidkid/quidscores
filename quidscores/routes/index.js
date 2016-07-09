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
// router.get('/players', function(req, res, next) {
// 	res.render('players');
// });



//singlePlayer
// router.get('/singlePlayer/:id', function(req, res, next) {
//   Player.findById(req.params.id, function(error, user){
//       res.render('singlePlayer', {

//       })
//   });
// });



module.exports = router;







// login
// register
// index --> scores 
// players
// singlePlayer
// logout 