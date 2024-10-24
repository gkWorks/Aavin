const mongoose = require('mongoose');

const youtubeLinkSchema = new mongoose.Schema({
  youtubeLinks: { type: [String], required: true }, // Store multiple YouTube links in an array
});

module.exports = mongoose.model('YoutubeLink', youtubeLinkSchema);
