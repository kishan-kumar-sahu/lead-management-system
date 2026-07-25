const Lead = require('../models/Lead');

exports.getLeads = async (_req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads.map((lead) => ({ ...lead.toObject(), id: lead._id.toString() })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createLead = async (req, res) => {
  try {
    const { name, email, budget, message, status } = req.body;
    if (!name || !email || !budget || !message) {
      return res.status(400).json({ message: 'Name, email, budget, and message are required.' });
    }

    const lead = await Lead.create({
      name,
      email,
      budget,
      message,
      status: status || 'New',
    });

    res.status(201).json({ ...lead.toObject(), id: lead._id.toString() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLeadStatus = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json({ ...lead.toObject(), id: lead._id.toString() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
