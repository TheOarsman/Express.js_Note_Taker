// routes/apiRoutes.js
const express = require("express");
const store = require("../db/store");

const router = express.Router();

let currentId = 1; // Initial ID value

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
    newNote.id = currentId++; // Assign current ID and then increment
    const notes = await store.readNotesFromFile();
    notes.push(newNote);
    await store.writeNotesToFile(notes);
    res.json(newNote);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
