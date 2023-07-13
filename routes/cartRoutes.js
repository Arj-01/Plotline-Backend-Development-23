const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middleware/authentication');
const {calculateProductTax, calculateServiceTax } = require('../utils/taxCalculator.js');
const Cart = require('../models/cart');



// fetching the cart for the authenticated user

router.get('/', authenticateToken, async (req, res) => {
    try {
      
      const cart = await Cart.findOne({ userId: req.user.userId })
        .populate('products.item')
        .populate('services.item');
  
      res.status(200).json({ cart });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
});

// Adding an item to the cart
// testing 

router.post('/:type/:itemId', authenticateToken, async (req, res) => {


    try {

        // console.log("hitting");

        const userId = req.user.userId;
        const { type, itemId } = req.params;
        const { quantity } = req.body;
    
        let cart = await Cart.findOne({ userId });
    
        if (!cart) {
          // Creating a new cart for the user if it doesn't exist
          cart = new Cart({ userId, products: [], services: [] });
        }
    
        let item;
        let tax;
        let totalPrice;
    
        if (type === 'product') {
          item = await Product.findById(itemId);
          tax = calculateProductTax(item.price);
          totalPrice = item.price * quantity + tax;
    
          cart.products.push({ item: itemId, quantity, tax });
        } else if (type === 'service') {
          item = await Service.findById(itemId);
          tax = calculateServiceTax(item.price);
          totalPrice = item.price * quantity + tax;
    
          cart.services.push({ item: itemId, quantity, tax });
        } else {
          return res.status(400).json({ message: 'Invalid item type' });
        }
    
        await cart.save();
    
        res.status(200).json({ message: 'Item added to the cart', totalPrice, cart});
      } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
      }
  
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
