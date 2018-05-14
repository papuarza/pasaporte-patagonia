const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const adminSchema = new Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['Store', 'Admin']}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;