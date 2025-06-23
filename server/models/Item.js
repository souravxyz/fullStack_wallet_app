const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["bank", "upi", "crypto"],
    required: true,
  },
  label: { type: String }, // e.g. SBI Account, PhonePe UPI
  details: {
    upiId: { type: String }, // For UPI
    bankName: { type: String }, // For Bank
    accountNumber: { type: String },
    ifsc: { type: String },
    cryptoType: { type: String }, // For Crypto
    address: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", itemSchema);
