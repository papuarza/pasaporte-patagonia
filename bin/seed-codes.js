require('dotenv').config();
const crypto = require("crypto");
const mongoose = require('mongoose');
const Code = require('../models/Code.js');
const dbName = process.env.MONGODB_URI;
const codes = [];

mongoose.Promise = Promise;

for(let x = 0; x < 1000; x++) {
  let id = 
  codes.push({
    code_id: crypto.randomBytes(5).toString('HEX'),
    kmsValue: 15,
    type: 'Chopp (300ml)',
    status: 'Pendiente',
    test: false
  })
}

for(let x = 0; x < 5000; x++) {
  let id = 
  codes.push({
    code_id: crypto.randomBytes(5).toString('HEX'),
    kmsValue: 20,
    type: '2 Pack (710ml)',
    status: 'Pendiente',
    test: false
  })
}

for(let x = 0; x < 7000; x++) {
  let id = 
  codes.push({
    code_id: crypto.randomBytes(5).toString('HEX'),
    kmsValue: 40,
    type: '4 Pack (710ml)',
    status: 'Pendiente',
    test: false
  })
}

for(let x = 0; x < 3000; x++) {
  let id = 
  codes.push({
    code_id: crypto.randomBytes(5).toString('HEX'),
    kmsValue: 60,
    type: '6 Pack (710ml)',
    status: 'Pendiente',
    test: false
  })
}

for(let x = 0; x < 3000; x++) {
  let id = 
  codes.push({
    code_id: crypto.randomBytes(5).toString('HEX'),
    kmsValue: 50,
    type: '6 Pack (473ml)',
    status: 'Pendiente',
    test: false
  })
}

for(let x = 0; x < 7000; x++) {
  let id = 
  codes.push({
    code_id: crypto.randomBytes(5).toString('HEX'),
    kmsValue: 30,
    type: '6 Pack (355ml)',
    status: 'Pendiente',
    test: false
  })
}

for(let x = 0; x < 500; x++) {
  let id = 
  codes.push({
    code_id: crypto.randomBytes(5).toString('HEX'),
    kmsValue: 10,
    type: 'Marketing',
    status: 'Pendiente',
    test: false
  })
}

for(let x = 0; x < 500; x++) {
  let id = 
  codes.push({
    code_id: crypto.randomBytes(5).toString('HEX'),
    kmsValue: 20,
    type: 'Marketing',
    status: 'Pendiente',
    test: false
  })
}

for(let x = 0; x < 500; x++) {
  let id = 
  codes.push({
    code_id: crypto.randomBytes(5).toString('HEX'),
    kmsValue: 50,
    type: 'Marketing',
    status: 'Pendiente',
    test: false
  })
}

for(let x = 0; x < 500; x++) {
  let id = 
  codes.push({
    code_id: crypto.randomBytes(5).toString('HEX'),
    kmsValue: 50,
    type: 'Test',
    status: 'Pendiente',
    test: true
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

