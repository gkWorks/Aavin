const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  tender: {
    type: String,
    required: true,
  },
  nature: {
    type: String,
    required: true,
  },
  dateOfPosting: {
    type: Date,
    required: true,
  },
  dateOfExpiry: {
    type: Date,
    required: true,
  },
  tenderDocument: {
    type: String, // Store the URL of the document
    required: true,
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const Tender = mongoose.model('Tender', tenderSchema);

module.exports = Tender;
