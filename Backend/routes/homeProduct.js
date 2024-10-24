// routes/homeProduct.js
const express = require('express');
const HomeProduct = require('../models/HomeProduct'); // Adjust the path as necessary
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save in 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage });

// Endpoint for image upload
router.post('/upload-image', upload.single('image'), (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
});


// Add a new product
router.post('/add', async (req, res) => {
    
  const { name, details, imageUrl } = req.body;
  try {
    const productCount = await HomeProduct.countDocuments(); // Count existing products
    const newProduct = new HomeProduct({
      name,
      details,
      imageUrl,
      index: productCount + 1, // Set index based on count
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await HomeProduct.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await HomeProduct.findByIdAndDelete(req.params.id);
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

module.exports = router;
