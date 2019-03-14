require('dotenv').config();
const crypto = require("crypto");
const mongoose = require('mongoose');
const User = require('../models/User.js');
const dbName = process.env.MONGODB_URI;
const emailing = require('../nodemailer/config.js');

mongoose.Promise = Promise;

mongoose.connect(dbName)
  .then(() => {
    User.find({role: 'User'})
    .then(users => {
      let sendEmails = [];
        users.forEach(user => {
            sendEmails.push(emailing.sendTheEmail(user, 'newsletter', ''))
        })
      Promise.all(sendEmails)
      .then(users => {
        console.log(`Enviado a ${users.length} usuarios!`)
        mongoose.connection.close();
      })
    })
    .catch(error => {
      console.log(error)
    })
  })
  .catch(error => {
    console.log(error)
  })

