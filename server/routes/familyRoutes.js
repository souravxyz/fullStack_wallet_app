const express = require("express");
const router = express.Router();
const {
  addMember,
  getMembers,
  addMemberWalletItem,
  deleteMember,
} = require("../controllers/familyController");
const protect = require("../middlewares/auth");

router.post("/", protect, addMember); // Add new family member
router.get("/", protect, getMembers); // Get all members
router.post("/:id/wallet", protect, addMemberWalletItem); // Add wallet to member
router.delete("/:id", protect, deleteMember);

module.exports = router;
