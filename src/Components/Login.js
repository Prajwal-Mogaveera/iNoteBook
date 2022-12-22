import React, { useRef, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Login(props) {
  const email = useRef(null)
  const password = useRef(null)
  const [type, setType] = useState("password")
  const [eye, setEye] = useState("eye")
  const [show, setShow] = useState("Show")

  const navigate = useNavigate()

  const login = async e => {
    e.preventDefault()
    const e1 = document.getElementById("email")
    const e2 = document.getElementById("password")

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: e1.value, password: e2.value })
    })
    const json = await response.json()
    console.log(json)
    if (json.success) {
      console.log("logged in successfully")
      localStorage.setItem("token", json.authToken)
      props.showAlert("success", "Succesfully logged in")

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
    <div className="container ">
      <div className="container text-center">
        <h2>Login</h2>
      </div>
      <form onSubmit={login}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input type="email" ref={email} className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <div className="d-flex align-items-center">
              <i className={`fa-solid fa-${eye} mx-2`} onClick={handlePass}></i>
              <p style={{ marginBottom: "0px" }}>{show}</p>
            </div>
          </div>

          <input type={type} ref={password} className="form-control" id="password" />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p className="my-2">
        <Link to="/SignUp">New user? SignUp</Link>
      </p>
    </div>
  )
}

export default Login
