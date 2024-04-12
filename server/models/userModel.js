const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); // checks for email uniqueness
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    message: "Please add your name", // Custom error messsage instead of putting in array in required
  },

  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    trim: true,
    match: [
      /^(([^<>()\[\]\\., ; : \s@"]+(\. [^<>()\[\]\\., ; :\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\. [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\−0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is not a valid email address",
    ],
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    //maxlength: 23, // to prevent the hashedpassword being taken as the actual password
    message: "Password must be between 6 and 23 characters",
  },

  photo: {
    type: String,
    required: true,
    default:
      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
  },

  phone: {
    type: String,
    default: "+254",
  },

  // Might add the bio for profiles but for social apps
});

userSchema.set("timestamps", true); //time stamps for the dtb

userSchema.plugin(uniqueValidator); //add the plugin

//encrypt password before saving to dtb
userSchema.pre("save", async function (next) {
  //check modification of areas
  if (!this.isModified("password")) {
    return next();
  }

  //hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
