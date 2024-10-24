const express = require('express');
const multer = require('multer');
const path = require('path');
const IceCream = require('../models/iceCreamModel'); // Import the IceCream model

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/iceCream'); // Directory for saving uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  },
});

const upload = multer({ storage });

// POST endpoint to add a new ice cream
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, type } = req.body;
    const imageUrl = `/uploads/iceCream/${req.file.filename}`; // Correct file path

    const newIceCream = new IceCream({
      name,
      price,
      type,
      image: imageUrl,
    });

    await newIceCream.save();
    res.status(201).json(newIceCream); // Return the saved ice cream entry
  } catch (error) {
    res.status(500).json({ message: 'Error saving ice cream', error });
  }
});


// GET endpoint to fetch all ice creams
router.get('/', async (req, res) => {
  try {
    const iceCreams = await IceCream.find(); // Fetch all ice cream entries
    res.status(200).json(iceCreams); // Return the list of ice creams
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ice creams', error });
  }
});

// DELETE endpoint to remove an ice cream entry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await IceCream.findByIdAndDelete(id); // Remove ice cream from the database
    res.status(200).json({ message: 'Ice cream deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ice cream', error });
  }
});


module.exports = router;
