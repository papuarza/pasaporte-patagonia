require('dotenv').config();
const crypto = require("crypto");
const mongoose = require('mongoose');
const User = require('../models/User.js');
const dbName = process.env.MONGODB_URI;
const emailing = require('../nodemailer/config.js');

mongoose.Promise = Promise;

mongoose.connect(dbName)
  .then(() => {
    User.findOne({email: 'User'})
    .populate('codes')
    .then(users => {
      let sendEmails = [];
        users.codes.forEach(code => {
            console.log(code)
        })
    })
    .catch(error => {
      console.log(error)
    })
  })
  .catch(error => {
    console.log(error)
  })

