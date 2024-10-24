const express = require('express');
const WhatNew = require('../models/WhatNew'); // Adjust the path as necessary
const router = express.Router();

// Add new notification
router.post('/add', async (req, res) => {
  const { text } = req.body;
  try {
    const newNotification = new WhatNew({ text });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: 'Error adding notification', error });
  }
});

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await WhatNew.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
});

// Delete a notification by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedNotification = await WhatNew.findByIdAndDelete(req.params.id);
    res.json(deletedNotification);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification', error });
  }
});

module.exports = router;
