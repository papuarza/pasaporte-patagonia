const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');


passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: `${process.env.URL}/auth/facebook/callback`
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile)
  return cb(err, profile);
}
));