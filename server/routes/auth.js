"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../controllers/auth");
var authRoute = (0, express_1.Router)();
authRoute.get('/login', auth_1.login);
exports.default = authRoute;
