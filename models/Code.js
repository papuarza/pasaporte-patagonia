const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const codeSchema = new Schema({
  code_id: String,
  kmsValue: Number,
  status: {type: String, enum: ['Pendiente', 'Canjeado']},
  type: {type: String, enum: ['Programatic', 'Test', 'Marketing', 'Promo Botella 730ml ON', '4 Pack (Botella 730ml)', '4 Pack (Botella 355ml)', '6 Pack (Lata 24.7)', '6 Pack (Lata 473ml)', 'Chopp Refugio', 'Chopp ON']},
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
