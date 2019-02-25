require('dotenv').config();
const crypto = require("crypto");
const mongoose = require('mongoose');
const bcrypt       = require('bcrypt');
const bcryptSalt   = 10;
const User = require('../models/User.js');
const dbName = process.env.MONGODB_URI;

mongoose.Promise = Promise;

const admins = [
  {
    dni: 'admin-patagonia',
    password: 'patagonia2018!',
    role: 'Admin',
    status: 'Activado'
  },
  {
    dni: 'centrocanje1',
    password: 'centrocanjeuno!',
    role: 'Store',
    status: 'Activado'
  },
  {
    dni: 'centrocanje2',
    password: 'centrocanjedos!',
    role: 'Store',
    status: 'Activado'
  },
  {
    dni: 'centrocanje3',
    password: 'centrocanjetres!',
    role: 'Store',
    status: 'Activado'
  },
  {
    dni: 'centrocanje4',
    password: 'centrocanjecuatro!',
    role: 'Store',
    status: 'Activado'
  },
  {
    dni: 'centrocanje5',
    password: 'centrocanjecinco!',
    role: 'Store',
    status: 'Activado'
  },
  {
    dni: 'centrocanje6',
    password: 'centrocanjeseis!',
    role: 'Store',
    status: 'Activado'
  },
  {
    dni: 'centrocanje7',
    password: 'centrocanjesiete!',
    role: 'Store',
    status: 'Activado'
  },
  {
    dni: 'centrocanje8',
    password: 'centrocanjeocho!',
    role: 'Store',
    status: 'Activado'
  },
  {
    dni: '1',
    password: '1',
    role: 'Store',
    status: 'Activado'
  }
]

const hashAdmins = admins.map(elem => {
  let salt = bcrypt.genSaltSync(bcryptSalt);
  let hashPass = bcrypt.hashSync(elem.password, salt);
  elem['password'] = hashPass;
  return elem;
})

mongoose.connect(dbName)
  .then(() => {
    User.create(hashAdmins)
    .then(admins => {
      admins.forEach(admin => {
        console.log(`${admin.dni} ha sido creado!`)
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

