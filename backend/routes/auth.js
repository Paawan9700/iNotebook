const express = require("express");
const app = express();


const router = express.Router();

router.get('/', (req, res) => {
    res.send("yo yo honey singh")
})

module.exports = router