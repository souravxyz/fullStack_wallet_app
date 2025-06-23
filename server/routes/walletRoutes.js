const express = require("express");
const router = express.Router();
const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/walletController");
const protect = require("../middlewares/auth");


router.post("/", protect, createItem);
router.get("/", protect, getItems);
router.delete("/:id", protect, deleteItem);

module.exports = router;
