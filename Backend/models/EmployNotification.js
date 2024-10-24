const mongoose = require('mongoose');

const employNotificationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  pdfUrl: { type: String,  }, // Store the PDF URL
}, { timestamps: true });

module.exports = mongoose.model('EmployNotification', employNotificationSchema);
