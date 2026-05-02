const jwt = require("jsonwebtoken");

// Middleware to extract user id from JWT in cookie and attach to req.user
const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies || {};

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login again" });
  }

  try {
    const decodedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decodedtoken && decodedtoken.id) {
      req.user = { id: decodedtoken.id };
      return next();
    } else {
      return res.status(401).json({ success: false, message: "Not Authorized. Login again" });
    }
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return res.status(401).json({ success: false, error: "Invalid or expired token", details: err.message });
  }
};

module.exports = { isAuthenticated };
