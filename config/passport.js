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
      .select({password:1})
      .exec(function(err, account){
        if(err) return done(err);
        if(account && account.authenticate(password)){
          return done(null, account);
        }
        else{
          req.flash('id', id);
          req.flash('errors', {login: '아이디 또는 비밀번호가 일치하지 않습니다.'});
          return done(null, false);
        }
      });
  }
)
);
