const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/productModel'); // Import the Product model

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products'); // Directory for saving uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  },
});

const upload = multer({ storage });

// POST endpoint to add a new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, type } = req.body;
    const imageUrl = `/uploads/products/${req.file.filename}`; // Correct file path

    const newProduct = new Product({
      name,
      price,
      type,
      image: imageUrl,
    });

    await newProduct.save();
    res.status(201).json(newProduct); // Return the saved product entry
  } catch (error) {
    res.status(500).json({ message: 'Error saving product', error });
  }
});

// GET endpoint to fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all product entries
    res.status(200).json(products); // Return the list of products
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// DELETE endpoint to remove a product entry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id); // Remove product from the database
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

module.exports = router;
