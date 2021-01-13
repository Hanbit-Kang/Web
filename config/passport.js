var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/Account');
var Auth = require('../models/Auth');
var Log = require('../models/Log');

var tryCount = 1;
var loginResumeAt;

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
      .exec(async function(err, account){
        if(err) return done(err);
        if(!(account && account.authenticate(password))){
          if(loginResumeAt){
            var now = new Date();
            if(Number(loginResumeAt)>Number(now)){
              var errors={};
              errors.login = {message: '로그인을 '+tryCount+'회 시도하였습니다. '+Math.floor((Number(loginResumeAt)-Number(now))/1000)+'초 뒤에 로그인을 시도하실 수 있습니다.'};
              req.flash('id', req.body.id);
              req.flash('errors', errors);
              return done(null, false);
            }
          }
          tryCount+=1;
          if(tryCount>=5&&(tryCount)%5==0){
            loginResumeAt=new Date();
            loginResumeAt.setSeconds(loginResumeAt.getSeconds()+tryCount*6);
          }

          var errors={};
          errors.login = {message: '아이디 또는 비밀번호가 일치하지 않습니다.'};
          req.flash('id', id);
          req.flash('errors', errors);
          return done(null, false);
        }else{
          if(!account.isVerified){
            var errors={};
            errors.verify = {id: account.id};
            req.flash('errors', errors);
            return done(null, false);
          }else{//SUCCESS!!!!
            await Auth.find({userId:account.id}, function(err, auths){
              for(var i in auths){
                var t = new Date();
                t.setSeconds(t.getSeconds()-auths[i].ttl);
                if(auths[i].createdAt<=t){
                  auths[i].deleteOne();
                }
              }
            });
            if(account.isSuspended){
              var now = new Date();
              if(now>account.resumeAt){
                Log.create({activity:'suspend END :'+account.id});
                account.isSuspended=false;
                account.save();
              }
            }
            tryCount=1;
            loginResumeAt=null;
            req.session.success={'msg':"로그인에 성공했습니다."};
            console.log('LOG IN: ' + account.id);
            Log.create({activity:'login'});
            return done(null, account);
          }
        }
      });
  }
)
);
