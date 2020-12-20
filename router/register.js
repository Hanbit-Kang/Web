var express = require('express');
var router = express.Router();
var Account = require('../models/Account');

router.get('/', function(req, res){ //TODO: 아이디 중복 -> redirect 시 전에 입력한 거 안 사라지게
  var id = req.flash('id')[0];
  var email = req.flash('email')[0];
  var errors = req.flash('errors')[0] || {};
  res.render('register', {
    id:id,
    email:email,
    errors:errors
  });
});

router.get('/welcome', function(req, res){
  res.render('welcome');
});

router.post('/', function(req, res){ //Login
  Account.create(req.body, function(err, account){
    if(err){
      req.flash('id', req.body.id);
      req.flash('email', req.body.email);
      req.flash('errors', parseError(err));
      return res.redirect('/register');
    }
    res.redirect('/register/welcome');
  });
});

module.exports = router;

function parseError(errors){
  var parsed = {};
  if(errors.code == '11000'){
    parsed.id = {message:'이미 존재하는 아이디입니다.'};
  }
  return parsed;
}
