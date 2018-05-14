require('dotenv').config();
const crypto = require("crypto");
const mongoose = require('mongoose');
const Code = require('../models/Code.js');
const dbName = process.env.MONGODB_URI;
const codes = [];

mongoose.Promise = Promise;

for(var x = 0; x < 50; x++) {
  let id = 
  codes.push({
    code_id: crypto.randomBytes(5).toString('HEX'),
    kmsValue: 20,
    status: 'Pendiente',
  })
}

mongoose.connect(dbName, { useMongoClient: true })
  .then(() => {
    mongoose.connection.db.dropCollection('codes')
    Code.create(codes)
    .then(codes => {
      console.log(`Se han creado ${codes.length} códigos`);
      mongoose.connection.close();
    })
    .catch(error => {
      console.log(error)
    })
  })
  .catch(error => {
    console.log(error)
  })

