const jwt = require("jsonwebtoken");
const JWT_SECRET = "Paawanisagoodb$oy";

const fetchuser = (req, res, next) => {
  // get the user from the jwt token and add is to the req object
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "please authenticate using correct token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using correct token" });
  }
};

module.exports = fetchuser;
