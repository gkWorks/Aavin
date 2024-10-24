const express = require('express');
const multer = require('multer');
const path = require('path');
const Dactivement = require('../models/activementmodel');
const { format } = require('date-fns'); // Importing date-fns for formatting the date

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/ActivementImg');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route for creating a new Dactivement
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newDactivement = new Dactivement({
      heading: req.body.heading,
      description: req.body.description,
      image: req.file.path,
      date: new Date(), // Date will be set automatically
    });

    await newDactivement.save();
    res.status(201).json(newDactivement);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Dactivement', error });
  }
});

// GET route to fetch all records and recent posts
router.get('/', async (req, res) => {
  try {
    // Fetch all activements sorted by date (most recent first)
    const dactivements = await Dactivement.find().sort({ date: -1 });

    // Format the date and adjust image path for the frontend
    const formattedActivements = dactivements.map(d => ({
      ...d.toObject(),
      image: `${req.protocol}://${req.get('host')}/${d.image}`, // Adjust image path
      date: format(new Date(d.date), 'dd-MM-yyyy'), // Format date
    }));

    // Get the 5 most recent activements for the "Recent Images" section
    const recentImages = formattedActivements.slice(0, 5); // Get the latest 5 records

    // Respond with all activements and recent images
    res.status(200).json({
      allActivements: formattedActivements,
      recentImages: recentImages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Dactivements', error });
  }
});

// DELETE route to remove dactivement by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDactivement = await Dactivement.findByIdAndDelete(id);

    if (!deletedDactivement) {
      return res.status(404).json({ error: 'Dactivement not found' });
    }

    res.json({ message: 'Dactivement deleted successfully' });
  } catch (error) {
    console.error('Error deleting dactivement:', error);
    res.status(500).json({ error: 'Failed to delete dactivement' });
  }
});

module.exports = router;
