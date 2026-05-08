const router  = require('express').Router();
const protect = require('../middleware/authMiddleware');
const { donate, getDonations } = require('../controllers/donationController');

router.post('/',       protect, donate);
router.get('/history', protect, getDonations);

module.exports = router;