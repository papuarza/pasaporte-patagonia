const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');

passport.use(new LocalStrategy({
  usernameField: 'dni',
  passwordField: 'password',
  passReqToCallback: true},
  (req, dni, password, next) => {
  User.findOne({ dni })
  .then(foundUser => {
    if (!foundUser) {
      next(null, false, { message: 'Incorrect username' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Incorrect password' });
      return;
    }
    next(null, foundUser);
  })
  .catch(error => {
    next(error)
  })
}));
