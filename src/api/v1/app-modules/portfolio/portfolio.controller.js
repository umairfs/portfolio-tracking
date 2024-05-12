const { portfolioValidation } = require("./portfolio.validation");
const { portfolioService } = require("./portfolio.service");
const { responseUtil } = require("shared");

const portfolioController = {};

// controller-desc: Add portfolio details
portfolioController.addPortfolio = async(req, res, next) => {
    try {        
        // validate post request body
        const validatedBody = portfolioValidation.addPortfolio(req.body);
    
        // pass validated body to service function to perform logical operations
       const response = await portfolioService.addPortfolio(validatedBody)

       // send back response
       responseUtil.json(response, req, res);
    } catch (error) {
        next(error)
    }
}

// controller-desc: Add stock trade
portfolioController.addTrade = async(req, res, next) => {
    try {        
        // validate post request body
        const validatedBody = portfolioValidation.addTrade(req.body);
    
        // pass validated body to service function to perform logical operations
       const response = await portfolioService.addTrade(validatedBody)

       // send back response
       responseUtil.json(response, req, res);
    } catch (error) {
        next(error)
    }
}

// controller-desc: update stock trades
portfolioController.updateTrade = async(req, res, next) => {
    try {        
        // validate post request body
        const validatedBody = portfolioValidation.updateTrade(req.body);
    
        // pass validated body to service function to perform logical operations
       const response = await portfolioService.updateTrade(validatedBody)

       // send back response
       responseUtil.json(response, req, res);
    } catch (error) {
        next(error)
    }
}

// controller-desc: delete stock trades
portfolioController.deleteTrade = async(req, res, next) => {
    try {        
        // validate post request body
        const validatedBody = portfolioValidation.deleteTrade(req.body);
    
        // pass validated body to service function to perform logical operations
       const response = await portfolioService.deleteTrade(validatedBody)

       // send back response
       responseUtil.json(response, req, res);
    } catch (error) {
        next(error)
    }
}

// controller-desc: get portfolio details
portfolioController.getPortfolio = async(req, res, next) => {
    try {        
        // validate post request body
        const validatedBody = portfolioValidation.getPortfolio(req.body);
    
        // pass validated body to service function to perform logical operations
       const response = await portfolioService.getPortfolio(validatedBody)

       // send back response
       responseUtil.json(response, req, res);
    } catch (error) {
        next(error)
    }
}

// controller-desc: get customer holding
portfolioController.getHolding = async(req, res, next) => {
    try {        
        // validate post request body
        const validatedBody = portfolioValidation.getHolding(req.body);
    
        // pass validated body to service function to perform logical operations
       const response = await portfolioService.getHolding(validatedBody)

       // send back response
       responseUtil.json(response, req, res);
    } catch (error) {
        next(error)
    }
}

// controller-desc: get returns
portfolioController.getReturns = async(req, res, next) => {
    try {        
        // validate post request body
        const validatedBody = portfolioValidation.getHolding(req.body);
    
        // pass validated body to service function to perform logical operations
       const response = await portfolioService.getReturns(validatedBody)

       // send back response
       responseUtil.json(response, req, res);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    portfolioController,
}