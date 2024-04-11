const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleware");

const app = express();
//my middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware for routes
app.use("/api/users", userRoute);

//my routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

//error handler should be before firing the server
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//connect to database first then to port
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
