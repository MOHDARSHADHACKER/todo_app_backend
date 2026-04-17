const jwt = require("jsonwebtoken");
const SECRET = "mysecretkey";

module.exports = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) return res.status(403).send("No token provided");

  token = token.split(" ")[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized");

    req.userId = decoded.id;
    next();
  });
};