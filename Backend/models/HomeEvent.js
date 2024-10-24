const mongoose = require('mongoose');

const homeEventSchema = new mongoose.Schema({
  details: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('HomeEvent', homeEventSchema);
