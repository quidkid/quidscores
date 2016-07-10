// Add Passport-related auth routes here.
var express = require('express');
var router = express.Router();
var models = require('../models/models');
var User = models.User


module.exports = function(passport) {

  // GET registration page
  router.get('/register', function(req, res) {
    res.render('register');
  });

  // POST registration page
  var validateReq = function(userData) {
    return (userData.password === userData.passwordRepeat);
  };

  router.post('/register', function(req, res) {
    // validation step
    if (!validateReq(req.body)) {
      return res.render('register', {
        error: "Passwords don't match."
      });
    }
    var u = new User({
      username: req.body.username,
      password: req.body.password,
    });
    console.log("asd")
    console.log(u)
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).redirect('/register');
        return;
      }
      console.log(user);
      res.redirect('/login');
    });
  });

  // GET Login page
  router.get('/login', function(req, res) {
    res.render('login');
  });

  // POST Login page
  router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
  });


  // GET Logout page
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  //facebook route
  router.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['publish_actions'] }));

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      console.log("here");
      // Successful authentication, redirect home.
      res.redirect('/');
    });

  router.use(function(req,res,next) {
    if (req.user) {
      console.log("Logged in")
      return next()
    } else {
      console.log("Not logged in")
      res.redirect('/login')
    }
  })


  return router;
};
