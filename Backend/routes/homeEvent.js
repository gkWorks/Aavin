const express = require('express');
const HomeEvent = require('../models/HomeEvent'); // Adjust path as needed
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload-image', upload.single('image'), (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
});

router.post('/add', async (req, res) => {
  const { details, imageUrl } = req.body;
  try {
    const newEvent = new HomeEvent({ details, imageUrl });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding event', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await HomeEvent.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await HomeEvent.findByIdAndDelete(req.params.id);
    res.json(deletedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
});

module.exports = router;
