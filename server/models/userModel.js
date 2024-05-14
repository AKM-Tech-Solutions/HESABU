// const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator"); // checks for email uniqueness
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     message: "Please add your name", // Custom error messsage instead of putting in array in required
//   },
//   email: {
//     type: String,
//     required: true,
//     max: 50,
//     unique: false,
//   },

//   password: {
//     type: String,
//     required: true,
//     minlength: 6,
//     //maxlength: 23, // to prevent the hashedpassword being taken as the actual password
//     message: "Password must be between 6 and 23 characters",
//   },

//   photo: {
//     type: String,
//     required: true,
//     default:
//       "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
//   },

//   phone: {
//     type: String,
//     default: "+254",
//   },

//   // Might add the bio for profiles but for social apps
// });

// userSchema.set("timestamps", true); //time stamps for the dtb

// userSchema.plugin(uniqueValidator); //add the plugin

// //encrypt password before saving to dtb
// userSchema.pre("save", async function (next) {
//   //check modification of areas
//   if (!this.isModified("password")) {
//     return next();
//   }

//   //hashed password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(this.password, salt);
//   this.password = hashedPassword;
//   next();
// });

// const User = mongoose.model("User", userSchema);
// module.exports = User;
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// Example of a function to create a new user
async function User(name, email, password) {
  try {
    const [results, fields] = await pool
      .promise()
      .query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
        name,
        email,
        password,
      ]);
    return results.insertId; // Return the ID of the newly created user
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

module.exports = { User };

// photo: {
//   type: String,
//   default:
//     "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
// },
// phone: {
//   type: String,
//   default: "+254",
// },

// Function to create the user table (if it doesn't exist)
// async function createTable() {
//   const connection = await pool.getConnection();
//   await connection.execute(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       ${Object.entries(userSchema).map(
//         ([key, value]) =>
//           `${key} ${value.type} ${value.required ? "NOT NULL" : ""}`
//       )}
//     )
//   `);
//   connection.release();
// }

// // Function to register a new user
// async function registerUser(user) {
//   const connection = await pool.getConnection();
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   await connection.execute(
//     `
//     INSERT INTO users (name, email, password, photo, phone)
//     VALUES (?, ?, ?, ?, ?)
//   `,
//     [user.name, user.email, hashedPassword, user.photo, user.phone]
//   );
//   connection.release();
// }

// // Function to find a user by email
// async function findUserByEmail(email) {
//   const connection = await pool.getConnection();
//   const [results] = await connection.execute(
//     `
//     SELECT * FROM users WHERE email = ?
//   `,
//     [email]
//   );
//   connection.release();
//   return results[0]; // Assuming only one user with that email
// }

// Usage example
// createUserTable() // Call this to create the table initially
//   .then(() => {
//     registerUser({
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       password: 'securepassword'
//     })
//       .then(() => console.log('User registered successfully'))
//       .catch(err => console.error(err));
//   })
//   .catch(err => console.error(err));

// // Find user by email example
// findUserByEmail('john.doe@example.com')
//   .then(user => console.log(user))
//   .catch(err => console.error(err));

// //encrypt password before saving to dtb
