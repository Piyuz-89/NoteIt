const router = require("express").Router();

const { getAllNotes, addNote, getNote, updateNote, deleteNote } = require("../controllers/noteCtrl");

const auth = require("../middleware/auth");

router.route("/")
    .get(auth, getAllNotes)
    .post(auth, addNote);


router.route("/:id")
    .get(auth, getNote)
    .put(auth, updateNote)
    .delete(auth, deleteNote);

module.exports = router;