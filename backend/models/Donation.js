const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ngoId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Ngo',  required: true },
  amount: { type: Number, required: true },
  date:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', donationSchema);
