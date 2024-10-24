const mongoose = require('mongoose');

const DactivementSchema = new mongoose.Schema({
  heading: { type: String, }, // New heading field
  description: { type: String },
  image: { type: String }, // Store image URL/path
  date: { type: Date, default: Date.now }, // Automatically set to current date
  youtubeLinks: { type: [String] }, // Array to store multiple YouTube links
});

module.exports = mongoose.model('activement', DactivementSchema);
