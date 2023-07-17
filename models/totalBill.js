

const mongoose = require('mongoose');

const totalBillSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
        price: Number,
        totalPrice : Number,
        tax: Number,
      },
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Service',
        },
        quantity: Number,
        price: Number,
        totalPrice : Number,
        tax: Number,
      },
    ],
    totalValue: Number,
});

module.exports = mongoose.model('TotalBill', totalBillSchema);

