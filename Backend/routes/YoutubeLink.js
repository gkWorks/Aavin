const express = require('express');
const YoutubeLink = require('../models/YoutubeLink'); // Import your schema

const router = express.Router();

// POST route for updating YouTube links
router.post('/update-youtube-links', async (req, res) => {
  try {
    const { youtubeLinks } = req.body; // Get YouTube links from the request body

    // Find the first document in the YoutubeLink collection
    let youtubeDoc = await YoutubeLink.findOne();

    if (youtubeDoc) {
      // If document exists, update it
      youtubeDoc.youtubeLinks = youtubeLinks;
      await youtubeDoc.save();
      res.status(200).json({ message: 'YouTube links updated successfully' });
    } else {
      // If no document exists, create a new one
      const newYoutubeDoc = new YoutubeLink({ youtubeLinks });
      await newYoutubeDoc.save();
      res.status(201).json({ message: 'YouTube links created successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating YouTube links', error });
  }
});

// GET route for fetching YouTube links
router.get('/get-youtube-links', async (req, res) => {
  try {
    const youtubeDoc = await YoutubeLink.findOne();
    if (youtubeDoc) {
      res.status(200).json({ youtubeLinks: youtubeDoc.youtubeLinks });
    } else {
      res.status(404).json({ message: 'No YouTube links found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching YouTube links', error });
  }
});

module.exports = router;
