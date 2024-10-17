const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Add a new event
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to add event", error });
  }
});

// Fetch all events
router.get("/", async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events", error });
    }
  });
  

// Update an existing event
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to update event", error });
  }
});

// Delete an existing event
router.delete("/:id", async (req, res) => {
    try {
      await Event.findByIdAndDelete(req.params.id);
      res.status(204).send(); // Send no content response
    } catch (error) {
      res.status(500).json({ message: "Failed to delete event", error });
    }
  });
  

module.exports = router;
