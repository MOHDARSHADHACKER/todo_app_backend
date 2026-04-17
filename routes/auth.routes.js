const express = require("express");
const router = express.Router();

const db = require("../models");
const User = db.user;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

router.post("/register", async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  await user.save();

  res.send({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(404).send({ message: "User not found" });

  const passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid)
    return res.status(401).send({ message: "Invalid Password" });

  const token = jwt.sign({ id: user._id }, SECRET, {
    expiresIn: 86400,
  });

  res.send({
    id: user._id,
    email: user.email,
    token: token,
  });
});

module.exports = router;