import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

function SignUp(props) {
  const uname = useRef(null)
  const email = useRef(null)
  const password = useRef(null)

  const [type, setType] = useState("password")
  const [eye, setEye] = useState("eye")
  const [show, setShow] = useState("Show")

  const navigate = useNavigate()

  const signup = async e => {
    e.preventDefault()
    const e1 = document.getElementById("username")
    const e2 = document.getElementById("email")
    const e3 = document.getElementById("password")

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: e1.value, email: e2.value, password: e3.value })
    })
    const json = await response.json()
    console.log(json)
    if (json.success) {
      console.log("Signed up successfully")
      localStorage.setItem("token", json.authToken)
      props.showAlert("success", "Succesfully Registered")

      navigate("/")
    } else {
      props.showAlert("danger", json.error)
    }
  }

  //function to hide and show password
  const handlePass = () => {
    eye === "eye" ? setEye("eye-slash") : setEye("eye")
    type === "password" ? setType("text") : setType("password")
    show === "Show" ? setShow("Hide") : setShow("Show")
  }

  return (
    <div className="container">
      <div className="container text-center">
        <h2>Sign Up</h2>
      </div>
      <form onSubmit={signup}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input type="text" ref={uname} className="form-control" id="username" aria-describedby="emailHelp" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" ref={email} className="form-control" id="email" aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="d-flex align-items-center">
              <i className={`fa-solid fa-${eye} mx-2`} onClick={handlePass}></i>
              <p style={{ marginBottom: "0px" }}>{show}</p>
            </div>
          </div>
          <input type={type} ref={password} className="form-control" id="password" minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  )
}

export default SignUp
