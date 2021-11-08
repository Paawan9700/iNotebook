//jshint esversion:6

const express = require("express");
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const fetchuser = require('../middleware/fetchuser');
const saltRounds = 10;

const JWT_SECRET = "Paawanisagoodb$oy";

// Route 1 -> Create a user using POST  : /api/auth/createuser, doesn't require auth ---> no login required (basiclly register )

router.post(
  "/createuser",
  [
    body("email", "enter a valid email").isEmail(),
    body("name", "enter a valid name, min required length is 3").isLength({
      min: 3,
    }),
    body("password", "password must be of atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are errors then return the BAD request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // cheching whether the user eith this email already exits (for validation)
    try {
      User.findOne({ email: req.body.email }, (err, founduser) => {
        if (err) {
          console.log(err);
        } else {
          if (founduser) {
            return res
              .status(400)
              .json({ error: "sooory, a user with this email already exists" });
          }
        }
      });

      // creating a new user...
      const salt = await bcrypt.genSalt(saltRounds);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      const newuser = User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });

      const data = {
        user : {
          id : newuser.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
 
      // res.json(newuser);
      // console.log(authToken);

      res.json({authToken})

    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);


// Route 2 ->  verifying a user through login (basically login route)
router.post('/login',   [
  body("email", "enter a valid email").isEmail(),
  body("password", "password cannot be blank").exists()
], async (req, res) => {

    // if there are errors then return the BAD request and the errors
    // generall errors would not be there assuming user is not mad
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
      let user = await User.findOne({email});

      if(!user){
        return res.status(400).json({error : "please login with correct credentials"});
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if(!passwordCompare){
        return res.status(400).json({error : "please login with correct credentials"});
      }

      const data = {
        user : {
          id : user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({authToken})

    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }

})

// Route 3 -> fething user information -> login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
      res.status(500).send("internal server error");
  }
})

module.exports = router;
