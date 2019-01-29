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
    name: 'Growler + Carga',
    kms: 80,
    image: 'images/crawler-w.svg'
  },
  {
    name: 'Remera',
    kms: 100,
    image: 'images/remera-w.svg'
  },
  {
    name: 'Kepi',
    kms: 80,
    image: 'images/gorra-w.svg'
  },
  {
    name: 'Abridor',
    kms: 40,
    image: 'images/buzo-w.svg'
  },
  {
    name: 'Mochila',
    kms: 200,
    image: 'images/mochila-w.svg'
  }
]

mongoose.connect(dbName)
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

  // {
  //   name: 'Vaso Nonic',
  //   kms: 60,
  //   image: 'images/nonic-w.svg'
  // },