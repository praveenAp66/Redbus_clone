// src/routes/config.js or any suitable file
const express = require('express');
const router = express.Router();

const config= (req, res) => {
  res.json({
    razorpaykeyid: process.env.KEY_ID, // Example variable from .env
    razorpaysecretkeyid: process.env.KEY_SECRET// Add other variables as needed
  });
};

module.exports = config;
