// routes/product.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to save uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  },
});

const upload = multer({ storage: storage });

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new product
router.post('/', upload.single('img'), async (req, res) => {
    console.log("Received file:", req.file); // Log the received file
    
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      img: req.file.path, // Store the file path
    });
  
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// Update a product
router.put('/:id', upload.single('img'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    if (req.file) product.img = req.file.path; // Update image path if new image uploaded

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
      const productId = req.params.id.trim(); // Trim the ID to remove any extra whitespace
  
      // Use deleteOne to delete the product
      const result = await Product.deleteOne({ _id: productId });
  
      // Check if a product was deleted
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json({ message: 'Product deleted' });
    } catch (err) {
      console.error("Error deleting product:", err);
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  });
  
module.exports = router;
