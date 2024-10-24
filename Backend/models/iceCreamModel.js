const mongoose = require('mongoose');

const iceCreamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Candy', 'Cones', 'Ice-Cream Bowl', 'Ice-Cream Packs', 'Others'],
    required: true,
  },
  image: {
    type: String, // Store image URL
    required: true,
  },
});

const IceCream = mongoose.model('IceCream', iceCreamSchema);

module.exports = IceCream;
