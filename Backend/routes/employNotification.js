const express = require('express');
const multer = require('multer'); // Import multer
const EmployNotification = require('../models/EmployNotification'); // Adjust the path as necessary
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/employNotification'); // Specify the directory to save the uploaded file
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Add a timestamp to the filename
  },
});

const upload = multer({ storage: storage });

// Add new employment notification
router.post('/add', upload.single('pdfUrl'), async (req, res) => {
  const { text } = req.body; // Get the text from the request body
  const pdfUrl = req.file.path; // Get the file path from the uploaded file

  try {
    const newNotification = new EmployNotification({ text, pdfUrl });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: 'Error adding employment notification', error });
  }
});

// Get all employment notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await EmployNotification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employment notifications', error });
  }
});

// Delete an employment notification by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedNotification = await EmployNotification.findByIdAndDelete(req.params.id);
    res.json(deletedNotification);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employment notification', error });
  }
});

module.exports = router;
