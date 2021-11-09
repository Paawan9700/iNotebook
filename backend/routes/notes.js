const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes.js");
const { body, validationResult } = require("express-validator");

// Router 1 -> fethching all the notes from the database of the user who us logged in -> GET request -> api/notes/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

// Route 2 -> composing the notes (basically adding a new note)-> POST request -> api/auth/compose
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title, min required length is 3").isLength({
      min: 3,
    }),
    body("description", "description must be of atleast 5 characters").isLength(
      {
        min: 5,
      }
    ),
  ],
  async (req, res) => {
    // if there are errors then return the BAD request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructuring from the req.body
    try {
      const { description, tag, date } = req.body;
      const note = new Notes({
        user: req.user.id,
        title: req.body.title,
        description,
        tag,
        date,
      });

      const savednote = await note.save();
      res.send(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

// Router 3 -> updating the notes from the database of the user who is logged in -> PUT request -> api/notes/updatenote : login required
// router.put("/updatenote/:id", fetchuser, async (req, res) => {
//     const {title, description, tag} = req.body;


// });

module.exports = router;
