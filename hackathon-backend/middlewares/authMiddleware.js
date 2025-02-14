const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({error: "No token, authorization denied"});
  }
  try {
    const decoded = jwt.verify(token, "secret");
    console.log("........>", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({error: "Token is not valid"});
  }
};

module.exports = authMiddleware;
