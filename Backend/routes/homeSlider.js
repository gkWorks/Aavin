const express = require('express');
const multer = require('multer');
const HomeSlider = require('../models/HomeSlider');

const router = express.Router();

// Set up multer for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle image uploads
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Check if the image was uploaded
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Create the image URL for the uploaded image
    const imageUrl = req.file.buffer.toString('base64'); // Convert image buffer to base64 string

    // Save to MongoDB
    const newImage = new HomeSlider({ imageUrl });
    await newImage.save();

    return res.status(201).json(newImage);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route to get all images
router.get('/', async (req, res) => {
    try {
      const images = await HomeSlider.find();
      return res.status(200).json(images);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

// Route to delete an image by ID
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await HomeSlider.findByIdAndDelete(id); // Delete the image from the database
      return res.status(204).send(); // No content
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
