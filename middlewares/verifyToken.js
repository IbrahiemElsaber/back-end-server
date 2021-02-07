const jwt = require("jsonwebtoken");
const token = require("../controllers/auth")

//middleware
//if user has token
module.exports = (req, res, next) => {
  const token = req.header("auth-token"); //imported from header
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
