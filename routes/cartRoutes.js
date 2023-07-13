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
    try {
        const userId = req.user.userId;
    
        await Cart.findOneAndDelete({ userId });
    
        res.status(200).json({ message: 'Cart cleared successfully' });
      } 
      catch (error) {

        res.status(500).json({ message: 'An error occurred' });

      }
});

module.exports = router;
