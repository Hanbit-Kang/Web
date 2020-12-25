//TODO: 원래 있었던 페이지로 돌아가기
var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport');

router.get('/login', function(req, res){
  if(req.session.passport){
    req.session.error={'msg':"이미 로그인하였습니다."};
    res.redirect('/');
  }
  var id = req.flash('id')[0];
  var errors = req.flash('errors')[0] || {};
  res.render('login',{
    id:id,
    errors:errors
  });
});

router.post('/login',
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
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
