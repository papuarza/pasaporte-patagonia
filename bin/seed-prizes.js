require('dotenv').config();
const crypto = require("crypto");
const mongoose = require('mongoose');
const Prize = require('../models/Prize.js');
const dbName = process.env.MONGODB_URI;

mongoose.Promise = Promise;

const prizes = [
  {
    name: 'Voucher Consumición',
    kms: 60,
    image: 'images/voucher-w.svg'
  },
  {
    name: 'Vaso Riegsse',
    kms: 60,
    image: 'images/riegsse-w.svg'
  },
  {
    name: 'Vaso Nonic',
    kms: 60,
    image: 'images/nonic-w.svg'
  },
  {
    name: 'Growler',
    kms: 80,
    image: 'images/crawler-w.svg'
  },
  {
    name: 'Remera Patagonia',
    kms: 80,
    image: 'images/remera-w.svg'
  },
  {
    name: 'Gorro',
    kms: 100,
    image: 'images/gorra-w.svg'
  },
  {
    name: 'Buzo',
    kms: 150,
    image: 'images/buzo-w.svg'
  },
  {
    name: 'Mochila',
    kms: 200,
    image: 'images/mochila-w.svg'
  }
]

mongoose.connect(dbName, { useMongoClient: true })
  .then(() => {
    mongoose.connection.db.dropCollection('prizes');
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