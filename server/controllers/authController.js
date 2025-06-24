const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Email templates
const welcomeEmail = require("../utils/templates/welcomeEmail");
const resetPasswordEmail = require("../utils/templates/resetPasswordEmail");
const passwordChangedEmail = require("../utils/templates/passwordChangedEmail");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register User
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, profilePic });

    // Send welcome email
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

    await sendEmail({
      to: user.email,
      subject: "Welcome to Wallet App!",
      html: welcomeEmail(user.name, clientUrl),
    });
    console.log("✅ EMAIL LOGIN URL:", clientUrl);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: profilePic
        ? `${req.protocol}://${req.get("host")}${profilePic}`
        : null,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Logged-in User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        profilePic: user.profilePic
          ? `${req.protocol}://${req.get("host")}${user.profilePic}`
          : null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Forget Password
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hash = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hash;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save({ validateBeforeSave: false });

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Your Wallet App Password",
      html: resetPasswordEmail(user.name, resetUrl),
    });

    res.status(200).json({ message: "Reset link sent" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send reset email", error: err.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  const resetToken = req.params.token;
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Token expired or invalid" });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Send confirmation email
    await sendEmail({
      to: user.email,
      subject: "Your Wallet App Password Was Reset",
      html: passwordChangedEmail(user.name),
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Change Password (for logged-in users)
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    user.password = newPassword;
    await user.save();

    // Optional: Send email confirmation
    await sendEmail({
      to: user.email,
      subject: "Your Wallet App Password Was Changed",
      html: passwordChangedEmail(user.name),
    });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Logout
exports.logout = (req, res) => {
  // This only works if JWT is stored in cookies
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
