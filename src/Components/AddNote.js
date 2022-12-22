import React, { useRef, useContext } from "react"
import noteContext from "../Context/Notes/noteContext"

function AddNote(props) {
  const context = useContext(noteContext)

  const title = useRef(null)
  const description = useRef(null)
  const tag = useRef(null)

  const addNote = e => {
    e.preventDefault(title, description, tag) //to prevent re rendering after execution of this function
    const e1 = document.getElementById("title")
    const e2 = document.getElementById("description")
    const e3 = document.getElementById("tag")

    context.addNote(e1.value, e2.value, e3.value)
    e1.value = ""
    e2.value = ""
    e3.value = ""
    props.showAlert("success", "Added note successfully")
  }

  return (
    <div>
      <h4>Add Note</h4>
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" ref={title} className="form-control" id="title" aria-describedby="emailHelp" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input type="text" ref={description} className="form-control" id="description" minLength={5} required />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input type="text" ref={tag} className="form-control" id="tag" />
        </div>

        <button type="submit" className="btn btn-primary" onClick={addNote}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddNote
