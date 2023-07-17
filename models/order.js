
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    products: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
        price : Number,
        totalPrice: Number,
        tax: Number,
      },
    ],
    services: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Service',
        },
        quantity: Number,
        price : Number,
        totalPrice: Number,
        tax: Number,
      },
    ],
    totalPrice: Number,
});

module.exports = mongoose.model('Order', orderSchema);