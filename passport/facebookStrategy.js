const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');


passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: `${process.env.URL}/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'email']
},
function(accessToken, refreshToken, profile, cb) {
  console.log('=====>', profile)
  // let email = profile.email || '';
  // let name = profile.name.givenName || '';
  // let lastName = profile.name.familyName || '';
  // User.create({ email, name, lastName })
  // .then(user => {
  //   return cb(null, user);
  // })
  return cb(null, profile);
  // .catch(error => console.log(error))
}
));