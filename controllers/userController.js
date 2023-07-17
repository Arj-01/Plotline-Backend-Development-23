const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


module.exports.register = async(req, res) => {

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

}


module.exports.login = async(req, res) => {

    try {
        const { email, password } = req.body;
    
        // finding user in database using mongoose findOne() function
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        // password comparison 
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        // JWT token
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, 'secret_key');
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.status(200).json({ message: 'Login successful' });
      } 
      catch (error) {
        res.status(500).json({ message: 'An error occurred' });
      }

}



module.exports.logout = async(req, res) => {

    try{
        // console.log("logout-hitting");
        const token = req.cookies.token;
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully' });
    }catch (error){
        res.status(500).json({ message: 'An error occurred' });
    }

}


