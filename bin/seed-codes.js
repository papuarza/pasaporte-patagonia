require('dotenv').config();
const crypto = require("crypto");
const mongoose = require('mongoose');
const Code = require('../models/Code.js');
const dbName = process.env.MONGODB_URI;
const codes = [];

mongoose.Promise = Promise;


// //CHOPP ON
// for(let x = 0; x < 3000; x++) {
//   let id = 
//   codes.push({
//     code_id: crypto.randomBytes(5).toString('HEX'),
//     kmsValue: 10,
//     type: 'Chopp ON',
//     status: 'Pendiente',
//     test: false
//   })
// }

// //CHOPP Refugio
// for(let x = 0; x < 1000; x++) {
//   let id = 
//   codes.push({
//     code_id: crypto.randomBytes(5).toString('HEX'),
//     kmsValue: 15,
//     type: 'Chopp Refugio',
//     status: 'Pendiente',
//     test: false
//   })
// }

// //6 Pack (Lata 473ml)
// for(let x = 0; x < 5000; x++) {
//   let id = 
//   codes.push({
//     code_id: crypto.randomBytes(5).toString('HEX'),
//     kmsValue: 35,
//     type: '6 Pack (Lata 473ml)',
//     status: 'Pendiente',
//     test: false
//   })
// }

// //6 Pack (Lata 24.7)
// for(let x = 0; x < 5000; x++) {
//   let id = 
//   codes.push({
//     code_id: crypto.randomBytes(5).toString('HEX'),
//     kmsValue: 40,
//     type: '6 Pack (Lata 24.7)',
//     status: 'Pendiente',
//     test: false
//   })
// }

// //4 Pack (Botella 355ml)
// for(let x = 0; x < 5000; x++) {
//   let id = 
//   codes.push({
//     code_id: crypto.randomBytes(5).toString('HEX'),
//     kmsValue: 25,
//     type: '4 Pack (Botella 355ml)',
//     status: 'Pendiente',
//     test: false
//   })
// }

// //4 Pack (Botella 730ml)
// for(let x = 0; x < 5000; x++) {
//   let id = 
//   codes.push({
//     code_id: crypto.randomBytes(5).toString('HEX'),
//     kmsValue: 30,
//     type: '4 Pack (Botella 730ml)',
//     status: 'Pendiente',
//     test: false
//   })
// }

// //Promo Botella 730ml ON
// for(let x = 0; x < 2000; x++) {
//   let id = 
//   codes.push({
//     code_id: crypto.randomBytes(5).toString('HEX'),
//     kmsValue: 35,
//     type: 'Promo Botella 730ml ON',
//     status: 'Pendiente',
//     test: false
//   })
// }

// //Marketing
// for(let x = 0; x < 500; x++) {
//   let id = 
//   codes.push({
//     code_id: crypto.randomBytes(5).toString('HEX'),
//     kmsValue: 10,
//     type: 'Marketing',
//     status: 'Pendiente',
//     test: false
//   })
// }

// //Test
// for(let x = 0; x < 500; x++) {
//   let id = 
//   codes.push({
//     code_id: crypto.randomBytes(5).toString('HEX'),
//     kmsValue: 50,
//     type: 'Test',
//     status: 'Pendiente',
//     test: true
//   })
// }

codes.push({
  code_id: crypto.randomBytes(5).toString('HEX'),
  kmsValue: 5,
  type: 'Programatic',
  status: 'Pendiente',
  test: false
})


mongoose.connect(dbName)
  .then(() => {
    // mongoose.connection.db.dropCollection('codes')
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

