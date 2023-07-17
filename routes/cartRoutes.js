const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authentication");
const {
  calculateProductTax,
  calculateServiceTax,
} = require("../utils/taxCalculator.js");
const Cart = require("../models/cart.js");
const Product = require("../models/product.js");
const Service = require("../models/service.js");
const TotalBill = require("../models/totalBill.js");

// fetching the cart for the authenticated user

router.get("/", authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId })
      .populate("products.item")
      .populate("services.item");

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// Adding an item to the cart
// testing

router.post("/:type/:itemId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { type, itemId } = req.params;
    const { quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart for the user if it doesn't exist
      cart = new Cart({ userId, products: [], services: [] });
    }

    let item;
    let tax;
    let totalPrice;
    let price;

    if (type === "product") {
      item = await Product.findById(itemId);
      //   console.log("3");
      tax = calculateProductTax(item.price, quantity);

      price = item.price;
      //   console.log("4");
      totalPrice = price * quantity + tax;

      cart.products.push({ item: itemId, quantity, price, totalPrice, tax });

    } else if (type === "service") {

      item = await Service.findById(itemId);
      tax = calculateServiceTax(item.price, quantity);
      price = item.price;

      totalPrice = price * quantity + tax;

      cart.services.push({ item: itemId, quantity, price, totalPrice, tax });
    } else {
      return res.status(400).json({ message: "Invalid item type" });
    }

    // console.log("1");

    await cart.save();

    // console.log("2");

    res.status(200).json({ message: "Item added to the cart", cart });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});





// Removing an item from the cart
router.delete("/:type/:itemId", authenticateToken, async (req, res) => {

  try{

    const userId = req.user.userId;
    const { type, itemId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    let items;
    if (type === 'product') {
      items = cart.products;
    } else if (type === 'service') {
      items = cart.services;
    } else {
      return res.status(400).json({ message: 'Invalid item type' });
    }

    ///
    const updatedItems = items.filter((item) => item.item.toString() !== itemId);

    if (type === 'product') {
      cart.products = updatedItems;
    } else if (type === 'service') {
      cart.services = updatedItems;
    }

    await cart.save();

    res.status(200).json({ message: 'Item removed from the cart', cart});
  } 
   
  catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }

});



// Clearing the cart
router.delete("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    await Cart.findOneAndDelete({ userId });

    res.status(200).json({ message: "Cart cleared successfully", Cart});
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});





// cart checkout 

router.post('/checkout', authenticateToken, async (req, res) => {
  
  try {
    
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId }).populate('products.item').populate('services.item');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const items = [...cart.products, ...cart.services];

    let totalValue = 0;

    for (const item of items) {

      const { item: itemId, quantity } = item;

      let price, tax;

      if (item.item instanceof Product) {
        price = item.item.price;
        tax = calculateProductTax(price, quantity);
      } else if (item.item instanceof Service) {
        price = item.item.price;
        tax = calculateServiceTax(price, quantity);
      } else {
        continue;
      }

      // item.price = price;
      // item.tax = tax;

      totalValue += price * quantity + tax;

    }

    const totalBill = new TotalBill({ userId, items, totalValue });
    
    await totalBill.save();

    res.status(200).json({ message: 'Checkout successful', totalBill});
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }

});


module.exports = router;
