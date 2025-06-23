const FamilyMember = require('../models/FamilyMember');

// Add family member
exports.addMember = async (req, res) => {
  try {
    const { name, relation, image } = req.body;

    const member = await FamilyMember.create({
      user: req.user._id,
      name,
      relation,
      image
    });

    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all family members
exports.getMembers = async (req, res) => {
  try {
    const members = await FamilyMember.find({ user: req.user._id });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add wallet item to a member
exports.addMemberWalletItem = async (req, res) => {
  try {
    const { id } = req.params; // member ID
    const { type, label, details } = req.body;

    const member = await FamilyMember.findOne({ _id: id, user: req.user._id });
    if (!member) return res.status(404).json({ message: 'Family member not found' });

    member.walletItems.push({ type, label, details });
    await member.save();

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete family member
exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await FamilyMember.findOneAndDelete({ _id: id, user: req.user._id });

    if (!member) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    res.json({ message: 'Family member deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
