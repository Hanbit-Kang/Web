var express = require('express');
var router = express.Router();
var Account = require('../models/Account');

router.get('/', function(req, res){
  res.render('login');
});

router.post('/', function(req, res){
  console.log(req.body); //!!!!!!!!!!!!!!!!!!!!!!!! 왜 req.body가 {}로 나오는가..(입력한 값으로 나와야함)
  //Account.findOne({id:req.body.id, password:req.body.password}, function(err, account){

    //if(err) return console.log(req.body);
    //if(!account) return console.log(req.body);
    //res.redirect('../');
  //});
});

module.exports = router;
