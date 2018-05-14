require('dotenv').config();
const crypto = require("crypto");
const mongoose = require('mongoose');
const bcrypt       = require('bcrypt');
const bcryptSalt   = 10;
const Admin = require('../models/Admin.js');
const dbName = process.env.MONGODB_URI;

mongoose.Promise = Promise;

const admins = [
  {
    username: 'admin-patagonia',
    password: 'patagonia2018!',
    role: 'Admin'
  },
  {
    username: 'store-patagonia',
    password: 'store2018!',
    role: 'Store'
  }
]

const hashAdmins = admins.map(elem => {
  let salt = bcrypt.genSaltSync(bcryptSalt);
  let hashPass = bcrypt.hashSync(elem.password, salt);
  console.log(elem.password)
  elem['password'] = hashPass;
  return elem;
})

mongoose.connect(dbName, { useMongoClient: true })
  .then(() => {
    mongoose.connection.db.dropCollection('admins');
    Admin.create(hashAdmins)
    .then(admins => {
      admins.forEach(admin => {
        console.log(`${admin.username} ha sido creado!`)
      })
      mongoose.connection.close();
    })
    .catch(error => {
      console.log(error)
    })
  })
  .catch(error => {
    console.log(error)
  })

