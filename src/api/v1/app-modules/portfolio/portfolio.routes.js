const express = require("express");
const { portfolioController } = require("./portfolio.controller");
const routes = express.Router();

// route-desc : Add portfolio
routes.post("/", portfolioController.addPortfolio);

// route-desc : Get portfolio details
routes.get("/", portfolioController.getPortfolio);

// route-desc : Add trades in portfolio
routes.post("/addTrade", portfolioController.addTrade);

// route-desc : Update trades in portfolio
routes.put("/updateTrade", portfolioController.updateTrade);

// route-desc : delete trades in portfolio
routes.delete("/removeTrade", portfolioController.deleteTrade);

// route-desc : get customer holding
routes.get("/holdings", portfolioController.getHolding);

// route-desc : get customer holding
routes.get("/returns", portfolioController.getReturns);

module.exports = routes;