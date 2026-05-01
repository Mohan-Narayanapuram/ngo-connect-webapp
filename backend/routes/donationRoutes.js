const router   = require('express').Router();
const protect  = require('../middleware/authMiddleware');
const Donation = require('../models/Donation');
const Ngo      = require('../models/Ngo');

// POST /api/donate
router.post('/', protect, async (req, res) => {
  try {
    const { ngoId, campaignId, amount, paymentMethod } = req.body;

    if (!ngoId || !amount || amount <= 0)
      return res.status(400).json({ message: 'ngoId and a valid amount are required.' });

    const ngo = await Ngo.findById(ngoId);
    if (!ngo) return res.status(404).json({ message: 'NGO not found.' });

    // Resolve campaign title at write time (campaigns are embedded, not a separate collection)
    let campaignTitle = null;
    if (campaignId) {
      const campaign = ngo.campaigns.id(campaignId);
      if (campaign) {
        campaignTitle = campaign.title;
        campaign.raised = (campaign.raised || 0) + Number(amount);
        await ngo.save();
      }
    }

    const donation = await Donation.create({
      userId:        req.user._id,
      ngoId,
      campaignId:    campaignId || null,
      campaignTitle,                        // ← saved here
      amount:        Number(amount),
      paymentMethod: paymentMethod || 'card',
    });

    res.status(201).json({ message: 'Donation successful!', donation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during donation.' });
  }
});

// GET /api/users/donations  ← this is what Dashboard calls
router.get('/history', protect, async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user._id })
      .populate('ngoId', 'name cause location image')
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;