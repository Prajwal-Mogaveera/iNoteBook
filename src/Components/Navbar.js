import React, { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

function Navbar(props) {
  let location = useLocation()
  let navigate = useNavigate()

  useEffect(() => {
    console.log(location.pathname)
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem("token")
    props.showAlert("success", "Logged out suuceesfully")
    navigate("/login")
  }

  const handleProfile = () => {
    navigate("/profile")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
          {!localStorage.getItem("token") ? (
            <div className="d-flex">
              <Link to="/login" className="btn btn-primary mx-1" tabIndex="-1" role="button" aria-disabled="true">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary mx-1" tabIndex="-1" role="button" aria-disabled="true">
                SignUp
              </Link>
            </div>
          ) : (
            <div>
              {location.pathname !== "/profile" && <i className="fa-solid fa-user text-primary mx-4" onClick={handleProfile}></i>}
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
