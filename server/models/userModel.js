const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
    },

    email: {
      required: [true, "Please add name"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Please add a Password"],
      minLength: [6, "password must be up to 6 characters"],
      maxLength: [23, "password must not be more than 23 characters"],
    },

    photo: {
      type: String,
      require: [true, "please add a photo"],
      default:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
    },

    phone: {
      type: String,
      default: "+254",
    },
    //might add the bio for profiles but for social apps
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
