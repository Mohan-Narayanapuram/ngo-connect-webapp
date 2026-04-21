const router  = require('express').Router();
const protect = require('../middleware/authMiddleware');
const { donate } = require('../controllers/donationController');

// Simulated payment check middleware
function simulatePayment(req, res, next) {
  const { amount } = req.body;
  if (!amount || amount <= 0)
    return res.status(400).json({ message: 'Invalid amount' });
  // Simulate 95% success rate (for demo/viva purposes)
  const success = Math.random() > 0.05;
  if (!success)
    return res.status(402).json({ message: 'Payment failed. Please try again.' });
  next();
}

router.post('/', protect, simulatePayment, donate);

module.exports = router;