const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ngoId:         { type: mongoose.Schema.Types.ObjectId, ref: 'Ngo',  required: true },
  campaignId:    { type: mongoose.Schema.Types.ObjectId, default: null }, // embedded, no ref
  campaignTitle: { type: String, default: null }, // stored at write time
  amount:        { type: Number, required: true },
  paymentMethod: { type: String, default: 'card' },
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);