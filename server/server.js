// const dotenv = require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const userRoute = require("./routes/userRoute");
// const errorHandler = require("./middleWare/errorMiddleware");
// const cookierParser = require("cookie-parser");

// const app = express();
// //my middlewares
// app.use(express.json());
// app.use(cookierParser());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

// //middleware for routes
// app.use("/api/users", userRoute);

// //my routes
// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

// //error handler should be before firing the server
// app.use(errorHandler);

// const PORT = process.env.PORT || 5001;

// //connect to database first then to port
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server Running on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.log(err));

const mysql = require("mysql");
const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookierParser = require("cookie-parser");

const app = express();
// //my middlewares
app.use(express.json());
app.use(cookierParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1); // Exit the process on connection error
  }

  console.log("Connected to MySQL database!");

  // ... Your application logic using the connection ...

  // Release the connection back to the pool when finished
  connection.release();
});
app.use("/api/users", userRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

// Start the Express server only after successful connection
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
