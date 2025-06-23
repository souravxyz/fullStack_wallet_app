const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  relation: { type: String, required: true },
  image: { type: String }, // optional URL or base64
  walletItems: [
    {
      type: {
        type: String,
        enum: ['bank', 'upi', 'crypto'],
      },
      label: { type: String },
      details: {
        upiId: { type: String },
        bankName: { type: String },
        accountNumber: { type: String },
        ifsc: { type: String },
        cryptoType: { type: String },
        address: { type: String }
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FamilyMember', familyMemberSchema);
