const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

// Route to get notes from db.json
router.get("/notes", (req, res) => {
  fs.readFile(
    path.join(__dirname, "..", "db", "db.json"),
    "utf8",
    (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      res.json(notes);
    }
  );
});

// Route to add a new note to db.json
router.post("/notes", (req, res) => {
  // Implementation remains the same as before
});

// Route to delete a note from db.json
router.delete("/notes/:id", (req, res) => {
  // Implementation remains the same as before
});

module.exports = router;
