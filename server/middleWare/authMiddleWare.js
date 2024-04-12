const asyncHandler = require("express-async-handler"); // everything wrapped in this handler
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    //verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //get userID from the token
    const user = await User.findById(verified.id).select("-password"); //send everything back to us from the dtb except the pwd

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new Error("Not authorized, please login");
  }
});

module.exports = protect;
