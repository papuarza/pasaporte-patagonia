const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  lastName: String,
  dni: String,
  role: String,
  birthdate: { type: Date, default: Date.now() },
  gender: {type: String, enum: ['hombre', 'mujer']},
  codes: [{ type: Schema.Types.ObjectId, ref: 'Code' }],
  vouchers: [{ type: Schema.Types.ObjectId, ref: 'Voucher' }],
  kmsTotal: { type: Number, default: 0 },
  kmsAvailable: { type: Number, default: 0 },
  activationCode: String,
  category: { 
    name: String,
    image: String
  },
  status: { type: String, enum: ['Falta Confirmación', 'Activado'], default: 'Falta Confirmación'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
