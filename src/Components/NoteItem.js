import React, { useContext } from "react"
import noteContext from "../Context/Notes/noteContext"

function NoteItem(props) {
  const context = useContext(noteContext)
  const { title, description, _id } = props.note
  return (
    <div className="col-md-3 my-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-start align-items-center ">
            <h5 className="card-title">{title}</h5>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                props.updateNote(props.note)
              }}
            ></i>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                context.deleteNote(_id)
                props.showAlert("success", "Deleted note suucesfully")
              }}
            ></i>
          </div>
          <p className="card-text">{description} </p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
