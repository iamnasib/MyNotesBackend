const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Create a Note linked to a authenticated user using POST, /api/notes/create
router.post(
  "/create",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({
      min: 3,
    }),
    body("description", "Enter a valid Description").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      //If validation errors are found, return Bad request and the errors
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, type } = req.body; //Destructuring the request body
      //Create a new Note
      const note = new Note({
        title,
        description,
        type,
        user: req.user.userId,
      });
      const CreatedNote = await note.save();
      res.json({ CreatedNote });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Get user Notes using Get, /api/notes/getnotes
router.get("/getnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.userId });
    res.json({ notes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Update a Note linked to a authenticated user using PATCH, /api/notes/update/:id
router.patch(
  "/update/:id",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({
      min: 3,
    }),
    body("description", "Enter a valid Description").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      //If validation errors are found, return Bad request and the errors
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //Find the note to be updated and check if the user owns the note
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      if (note.user.toString() !== req.user.userId) {
        return res.status(401).send("Unauthorized");
      }

      const { title, description, type } = req.body; //Destructuring the request body
      //Create a Object to update
      const updateNote = {};

      if (title) {
        updateNote.title = title;
      }
      if (description) {
        updateNote.description = description;
      }
      if (type) {
        updateNote.type = type;
      }

      //update the note that was found by id above
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: updateNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Delete a Note linked to a authenticated user using DELETE, /api/notes/delete/:id
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to delete and check if the user owns the note
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.userId) {
      //tosString is used to convert the object id to string
      return res.status(401).send("Unauthorized");
    }

    //Delete the note that was found by id above
    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
