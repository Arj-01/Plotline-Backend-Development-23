

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authentication');
const Cart = require('../models/cart');

// Adding an item to the cart
router.post('/:type/:itemId', authenticateToken, async (req, res) => {
  
});

// Removing an item from the cart
router.delete('/:type/:itemId', authenticateToken, async (req, res) => {
  
});

// Clearing the cart 
router.delete('/', authenticateToken, async (req, res) => {
 
});

module.exports = router;
