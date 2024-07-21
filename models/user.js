const mongoose = require('mongoose');
const orderSchema = require('./order').schema;

const userSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  name: { type: String, required: true },
  orders: [orderSchema],
});

module.exports = mongoose.model('User', userSchema);
