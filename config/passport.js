var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/Account');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//local Strategy
passport.use('local-login',
  new LocalStrategy({
    usernameField : 'id',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, id, password, done){
    Account.findOne({id:id})
      //.select({nickname:1, id:1, password:1})
      .exec(function(err, account){
        if(err) return done(err);
        if(account && account.authenticate(password)){
          if(!account.isVerified){
            var errors={};
            errors.verify = {id: account.id};
            req.flash('errors', errors);
            return done(null, false);
          }else{//SUCCESS
            req.session.success={'msg':"로그인에 성공했습니다."};
            console.log('LOG IN: ' + account.id);
            return done(null, account);
          }
        }else{
          var errors={};
          errors.login = {message: '아이디 또는 비밀번호가 일치하지 않습니다.'};
          req.flash('id', id);
          req.flash('errors', errors);
          return done(null, false);
        }
      });
  }
)
);
