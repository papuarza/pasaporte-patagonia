const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const codeSchema = new Schema({
  code_id: String,
  kmsValue: Number,
  status: {type: String, enum: ['Pendiente', 'Canjeado']},
  usedDate: Date
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Code = mongoose.model('Code', codeSchema);
module.exports = Code;
