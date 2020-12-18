var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/Account');

passport.serializeUser(function(account, done){
  done(null, account.id);
});
passport.deserializeUser(function(id, done){
  Account.findOne({id:id}, function(err, account){
    done(err, account);
  });
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
          req.flash('errors', {login: 'Incorrect!'});
          return done(null, false);
        }
      });
  }
)
);
