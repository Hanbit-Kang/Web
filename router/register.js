var express = require('express');
var router = express.Router();
var Account = require('../models/Account');

router.get('/', function(req, res){
  res.render('register');
});

router.get('/welcome', function(req, res){
  res.render('welcome');
});

router.post('/', function(req, res){ //Login
  Account.create(req.body, function(err, account){
    if(err){//TODO: 아이디 중복 이쁘게 나오게
      res.redirect('/register');
      return false;
    }
    res.redirect('/register/welcome');
  });
});

module.exports = router;
