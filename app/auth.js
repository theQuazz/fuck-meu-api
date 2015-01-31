var passport       = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var User           = require('./models/user');

passport.use(new BearerStrategy(function(token, done) {
  User.findOne({token: token}, function(err, user) {
    done(err ? new Error('Invalid token') : null, user);
  });
}));

var auth = {};

auth.required = function(req, res, next) {
  passport.authenticate('bearer', { session: false })(req, res, next);
};

module.exports = auth;
