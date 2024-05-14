"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var routes_1 = require("./routes/routes");
var app = express();
var PORT = process.env.PORT || 5001;
app.use("/api", routes_1.default);
app.listen(PORT, function () {
    console.log("Server Running on port ".concat(PORT));
});
