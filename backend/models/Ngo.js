const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title:       String,
  description: String,
  goal:        Number,
  raised:      { type: Number, default: 0 },
  image:       String,
});

const ngoSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, default: null },
  cause:       String,
  location:    String,
  description: String,
  mission:     String,
  verified:    { type: Boolean, default: false },
  image:       String,
  campaigns:   [campaignSchema],
});

module.exports = mongoose.model('Ngo', ngoSchema);