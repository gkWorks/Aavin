const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { collection: 'allproduct' }); // Specify the collection name explicitly

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
