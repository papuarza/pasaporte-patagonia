require('dotenv').config();
const crypto = require("crypto");
const mongoose = require('mongoose');
const Prize = require('../models/Prize.js');
const dbName = process.env.MONGODB_URI;

mongoose.Promise = Promise;

const prizes = [
  {
    name: 'Pinta',
    kms: 100,
    image: 'images/pinta.png'
  },
  {
    name: 'Carga Growler',
    kms: 300,
    image: 'images/carga.png'
  },
  {
    name: 'Vaso Patagonia',
    kms: 400,
    image: 'images/vaso.png'
  }
]

mongoose.connect(dbName, { useMongoClient: true })
  .then(() => {
    // mongoose.connection.db.dropCollection('prizes');
    Prize.create(prizes)
    .then(prizes => {
      prizes.forEach(prize => {
        console.log(`${prize.name} ha sido creado!`)
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