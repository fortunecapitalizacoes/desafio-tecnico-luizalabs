const mongoose = require('mongoose');
const productSchema = require('./product').schema;

const orderSchema = new mongoose.Schema({
  order_id: { type: Number, required: true },
  total: { type: String, required: true },
  date: { type: Date, required: true },
  products: [productSchema],
});

module.exports = mongoose.model('Order', orderSchema);
