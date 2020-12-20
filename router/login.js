var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport');

router.get('/', function(req, res){
  var id = req.flash('id')[0];
  var errors = req.flash('errors')[0] || {};
  res.render('login',{
    id:id,
    errors:errors
  });
});

router.post('/',
  function(req, res, next){
    var errors = {};
    var isValid = true;

    if(isValid){
      next();
    }else{
      req.flash('errors', errors);
      res.redirect('/');
    }
  },
  passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login'
  })
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
