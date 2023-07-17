const express = require("express");
const router = express.Router();
const {isAdmin} = require("../middleware/authentication.js");
const Order = require("../models/order.js");



router.get('/', isAdmin, async (req, res) => {


    try {

        // console.log("hitting orders");

        const orders = await Order.find().populate('products.item').populate('services.item');
    
        res.status(200).json({ orders });

      } catch (error) {

        res.status(500).json({ message: 'An error occurred' });

      }
});

module.exports = router;