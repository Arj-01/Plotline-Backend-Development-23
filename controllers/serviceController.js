const express = require('express');
const Service = require('../models/service.js');


module.exports.addService = async (req, res) => {
    try {
        // Creating a new service
        const service = new Service({
          name: req.body.name,
          price: req.body.price,
        });
    
        // Save the service to the database
        await service.save();
    
        res.status(201).json({ message: 'Service added successfully' });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
      }
}