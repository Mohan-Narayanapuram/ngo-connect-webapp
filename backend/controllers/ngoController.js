const Ngo = require('../models/Ngo');

exports.getAllNgos = async (req, res) => {
  try {
    const ngos = await Ngo.find();
    res.json(ngos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNgoById = async (req, res) => {
  try {
    const ngo = await Ngo.findById(req.params.id);
    if (!ngo) return res.status(404).json({ message: 'NGO not found' });
    res.json(ngo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
