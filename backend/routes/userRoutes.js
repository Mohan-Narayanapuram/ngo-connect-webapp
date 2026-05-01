const router   = require('express').Router();
const protect  = require('../middleware/authMiddleware');
const User     = require('../models/User');
const Donation = require('../models/Donation');
const bcrypt   = require('bcryptjs');

// GET /api/users/me
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/users/donations
router.get('/donations', protect, async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user._id })
      .populate('ngoId', 'name cause location image')
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    console.error('Donations error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT /api/users/me — update name & email
router.put('/me', protect, async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email)
      return res.status(400).json({ message: 'Name and email are required.' });

    const existing = await User.findOne({ email });
    if (existing && existing._id.toString() !== req.user._id.toString())
      return res.status(400).json({ message: 'Email is already in use.' });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Update failed.' });
  }
});

// PUT /api/users/password — change password
router.put('/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: 'Both fields are required.' });

    const user = await User.findById(req.user._id);
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return res.status(400).json({ message: 'Current password is incorrect.' });

    if (newPassword.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Password change failed.' });
  }
});

module.exports = router;