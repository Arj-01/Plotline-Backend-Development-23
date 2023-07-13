const express = require('express');
const router = express.Router();
const Product = require('../models/product.js');
const Service = require('../models/service.js');



// testing of this API using browser done //

router.get('/', async (req, res) => {
    try {

        const products = await Product.find();
        const services = await Service.find();
    
        res.status(200).json({ products, services });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
      }
});


module.exports = router;
