// middleware/auth.js

const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  try {
    // 1. GET TOKEN FROM REQUEST
    // Check if token exists in:
    // - Authorization header: "Bearer token123"
    // - Cookie: "token=token123"

    let token;

    // Option A: From Authorization header
    if (req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts[0] === "Bearer" && parts[1]) {
        token = parts[1];
      }
    }

    // Option B: From cookies (if using HTTP-only cookies)
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 2. CHECK IF TOKEN EXISTS
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Authorization required.",
      });
    }

    // 3. VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. ATTACH USER TO REQUEST
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    // 5. CALL NEXT MIDDLEWARE/CONTROLLER
    next();
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};