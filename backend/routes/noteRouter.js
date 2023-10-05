const router = require("express").Router();

const { getNotes, addNote, updateNote, deleteNote } = require("../controllers/noteCtrl");

const auth = require("../middleware/auth");

router.route("/")
    .get(auth, getNotes)
    .put(auth, addNote);


router.route("/:id")
    .get(auth, getNote)
    .put(auth, updateNote)
    .delete(auth, deleteNote);

module.exports = router;