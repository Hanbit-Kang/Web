var express = require('express');
var router = express.Router();
var Account = require('../models/Account');

router.get('/user/edit/:id', function(req, res){
  console.log('get:'+req.params.id);
  var errors = req.flash('errors')[0] || {};
  Account.findOne({id:req.params.id}, function(err, user){
    if(err) return res.json(err);
    res.render('edit', {
      user: user,
      errors:errors
    });
  });
});

router.post('/user/edit/:id', function(req, res, next){
  Account.findOne({nickname:req.body.nickname}, function(err, user){
    if(err) return res.json(err);
    else if(!user || req.body.nickname==user.nickname){
      Account.findOne({id:req.params.id})
        .exec(function(err, user){
          if(err) return res.json(err);
          for(var p in req.body) user[p] = req.body[p];
          user.save(function(err, user){
            if(err) return res.json(err);
            res.redirect('/user/edit/'+user.id); //TODO: 수정 성공 시 mypage로
          });
        });
    }else{
      req.flash('errors', {nickname:'중복된 닉네임입니다.'});
      return res.redirect('/user/edit/'+user.id);
    }
  });
});

module.exports = router;
