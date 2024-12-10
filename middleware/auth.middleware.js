const jwt = require("jsonwebtoken")
const config = require("../auth.config.js")


verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]

  if (!token) {
    return res.status(403).send({ message: "Token is required" })
  }

  jwt.verify(token,
    config.secret,
    (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token has expired' });
        }
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    })
}
