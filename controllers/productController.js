
const Product = require('../models/product');

module.exports.addProduct = async (req, res) => {
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
}