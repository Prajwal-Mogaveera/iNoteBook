import React from "react"
import AddNote from "./AddNote"
import Notes from "./Notes"

function Home(props) {
  return (
    <div className="my-5  ">
      <AddNote showAlert={props.showAlert} />
      <div>
        <Notes showAlert={props.showAlert} />
      </div>
    </div>
  )
}

export default Home
