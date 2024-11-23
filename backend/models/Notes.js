const mongoose = require("mongoose")
const { Schema } = mongoose

const noteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  tag: {
    type: String,
    default: "general"
  },
  date: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model("notes", noteSchema)
