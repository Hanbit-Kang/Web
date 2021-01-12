var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/Account');
require('../config/passport');
var util = require('../util');
const crypto = require('crypto');
var Auth = require('../models/Auth');
var Log = require('../models/Log');

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
  Log.create({activity:'logout'});
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
  Account.findOne({email:req.body.email, isLeaved:false}, function(err,user){
    if(err) return res.json(err);
    if(!user){
      var errors = {};
      errors.email = {message:'존재하지 않는 이메일입니다.'};
      req.flash('email', req.body.email);
      req.flash('errors', errors);
      return res.redirect('/login/findid');
    }
    Log.create({activity:'findid'});
    util.sendMail(req.body.email, '[Classical] 아이디 찾기를 요청하셨습니다.','<html><div style="width:700px;background-color:#f7f9fa;display:block;"><div style="margin:50px; padding:30px; width:500px;background-color:white;border:1px solid #dfe3e6;display:inline-block;text-align:center;"><h2 style="display:inline-block;">아이디 찾기</h2><a style="display:inline-block;text-align:center;color:gray;font-size:14px;"> 회원님께서 Classical에 아이디 찾기를 요청하여, 귀하의 아이디가 전송되었습니다. 아이디는 다음과 같습니다. </a><h4 style="display:inline-block;">아이디</h4><h3 style="display:block;padding-top:10px;padding-bottom:10px;padding-left:30px;padding-right:30px;background-color:#dfe3e6">'+user.id+'</h3></div></div></html>'
  );
    req.session.success={'msg':"해당 이메일로 아이디를 발송했습니다."};
    res.redirect('/login');
  });
});

//FIND PW
router.get('/login/findpw', function(req, res){
  var id = req.flash('id')[0];
  var email = req.flash('email')[0];
  var errors = req.flash('errors')[0] || {};
  res.render('login/findpw', {
    id:id,
    email:email,
    errors:errors
  });
});

router.post('/login/findpw', function(req, res){
  Account.findOne({id:req.body.id, email:req.body.email, isLeaved:false}, async function(err,user){
    if(err) return res.json(err);
    if(!user){
      var errors = {};
      await Account.findOne({id:req.body.id}, function(err,user){
        if(!user){
          errors.id = {message:'존재하지 않는 아이디입니다.'};
        }
      });
      await Account.findOne({email:req.body.email}, function(err,user){
        if(!user){
          errors.email = {message:'존재하지 않는 이메일입니다.'};
        }
      });
      if(Object.keys(errors).length===0){ //errors = {}
        console.log(3);
        errors.id = {message:'아이디와 이메일이 일치하지 않습니다.'};
      }
      req.flash('id', req.body.id);
      req.flash('email', req.body.email);
      req.flash('errors', errors);
      return res.redirect('/login/findpw');
    }

    const code = crypto.randomBytes(256).toString('hex').substr(100, 5)+crypto.randomBytes(256).toString('base64').substr(50, 5);
    const data = {
      code: code,
      userId:user.id,
      ttl:300
    };
    Auth.create(data);
    util.sendMail(req.body.email, '[Classical] 비밀번호 찾기를 요청하셨습니다.','<html><div style="width:700px;background-color:#f7f9fa;display:block;"><div style="margin:50px; padding:30px; width:500px;background-color:white;border:1px solid #dfe3e6;display:inline-block;text-align:center;"><h2 style="display:inline-block;">비밀번호 찾기</h2><a style="display:inline-block;text-align:center;color:gray;font-size:14px;"> 회원님께서 Classical에 비밀번호 찾기를 요청하여, 귀하의 비밀번호를 변경할 수 있는 코드가 전송되었습니다. 단, 코드는 5분간 유효합니다. </a><h4 style="display:inline-block;">코드</h4><h3 style="display:block;padding-top:10px;padding-bottom:10px;padding-left:30px;padding-right:30px;background-color:#dfe3e6">'+code+'</h3></div></div></html>'
  );
    req.session.success={'msg':"해당 이메일로 링크를 발송했습니다."};
    Log.create({activity:'findpw'});
    res.redirect('/user/findpw/'+req.body.id);
  });
});

module.exports = router;
