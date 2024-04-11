const asyncHandler = require("express-async-handler"); // everything wrapped in this handler
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation to catch users

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  if (password.legth < 6) {
    res.status(400);
    throw new Error("Password must be upto 6 characters");
  }

  //check if user email exists
  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(404);
    throw new Error("Email has already been used");
  }
  //creation of user
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    const { _id, name, email, photo, phone } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user Data");
  }
});

module.exports = { registerUser };

/*add email and password
  if (!req.body.email) {
    res.status(400);
    throw new Error("Please add an email 🙂");
    npm i express-async handler
  }
  res.send("Register User");*/
