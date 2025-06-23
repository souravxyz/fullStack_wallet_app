const fs = require("fs");
const path = require("path");

const deleteImage = (filename) => {
  const filePath = path.join(__dirname, "..", "uploads", filename);
  fs.unlink(filePath, (err) => {
    if (err) console.error("Image deletion failed:", err.message);
  });
};

module.exports = deleteImage;
