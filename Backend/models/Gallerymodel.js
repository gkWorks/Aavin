const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  images: {
    type: [String], // Array of image URLs
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
