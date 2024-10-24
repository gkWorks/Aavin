// models/Milk.js

const mongoose = require('mongoose');

const milkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true }, // Store the image path
}, { timestamps: true });

module.exports = mongoose.model('Milk', milkSchema);
