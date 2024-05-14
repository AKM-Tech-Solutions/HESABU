"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("./auth");
var rootRouter = (0, express_1.Router)();
rootRouter.use("/auth", auth_1.default);
exports.default = rootRouter;
