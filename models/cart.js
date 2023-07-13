
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: Number,
    tax: Number,
  }],
  services: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
    quantity: Number,
    tax: Number,
  }],
});

module.exports = mongoose.model('Cart', cartSchema);
