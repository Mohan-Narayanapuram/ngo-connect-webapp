const Donation = require('../models/Donation');
const Ngo      = require('../models/Ngo');

exports.donate = async (req, res) => {
  try {
    const { ngoId, amount } = req.body;
    if (!ngoId || !amount || amount <= 0)
      return res.status(400).json({ message: 'Invalid donation data' });

    const donation = await Donation.create({
      userId: req.user.id,
      ngoId,
      amount,
    });
    res.status(201).json({ message: 'Donation successful!', donation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
