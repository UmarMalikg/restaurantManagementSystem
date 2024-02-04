// authMiddleware.js

const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.json({ valid: false, message: "No tokens available" });
  }

  if (!accessToken) {
    if (renewToken(req, res)) {
      next();
    }
  } else {
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Access token is expired or invalid
        if (renewToken(req, res)) {
          next();
        }
      } else {
        req.userName = decoded.userName;
        next();
      }
    });
  }
};

const renewToken = (req, res, callback) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return callback(false); // No refresh token
  }

  jwt.verify(refreshToken, process.env.JWT_REF_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ valid: false, message: `Invalid Refresh Token` });
    } else {
      const accessToken = jwt.sign(
        { userName: decoded.userName },
        process.env.JWT_SECRET,
        { expiresIn: "1m" }
      );
      res.cookie(`accessToken`, accessToken, { maxAge: 60000 });
      callback(true); // Token renewed successfully
    }
  });
};

module.exports = { verifyUser, renewToken };
