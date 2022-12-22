import "./App.css"
import { useState } from "react"
import Navbar from "./Components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import About from "./Components/About"
import Home from "./Components/Home"
import NoteState from "./Context/Notes/NoteState"
import Alert from "./Components/Alert.js"
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import Profile from "./Components/Profile"

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message
    })

    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }

  return (
    <NoteState>
      <Router>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/profile" element={<Profile showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  )
}

export default App
