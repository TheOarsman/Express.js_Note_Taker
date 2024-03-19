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
  // Read existing notes from the database
  fs.readFile(
    path.join(__dirname, "..", "db", "db.json"),
    "utf8",
    (err, data) => {
      if (err) throw err;

      // Parse existing notes
      const notes = JSON.parse(data);

      // Create a new note object from the request body
      const newNote = req.body;

      // Generate a unique ID for the new note (assuming notes already have unique IDs)
      const newNoteId = Math.max(...notes.map((note) => note.id), 0) + 1;
      newNote.id = newNoteId;

      // Add the new note to the array of notes
      notes.push(newNote);

      // Write the updated notes array back to the database file
      fs.writeFile(
        path.join(__dirname, "..", "db", "db.json"),
        JSON.stringify(notes),
        (err) => {
          if (err) throw err;
          // Respond with the newly created note
          res.json(newNote);
        }
      );
    }
  );
});

// Route to delete a note from db.json
router.delete("/notes/:id", (req, res) => {
  // Implementation remains the same as before
});

module.exports = router;
