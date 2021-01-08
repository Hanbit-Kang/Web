var express = require('express');
var router = express.Router();
var Account = require('../models/Account');
var util = require('../util');
const crypto = require('crypto');

router.get('/register', function(req, res){
  if(req.session.passport){
    req.session.error={'msg':"이미 로그인하였습니다."};
    res.redirect('/');
  }else{
    var id = req.flash('id')[0];
    var nickname = req.flash('nickname')[0];
    var email = req.flash('email')[0];
    var errors = req.flash('errors')[0] || {};
    res.render('register', {
      id:id,
      nickname: nickname,
      email:email,
      errors:errors
    });
  }
});

router.post('/register', function(req, res){
  Account.findOne({id:req.body.id}, function(err,user){
    if(user){
      req.flash('errors', parseError(11000, 'id'));
    }
  });
  Account.findOne({nickname:req.body.nickname}, function(err,user){
    if(user){
      req.flash('errors', parseError(11000, 'nickname'));
    }
  });
  Account.findOne({email:req.body.email}, function(err,user){
    if(user){
      req.flash('errors', parseError(11000, 'email'));
    }
  });
  req.body.verifyKey=crypto.randomBytes(256).toString('hex').substr(100, 5)+crypto.randomBytes(256).toString('base64').substr(50, 5);
  Account.create(req.body, function(err, account){
    if(err){
      req.flash('id', req.body.id);
      req.flash('nickname', req.body.nickname);
      req.flash('email', req.body.email);
      return res.redirect('/register');
    }
    console.log('REGISTER: '+req.body.id);
    util.sendMail(req.body.email, '[Classical] 이메일 인증을 진행하세요.',
    "<link href=\"https:\//fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap\" rel=\"stylesheet\"><div style=\"width:100%;height:100%;background-color:#f7f9fa;display:flex;flex-direction:column;justify-content:center;align-items:center;\"><div style=\"margin:30px;padding-top:15px;padding-bottom:15px;padding-left:30px;padding-right:30px; width:500px;height:250px;background-color:white;border:1px solid #dfe3e6;display:flex;flex-direction:column;justify-content:space-around;align-items:center;\"><h2 style=\"font-family: 'Nanum Gothic', sans-serif;\">이메일 인증</h2><a style=\"text-align:center;color:gray;font-size:14px;\"> Classical 계정 가입을 위한 이메일 인증코드입니다. 아래의 인증코드를 진행 중인 가입화면에 입력하시면 인증이 완료됩니다. </a><h4> 인증코드 </h4><h3 style=\"margin-top:-10px;padding-top:10px;padding-bottom:10px;padding-left:30px;padding-right:30px;background-color:#dfe3e6\"> "+req.body.verifyKey+" </h3></div></div>"
  );
    res.redirect('/register/verify?id='+req.body.id);
  });
});

router.get('/register/verify', function(req, res){
  var verify = req.flash('verify')[0];
  var errors = req.flash('errors')[0] || {};
  res.render('register/verify', {
    verify:verify,
    errors:errors
  });
});

router.post('/register/verify', function(req, res){
  Account.findOne({id:req.body.id, isVerified:false}, async function(err,user){
    if(err) return res.json(err);
    if(!user){
      req.session.error={'msg':"잘못된 접근입니다."};
      return res.redirect('/');
    }else if(user.verifyKey!=req.body.verifyKey){
      var errors = {};
      errors.verify = {message:'코드가 일치하지 않습니다.'};
      req.flash('verify', req.body.verifyKey);
      req.flash('errors', errors);
      return res.redirect('/register/verify?id='+req.body.id);
    }else{
      console.log('Email Verified: '+req.body.id);
      user.isVerified=true;
      user.save();
      await Account.update({_id:user}, {$unset:{verifyKey:1}}).exec();
      res.redirect('/welcome');
    }
  });
});

router.get('/welcome', function(req, res){
  res.render('welcome');
});

module.exports = router;

function parseError(errorcode, target){
  var parsed = {};
  if(errorcode == '11000'){
    if (target=='id'){
      parsed.id = {message:'이미 존재하는 아이디입니다.'};
    }
    if (target=='nickname'){
      parsed.nickname = {message:'이미 존재하는 닉네임입니다.'};
    }
    if (target=='email'){
      parsed.email = {message:'이미 존재하는 이메일입니다.'};
    }
  }
  return parsed;
}
