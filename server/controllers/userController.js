const asyncHandler = require("express-async-handler"); // everything wrapped in this handler
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process, env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation to catch users

  if (!name || !email || !password) {
    res.status(400); // my custom error handler
    throw new Error("Please fill in all required fields");
  }

  if (password.legth < 6) {
    res.status(400);
    throw new Error("Password must be upto 6 characters");
  }

  //check if user email exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("Email has already been used");
    error.statusCode = 404;
    throw error;
  }

  //creation of user
  const user = await User.create({
    name,
    email,
    password,
  });
  // generate the token
  const token = generateToken(user._id);

  //send the cookie to frontend
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, phone } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user Data");
  }
});

//log in user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //validation of request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  //check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  //user exists now chesck pwd
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // generate the token
  const token = generateToken(user._id);

  //send the cookie to frontend
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

  if (user && passwordIsCorrect) {
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//logging out the user
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Succesfully Logged Out" });
});

//get user data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { _id, name, email, photo, phone } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      token,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//get login status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  //verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

//update the user details, like name, number, photo (bio)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, photo, phone } = user;
    user.email = email;
    user.name = rew.body.name || name; //if no name is set up then keep the present one
    user.phone = rew.body.phone || phone;
    user.photo = rew.body.photo || photo;
    // user.bio=rew.body.bio || bio;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { oldPassword, password } = req.body;
  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }
  //vallidate
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add an old password");
  }

  //check if oldpassword is correct
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  //save new pwd
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password change successful");
  } else {
    res.status(400);
    throw new Error("Old password is Incorrect");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  res.send("Forgot Password");
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
};
