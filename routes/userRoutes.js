const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// User's Registration API endpoint //

router.post('/', async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;

    // checking if user is already registered by taking email is Primary-Key //
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Password Hashing using bcrypt technique //
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new User with the given credentials //
    const user = new User({
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    // Saving user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});


module.exports = router;
