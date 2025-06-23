const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  logout,
  resetPassword,
  forgetPassword,
  changePassword,
} = require("../controllers/authController");
const protect = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post("/register", upload.single("profilePic"), register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.post("/forgot-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/change-password", protect, changePassword); 

router.get("/logout", logout);

module.exports = router;
