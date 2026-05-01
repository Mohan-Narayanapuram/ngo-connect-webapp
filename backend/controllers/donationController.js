const Donation = require('../models/Donation');
const Ngo      = require('../models/Ngo');

exports.donate = async (req, res) => {
  try {
    const { ngoId, campaignId, amount, paymentMethod } = req.body;

    if (!ngoId || !amount || amount <= 0)
      return res.status(400).json({ message: 'Invalid donation data' });

    // Validate campaignId belongs to this NGO
    let validatedCampaignId = null;
    let campaignTitle       = null;

    if (campaignId) {
      const ngo = await Ngo.findById(ngoId);
      const campaign = ngo?.campaigns?.find(c => c._id.toString() === campaignId);
      if (!campaign)
        return res.status(400).json({ message: 'Campaign not found in this NGO' });

      validatedCampaignId = campaign._id;
      campaignTitle       = campaign.title;

      // Update campaign's raised amount
      await Ngo.findOneAndUpdate(
        { _id: ngoId, 'campaigns._id': campaign._id },
        { $inc: { 'campaigns.$.raised': amount } }
      );
    }

    const donation = await Donation.create({
      userId:        req.user.id,
      ngoId,
      campaignId:    validatedCampaignId,
      campaignTitle, // store title directly since campaigns are embedded
      amount,
      paymentMethod: paymentMethod || 'card',
    });

    res.status(201).json({ message: 'Donation successful!', donation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user.id })
      .populate('ngoId', 'name cause location verified')
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};