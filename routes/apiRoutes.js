const router = require("express").Router();
const store = require("../db/store");

// GET "/api/notes" responds with all notes from the database
router.get("/notes", (req, res) => {
  store
    .readNotesFromFile()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

// POST "/api/notes" adds a new note to the database
router.post("/notes", (req, res) => {
  store
    .readNotesFromFile()
    .then((notes) => {
      const newNote = req.body;
      newNote.id = uuidv4(); // Generate unique ID using uuidv4
      notes.push(newNote);
      store
        .writeNotesToFile(notes)
        .then(() => res.json(newNote))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

// DELETE "/api/notes/:id" deletes the note with the specified id
router.delete("/notes/:id", (req, res) => {
  store
    .readNotesFromFile()
    .then((notes) => {
      const updatedNotes = notes.filter((note) => note.id !== req.params.id);
      store
        .writeNotesToFile(updatedNotes)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
