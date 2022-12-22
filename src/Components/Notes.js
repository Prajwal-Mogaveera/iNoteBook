import React, { useState, useContext, useRef } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import noteContext from "../Context/Notes/noteContext"
import NoteItem from "./NoteItem"

function Notes(props) {
  const context = useContext(noteContext)
  const { fetchNote } = context
  const { notes } = context
  const { editNote } = context

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const ref = useRef(null)
  const closeRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    } else {
      fetchNote()
    }
    // eslint-disable-next-line
  }, [])

  //handlechange function to edit input
  const handleChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  //update note method to update

  const updateNote = note => {
    console.log(note)
    ref.current.click()
    setNote({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag })
  }

  const saveChanges = e => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    closeRef.current.click()
    props.showAlert("success", "Updated note successfully")
  }

  return (
    <>
      <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ visibility: "hidden" }}>
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 my-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="etitle" value={note.etitle} onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input type="text" className="form-control" id="description" name="edescription" value={note.edescription} onChange={handleChange} minLength={5} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input type="text" className="form-control" id="tag" name="etag" value={note.etag} onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={saveChanges} type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="contaier">{notes.length === 0 && "No notes to display"}</div>
        {notes.map((note, index) => {
          return <NoteItem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert} />
        })}
      </div>
    </>
  )
}

export default Notes
