import noteContext from "./noteContext"
import { useState } from "react"

const NoteState = props => {
  const host = "http://localhost:5000"
  const NoteState = []
  const userState = []

  const [notes, setNotes] = useState(NoteState)
  const [user, setUser] = useState(userState)

  //Fetch all notes
  const fetchNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })
    const json = await response.json()
    setNotes(json)
    //console.log(json)
    return json
  }

  //Add notes
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/createnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    })
    const json = await response.json()
    console.log(json)

    fetchNote()

    // const Note = {
    //   _id: "63985d15d6f0a5bf932010c6",
    //   user: "637cf041ef6c884dc3ce767b",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2022-12-13T11:07:37.726Z",
    //   __v: 0
    // }
    // setNotes(notes.concat(Note))
  }

  //Delete note
  const deleteNote = async id => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })
    const json = await response.json()
    console.log(json)

    fetchNote()

    // console.log("Deleting note with id " + id)
    // const newNote = notes.filter(note => {
    //   return note._id !== id
    // })
    // setNotes(newNote)
  }

  //Update note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    })
    const json = await response.json()
    console.log(json)

    fetchNote()

    // console.log("Deleting note with id " + id)
    // const newNote = notes.filter(note => {
    //   return note._id !== id
    // })
    // setNotes(newNote)
  }

  //Fetch user details
  const fetchUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })
    const json = await response.json()
    console.log(json.user)
    setUser(json.user)
    //setUser(json)
    // console.log("Deleting note with id " + id)
    // const newNote = notes.filter(note => {
    //   return note._id !== id
    // })
    // setNotes(newNote)
  }

  return <noteContext.Provider value={{ notes, addNote, deleteNote, fetchNote, editNote, fetchUser, user }}>{props.children}</noteContext.Provider>
}

export default NoteState
