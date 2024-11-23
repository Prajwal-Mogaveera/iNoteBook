var jwt = require("jsonwebtoken")

const JWT_SEC = "PajjuIsAGoodBoy"

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token")
  if (!token) {
    res.status(401).send({ error: "Please enter valid id" })
  }

  try {
    const data = jwt.verify(token, JWT_SEC)
    //setting req.user with the user data got from jwt.verify in above line
    req.user = data.user
    console.log(data)
    next()
  } catch (error) {
    res.status(401).send({ error: "Please enter valid id" })
    console.error(error)
  }
}

module.exports = fetchuser
