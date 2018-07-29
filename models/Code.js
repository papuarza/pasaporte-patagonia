const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const codeSchema = new Schema({
  code_id: String,
  kmsValue: Number,
  status: {type: String, enum: ['Pendiente', 'Canjeado']},
  type: {type: String, enum: ['Chopp (300ml)', '2 Pack (710ml)', '4 Pack (710ml)', '6 Pack (710ml)', '6 Pack (473ml)', '6 Pack (355ml)', 'Marketing']},
  test: {type: Boolean},
  usedDate: Date
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Code = mongoose.model('Code', codeSchema);
module.exports = Code;
