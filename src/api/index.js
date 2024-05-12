const express = require("express");
const v1Routes = require("./v1/index.js");

const routes = express.Router();


routes.use("/api", v1Routes)

module.exports = routes;