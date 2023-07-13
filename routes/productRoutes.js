const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/authentication');
const Product = require('../models/product');

// Add a product will only be accessible by the admin
router.post('/users/addProduct', isAdmin, async (req, res) => {
  try {
    // Creating a new product
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
    });

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});


module.exports = router;