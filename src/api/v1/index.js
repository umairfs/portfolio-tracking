const express = require("express");
const appRoutes = require("./app-modules");

const routes = express.Router();

routes.use("/v1/", appRoutes)

module.exports = routes;