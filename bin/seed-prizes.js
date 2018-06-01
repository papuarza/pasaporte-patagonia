require('dotenv').config();
const crypto = require("crypto");
const mongoose = require('mongoose');
const Prize = require('../models/Prize.js');
const dbName = process.env.MONGODB_URI;

mongoose.Promise = Promise;

const prizes = [
  {
    name: 'Vaso',
    kms: 45,
    image: 'images/pinta.png'
  },
  {
    name: 'Kit Posa-Vasos',
    kms: 45,
    image: 'images/vaso.png'
  },
  {
    name: 'Medias Patagonia',
    kms: 45,
    image: 'images/vaso.png'
  },
  {
    name: 'Gorro',
    kms: 45,
    image: 'images/gorra.svg'
  },
  {
    name: '4Pack 710ml',
    kms: 72,
    image: 'images/vaso.png'
  },
  {
    name: 'Remera Patagonia',
    kms: 90,
    image: 'images/camiseta.svg'
  },
  {
    name: '1 Growler + Carga',
    kms: 135,
    image: 'images/carga.png'
  },
  {
    name: 'Voucher Consumición',
    kms: 180,
    image: 'images/vaso.png'
  },
  {
    name: 'Buzo',
    kms: 226,
    image: 'images/buzo.svg'
  },
  {
    name: 'Mochila',
    kms: 271,
    image: 'images/mochila.svg'
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