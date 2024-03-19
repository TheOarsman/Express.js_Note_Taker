// routes/apiRoutes.js
const router = require("express").Router();
const store = require("../db/store");

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
