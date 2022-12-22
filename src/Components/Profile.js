import React from "react"
import { useContext, useEffect } from "react"
import noteContext from "../Context/Notes/noteContext"

function Profile() {
  const context = useContext(noteContext)
  const { fetchUser } = context
  const { user } = context

  useEffect(() => {
    localStorage.getItem("token") && fetchUser()

    // eslint-disable-next-line
  }, [])
  return (
    <div className="d-flex justify-content-center">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Hi {user.name}</h5>
          <p className="card-text">{user.email} is your mail id </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
