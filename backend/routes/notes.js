const express = require("express")
const fetchuser = require("../middleware/fetchuser")
const Notes = require("../Models/Notes")
const { body, validationResult } = require("express-validator")
const { findOne, findByIdAndUpdate } = require("../Models/Notes")

const router = express.Router()

//Adding new note
router.post("/createnote", fetchuser, [body("title", "Title should be atleast 3 characters").isLength({ min: 3 }), body("description", "description should be atleast 5 characters").isLength({ min: 5 })], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { title, description, tag } = req.body
    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id
    })
    await note.save()
    res.json(note)
  } catch (e) {
    res.status(500).send("Some error occured")
    console.error(e)
  }
})

//Fetching all notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
  } catch (e) {
    res.status(500).send("Some error occured")
    console.error(e)
  }
})

//Updating existing note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body

    //creating a temperory object to update the note with values
    const newNote = {}

    if (title) {
      newNote.title = title
    }
    if (description) {
      newNote.description = description
    }
    if (tag) {
      newNote.tag = tag
    }
    //Checking whether note of given id is present or not
    let note = await Notes.findById(req.params.id)
    if (!note) {
      return res.status(404).send("Note not found")
    }

    //If note is present, then verify whether user is authorized by comparing his user id with user id in found note
    if (req.user.id !== note.user.toString()) {
      return res.status(401).send("Access denied")
    }

    //Update the note
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json(note)
  } catch (e) {
    res.status(500).send("Some error occured")
    console.error(e)
  }
})

//Deleting the note

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id)
    if (!note) {
      return res.status(404).send("Note not found")
    }

    if (req.user.id !== note.user.toString()) {
      return res.status(401).send("Access denied")
    }

    note = await Notes.findByIdAndDelete(req.params.id)

    res.json({ Successful: "Note has been deleted successfully", note: note })
  } catch (e) {
    res.status(500).send("Some error occured")
    console.error(e)
  }
})

module.exports = router
