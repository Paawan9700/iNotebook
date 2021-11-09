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
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;

    // creating a new note object
    const newNote = {};
    if(title) {
        newNote.title = title;
    }
    if(description) {
        newNote.description = description;
    }
    if(tag) {
        newNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found!!");
    }

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed!!");
    }

    // find the note to be updated and update it
     note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true});
     res.json(note);
});


// Router 4 -> deleting  the notes from the database of the user who is logged in -> delete request -> api/notes/deletenote : login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
   
    // cheking if note is available or not
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found!!");
    }

    // allow user only if it oens the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed!!");
    }

    // find the note to be deleted and delete it
     note = await Notes.findByIdAndDelete(req.params.id);
     res.json({"Success" : "this note has been deleted", "note" : note});
});

module.exports = router;
