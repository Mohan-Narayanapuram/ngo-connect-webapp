const Donation      = require('../models/Donation');
const Ngo           = require('../models/Ngo');
const User          = require('../models/User');
const { sendEmail } = require('../services/email.service');

exports.donate = async (req, res) => {
  try {
    console.log('=== DONATE HIT ===');
    console.log('req.user  :', req.user);
    console.log('req.body  :', req.body);

    const { ngoId, campaignId, amount, paymentMethod } = req.body;

    if (!ngoId || !amount || amount <= 0)
      return res.status(400).json({ message: 'Invalid donation data' });

    const ngo = await Ngo.findById(ngoId);
    if (!ngo) return res.status(404).json({ message: 'NGO not found' });

    console.log('NGO found :', ngo.name, '| email:', ngo.email);

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    console.log('User found:', user.name, '| email:', user.email);

    let validatedCampaignId = null;
    let campaign            = null;

    if (campaignId) {
      campaign = ngo.campaigns?.find(c => c._id.toString() === campaignId);
      if (!campaign)
        return res.status(400).json({ message: 'Campaign not found in this NGO' });

      validatedCampaignId = campaign._id;

      await Ngo.findOneAndUpdate(
        { _id: ngoId, 'campaigns._id': campaign._id },
        { $inc: { 'campaigns.$.raised': amount } }
      );

      const updatedNgo      = await Ngo.findById(ngoId);
      const updatedCampaign = updatedNgo.campaigns.find(c => c._id.toString() === campaignId);
      const pct             = Math.round(((updatedCampaign.raised || 0) / (updatedCampaign.goal || 1)) * 100);

      // Milestone email at 50% and 100%
      if ((pct >= 50 && pct < 55) || pct >= 100) {
        const milestone = pct >= 100 ? 100 : 50;
        if (ngo.email) {
          await sendEmail({
            to:           ngo.email,
            subject:      `Campaign "${updatedCampaign.title}" hit ${milestone}% of its goal`,
            templateName: 'campaignMilestone',
            variables: {
              ngoName:       ngo.name,
              campaignTitle: updatedCampaign.title,
              pct:           milestone,
              raised:        updatedCampaign.raised.toLocaleString('en-IN'),
              goal:          updatedCampaign.goal.toLocaleString('en-IN'),
            },
          });
        } else {
          console.warn('Milestone email skipped — NGO has no email:', ngo.name);
        }
      }
    }

    const donation = await Donation.create({
      userId:        req.user._id,
      ngoId,
      campaignId:    validatedCampaignId,
      campaignTitle: campaign?.title || null,
      amount:        Number(amount),
      paymentMethod: paymentMethod || 'card',
    });

    const formattedAmount = Number(amount).toLocaleString('en-IN');
    const formattedDate   = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Receipt to donor
    console.log('Sending receipt to donor:', user.email);
    await sendEmail({
      to:           user.email,
      subject:      `Donation Receipt — ₹${formattedAmount} to ${ngo.name}`,
      templateName: 'donationReceipt',
      variables: {
        name:          user.name,
        ngoName:       ngo.name,
        campaignTitle: campaign?.title || 'General Donation',
        amount:        formattedAmount,
        refId:         donation._id.toString(),
        date:          formattedDate,
        paymentMethod: paymentMethod || 'Card',
      },
    });

    // Alert to NGO
    if (ngo.email) {
      console.log('Sending alert to NGO:', ngo.email);
      await sendEmail({
        to:           ngo.email,
        subject:      `New donation received — ₹${formattedAmount}`,
        templateName: 'donationNgoAlert',
        variables: {
          ngoName:       ngo.name,
          donorName:     user.name,
          amount:        formattedAmount,
          campaignTitle: campaign?.title || 'General Donation',
          date:          formattedDate,
        },
      });
    } else {
      console.warn('NGO alert skipped — NGO has no email:', ngo.name);
    }

    res.status(201).json({ message: 'Donation successful!', donation });
  } catch (err) {
    console.error('DONATE ERROR:', err);
    res.status(500).json({ message: 'Server error during donation.' });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user._id })
      .populate('ngoId', 'name cause location image')
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    console.error('GET DONATIONS ERROR:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};