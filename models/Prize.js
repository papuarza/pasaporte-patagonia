const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const prizeSchema = new Schema({
  name: String,
  kms: Number,
  image: String,
  qty: Number,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Prize = mongoose.model('Prize', prizeSchema);
module.exports = Prize;
