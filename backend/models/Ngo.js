const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title:       String,
  description: String,
  goal:        Number,
  raised:      Number,
  image:       String,
});

const ngoSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  cause:       String,
  location:    String,
  description: String,
  mission:     String,
  verified:    { type: Boolean, default: false },
  image:       String,
  campaigns:   [campaignSchema],
});

module.exports = mongoose.model('Ngo', ngoSchema);
