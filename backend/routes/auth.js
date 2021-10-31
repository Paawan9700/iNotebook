//jshint esversion:6

const express = require("express");
const User = require("../models/User.js");
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Create a user using POST  : /api/auth/createuser, doesn't require auth ---> no login required (basiclly register )

router.post('/createuser', [
    body('email', "enter a valid email").isEmail(),
    body('name', "enter a valid name, min required length is 3").isLength({ min: 3 }),
    body('password', "password must be of atleast 5 characters").isLength({ min: 5 }),
    
], async (req, res) => {
  
  // if there are errors then return the BAD request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // cheching whether the user eith this email already exits (for validation)
    try{
     User.findOne({email : req.body.email}, (err, founduser) => {
      if(err) {
        console.log(err);
      } else {
        if(founduser){
            return res.status(400).json({error : "sooory, a user with this email already exists"});
        }
      }
    })

    // creating a new user...
    const newuser = await User.create({
        name: req.body.name,
        password: req.body.password,
        email : req.body.email
      })

      res.send(newuser);
    } catch(error) {
      console.error(error.message);
      res.status(500).send("some error occured")
    }
      
})

module.exports = router