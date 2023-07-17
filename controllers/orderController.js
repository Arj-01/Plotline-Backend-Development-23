const express = require("express");
const Order = require("../models/order.js");



module.exports.getOrders =  async (req, res) => {


    try {

        // console.log("hitting orders");

        const orders = await Order.find().populate('products.item').populate('services.item');
    
        res.status(200).json({ orders });

      } catch (error) {

        res.status(500).json({ message: 'An error occurred' });

      }
}