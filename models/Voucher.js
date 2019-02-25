const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const voucherSchema = new Schema({
  voucher: String,
  kmsUsed: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  prize: { type: Schema.Types.ObjectId, ref: 'Prize' },
  status: { type: String, enum: ['Generado', 'Utilizado'], default: 'Generado'},
  centro: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;
