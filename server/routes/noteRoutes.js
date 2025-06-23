const express = require("express");
const router = express.Router();
const {
  createNote,
  getNotes,
  deleteNote,
} = require("../controllers/noteController");
const protect = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post("/", protect, upload.single("image"), createNote);
router.get("/", protect, getNotes);
router.delete("/:id", protect, deleteNote);

module.exports = router;
