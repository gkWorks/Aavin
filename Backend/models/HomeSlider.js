const mongoose = require('mongoose');

const HomeSliderSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const HomeSlider = mongoose.model('HomeSlider', HomeSliderSchema);

module.exports = HomeSlider;
