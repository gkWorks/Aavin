const express = require('express');
const router = express.Router();
const Milk = require('../models/Milk');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create upload directory if it doesn't exist
const milkUploadDir = path.join(__dirname, '../uploads/milk');
if (!fs.existsSync(milkUploadDir)){
    fs.mkdirSync(milkUploadDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, milkUploadDir); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Route to add a new milk entry
router.post('/', upload.single('image'), async (req, res) => {
  
  try {
    const { name, price } = req.body;
    const image = req.file ? `/uploads/milk/${req.file.filename}` : ''; // Set image path

    const newMilk = new Milk({
      name,
      price,
      image
    });

    const savedMilk = await newMilk.save();
    res.status(201).json(savedMilk);
  } catch (error) {
    console.error('Error adding milk:', error);
    res.status(500).json({ message: 'Error adding milk', error });
  }
});

// Route to get all milk entries
router.get('/', async (req, res) => {
  try {
    const milks = await Milk.find();
    res.json(milks);
  } catch (error) {
    console.error('Error fetching milk entries:', error);
    res.status(500).json({ message: 'Error fetching milk entries' });
  }
});

// Route to delete a milk entry
router.delete('/:id', async (req, res) => {
    try {
      const deletedMilk = await Milk.findByIdAndDelete(req.params.id);
      if (!deletedMilk) {
        return res.status(404).json({ message: 'Milk not found' });
      }
      res.status(204).send(); // No content to send back
    } catch (error) {
      console.error('Error deleting milk:', error);
      res.status(500).json({ message: 'Error deleting milk', error });
    }
  });
  

module.exports = router;
