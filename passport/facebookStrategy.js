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
function(accessToken, refreshToken, profile, cb, papu) {
  console.log(profile, papu)
  let email = profile.email || '';
  let name = profile.name.givenName || '';
  let lastName = profile.name.familyName || '';
  User.create({ email, name, lastName })
  .then(user => {
    return cb(null, user);
  })
  .catch(error => console.log(error))
}
));