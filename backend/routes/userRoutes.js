const router  = require('express').Router();
const protect = require('../middleware/authMiddleware');
const User    = require('../models/User');
const Donation = require('../models/Donation');

// GET /api/users/me — logged-in user profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/donations — logged-in user's donation history
router.get('/donations', protect, async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user.id })
      .populate('ngoId', 'name cause image')
      .sort({ date: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;