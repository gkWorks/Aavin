const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  img: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Event", eventSchema);
