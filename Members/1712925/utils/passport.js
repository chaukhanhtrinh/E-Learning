var validator=require('express-validator');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

var settings=require('../utils/settings');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local.register',new LocalStrategy({
    usernameField: 'email', // Tên input mail
    passwordField: 'password', //intput pass
    passReqToCallback: true
  }, function(req,email,password,done){
    //validator các input từ trang đăng kí
    

  }));