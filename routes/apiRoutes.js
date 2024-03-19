// routes/apiRoutes.js
const express = require("express");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4 from uuid package
const store = require("../db/store");

const router = express.Router();

// GET /api/notes - Get all notes
router.get("/notes", async (req, res) => {
  try {
    const notes = await store.readNotesFromFile();
    res.json(notes);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// POST /api/notes - Create a new note
router.post("/notes", async (req, res) => {
  try {
    const newNote = req.body;
    newNote.id = uuidv4(); // Generate unique ID using uuidv4
    const notes = await store.readNotesFromFile();
    notes.push(newNote);
    await store.writeNotesToFile(notes);
    res.json(newNote);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
