const express = require("express");
const User = require("../models/User.js");
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Create a user using POST  : /api/auth, doesn't require auth

router.post('/', [
    body('email', "enter a valid email").isEmail(),
    body('name', "enter a valid name, min required length is 3").isLength({ min: 3 }),
    body('password', "password must be of atleast 5 characters").isLength({ min: 5 }),
    
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        password: req.body.password,
        email : req.body.email
      }).then(user => res.json(user))
      .catch(err => {console.log(err)
      res.json({err : "please enter a valid or unique value of email"})});
})

module.exports = router