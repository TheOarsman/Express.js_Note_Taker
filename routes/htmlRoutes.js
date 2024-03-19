// routes/htmlRoutes.js
const path = require("path");
const router = express.Router();

// GET /notes - Return the notes page
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// GET * - Return the homepage
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
