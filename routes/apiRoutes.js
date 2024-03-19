const router = require("express").Router();
const { readNotesFromFile, writeNotesToFile } = require("../db/store");
const { v4: uuidv4 } = require("uuid");

// GET /api/notes - Get all notes
router.get("/notes", async (req, res) => {
  try {
    const notes = await readNotesFromFile();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to read notes from the database." });
  }
});

// POST /api/notes - Save a new note
router.post("/notes", async (req, res) => {
  try {
    const newNote = req.body;
    newNote.id = uuidv4(); // Add a unique id to the note
    const notes = await readNotesFromFile();
    notes.push(newNote);
    await writeNotesToFile(notes);
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to save the note." });
  }
});

// DELETE /api/notes/:id - Delete a note by id
router.delete("/notes/:id", async (req, res) => {
  try {
    const notes = await readNotesFromFile();
    const updatedNotes = notes.filter((note) => note.id !== req.params.id);
    await writeNotesToFile(updatedNotes);
    res.json({ message: "Note deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the note." });
  }
});

module.exports = router;
