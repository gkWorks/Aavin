
const mongoose = require('mongoose');

const homeProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    unique: true,
  },
});

const HomeProduct = mongoose.model('HomeProduct', homeProductSchema);

module.exports = HomeProduct;
