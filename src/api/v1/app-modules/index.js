const express = require("express");
const portfolioRoutes = require("./portfolio/portfolio.routes");

const routes = express.Router();


routes.use("/portfolio", portfolioRoutes)

module.exports = routes;