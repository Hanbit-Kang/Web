var express = require('express');
var router = express.Router();
var Account = require('../models/Account');

router.get('/user/index/:id', function(req, res){
  Account.findOne({id:req.params.id}, function(err, user){
    if(err) return res.json(err);
    if(!user){
      req.session.error={'msg':"아이디가 존재하지 않습니다."};
      res.redirect('/');
    }
    res.render('user/index',{
      user: user
    });
  });
});

router.get('/user/edit/:id', function(req, res){
  if(!(req.session.passport && req.session.passport.user.id==req.params.id)){
    req.session.error={'msg':"잘못된 접근입니다."};
    res.redirect('/');
  }
  var errors = req.flash('errors')[0] || {};
  Account.findOne({id:req.params.id}, function(err, user){
    if(err) return res.json(err);
    res.render('user/edit', {
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
            req.session.passport.user.nickname = user.nickname;
            res.redirect('/');
          });
        });
    }else{
      req.flash('errors', {nickname:'중복된 닉네임입니다.'});
      return res.redirect('/user/edit/'+user.id);
    }
  });
});

module.exports = router;
