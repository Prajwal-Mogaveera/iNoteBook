const express = require("express")
const router = express.Router()
const User = require("../models/User")
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")

const { body, validationResult } = require("express-validator")
const fetchuser = require("../middleware/fetchuser")
const JWT_SEC = "PajjuIsAGoodBoy"
let success = false

//Route 1: creating user
router.post("/createuser", [body("email", "Enter a valid Email").isEmail(), body("name", "Name should be atleast 5 characters").isLength({ min: 5 }), body("password", "Password should be atleast 5 characters").isLength({ min: 5 })], async (req, res) => {
  const errors = validationResult(req)
  //if any error occures then send it
  if (!errors.isEmpty()) {
    success = false
    console.log(errors)
    return res.status(400).json({ success, errors: errors.array() })
  }

  try {
    //check user with this email already exists
    let user = await User.findOne({ email: req.body.email })

    if (user) {
      success = false
      return res.status(400).json({ success, error: "User with this email already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = bcrypt.hashSync(req.body.password, salt)

    //creating user
    // const user = User(req.body)
    // user.save()
    //or
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })

    const data = {
      user: {
        id: user.id
      }
    }
    var authToken = jwt.sign(data, JWT_SEC)
    success = true
    res.json({ success, authToken })
    // res.json(user)
    // console.log(req.body)
  } catch (e) {
    res.status(500).send("Some error occured")
    console.error(e)
  }
})

//Router 2: Login user
router.post("/login", [body("email", "Enter a valid Email").isEmail(), body("password", "Password should be atleast 5 characters").isLength({ min: 1 })], async (req, res) => {
  const errors = validationResult(req)
  //if any error occures then send it
  if (!errors.isEmpty()) {
    success = false
    return res.status(400).json({ success, errors: errors.array() })
  }

  try {
    const { email, password } = req.body
    let user = await User.findOne({ email })
    if (!user) {
      success = false
      return res.status(400).json({ success, error: "Please enter valid email" })
    }
    let compPas = await bcrypt.compare(password, user.password)
    if (!compPas) {
      success = false
      return res.status(400).json({ success, error: "Please enter valid credentials" })
    }

    const data = {
      user: {
        id: user.id
      }
    }
    var authToken = jwt.sign(data, JWT_SEC)
    success = true
    res.json({ success, authToken })

    //console.log(user)
  } catch (e) {
    res.status(500).send("Some error occured")
    console.error(e)
  }
})

//Router 3: getuser to fetch details of the logged in user
router.post("/getuser", fetchuser, async (req, res) => {
  const userid = req.user.id
  try {
    const user = await User.findById(userid).select("-password")
    res.json({ user })
  } catch (e) {
    res.status(500).send("Some error occured")
    console.error(e)
  }
})

module.exports = router
