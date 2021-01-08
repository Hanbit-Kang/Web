//TODO: 원래 있었던 페이지로 돌아가기
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/Account');
require('../config/passport');
var util = require('../util');

router.get('/login', function(req, res){
  if(req.session.passport){
    req.session.error={'msg':"이미 로그인하였습니다."};
    res.redirect('/');
  }else{
    var id = req.flash('id')[0];
    var errors = req.flash('errors')[0] || {};
    res.render('login',{
      id:id,
      errors:errors
    });
  }
});

router.post('/login',
  function(req, res, next){
    var errors = {};
    var isValid = true;

    if(isValid){
      next();
    }else{
      req.flash('errors', errors);
      res.redirect('/login');
    }
  },
  passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login'
  }
));

router.get('/logout', function(req, res){
  req.session.passport=null;
  req.logout();
  res.redirect('back');
});

//FIND ID
router.get('/login/findid', function(req, res){
  var email = req.flash('email')[0];
  var errors = req.flash('errors')[0] || {};
  res.render('login/findid', {
    email:email,
    errors:errors
  });
});

router.post('/login/findid', function(req, res){
  Account.findOne({email:req.body.email}, function(err,user){
    if(err) return res.json(err);
    if(!user){
      var errors = {};
      errors.email = {message:'존재하지 않는 이메일입니다.'};
      req.flash('email', req.body.email);
      req.flash('errors', errors);
      return res.redirect('/login/findid');
    }
    res.redirect('/welcome');
  });
});

module.exports = router;
