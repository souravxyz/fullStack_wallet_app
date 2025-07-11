const Note = require("../models/Note");

// Create note

// Create note
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      image: imagePath,
    });

    const fullImageURL = imagePath
      ? `${req.protocol}://${req.get("host")}${imagePath}`
      : null;

    res.status(201).json({
      ...note.toObject(),
      image: fullImageURL,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    const updatedNotes = notes.map((note) => {
      const noteObj = note.toObject();
      noteObj.image = noteObj.image
        ? `${req.protocol}://${req.get("host")}${noteObj.image}`
        : null;
      return noteObj;
    });

    res.json(updatedNotes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
