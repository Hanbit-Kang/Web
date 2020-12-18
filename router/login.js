var express = require('express');
var router = express.Router();
var Account = require('../models/Account');

router.get('/', function(req, res){
  res.render('login');
});

router.post('/', function(req, res){ //Login
  Account.findOne({id:req.body.id, password:req.body.password}, function(err, account){
    if(err || !account) return res.json(err); //TODO: 로그인 실패 시 이쁘게 나오게
    res.redirect('/');
  });
});

module.exports = router;
