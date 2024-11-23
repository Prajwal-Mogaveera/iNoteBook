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
    // console.log(json)

    fetchNote()
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
    // console.log(json)

    fetchNote()
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
    // console.log(json)

    fetchNote()
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
    // console.log(json.user)
    setUser(json.user)
  }

  return <noteContext.Provider value={{ notes, addNote, deleteNote, fetchNote, editNote, fetchUser, user }}>{props.children}</noteContext.Provider>
}

export default NoteState
