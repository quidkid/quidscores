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




module.exports = router;







// login
// register
// index --> scores 
// players
// singlePlayer
// logout 