const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const { signup, signin } = require("../controllers/auth");
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
