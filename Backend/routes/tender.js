const express = require('express');
const router = express.Router();
const Tender = require('../models/Tender'); // Adjust the path as necessary
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Add this line to import fs

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/tenders'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Route to add a new tender
router.post('/', upload.single('tenderDocument'), async (req, res) => {
  console.log('Tender route called');
  try {
    const { tender, nature, dateOfPosting, dateOfExpiry } = req.body;
    const tenderDocument = req.file ? `/uploads/tenders/${req.file.filename}` : '';

    const newTender = new Tender({
      tender,
      nature,
      dateOfPosting,
      dateOfExpiry,
      tenderDocument
    });

    const savedTender = await newTender.save();
    res.status(201).json(savedTender);
  } catch (error) {
    console.error('Error adding tender:', error);
    res.status(500).json({ message: 'Error adding tender', error });
  }
});

router.get('/', async (req, res) => {
    console.log('Fetching all tenders');
    try {
        const tenders = await Tender.find();
        res.json(tenders);
    } catch (error) {
        console.error('Error fetching tenders:', error);
        res.status(500).json({ message: 'Error fetching tenders' });
    }
});


// Delete a tender by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Attempting to delete tender with ID:", id); // Log the ID
        
        const tender = await Tender.findById(id); // Log the tender found
        console.log("Tender found:", tender);
        
        if (!tender) {
            console.log("Tender not found");
            return res.status(404).json({ message: 'Tender not found' });
        }

        const deletedTender = await Tender.findByIdAndDelete(id);

        const filePath = path.join(__dirname, '..', tender.tenderDocument);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.json({ message: 'Tender deleted successfully' });
    } catch (error) {
        console.error('Error deleting tender:', error);
        res.status(500).json({ message: 'Error deleting tender' });
    }
});

module.exports = router;
