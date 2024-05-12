const portfolioMessage = require("./portfolio.message");
const { portfolioConst, mastersUtil } = require("shared");

const portfolioValidation = {};

// validation-desc : validate add portfolio request body
portfolioValidation.addPortfolio= ({ customer_id, customer_portfolio_name }) => {
   
  if (!customer_id) {
    return errorUtil.throw(portfolioMessage.PFE002);
  }

  if (!customer_portfolio_name) {
    return errorUtil.throw(portfolioMessage.PFE003);
  }

  return { customer_id, customer_portfolio_name };
};

// validation-desc : validate add trade in portfolio
portfolioValidation.addTrade= ({ customer_id, portfolio_id, stock }) => {
   
    if (!customer_id) {
        return errorUtil.throw(portfolioMessage.PFE002);
    }

    if (!portfolio_id) {
        return errorUtil.throw(portfolioMessage.PFE001);
    }

    if ( mastersUtil.isEmptyObject(stock) ) {
        return errorUtil.throw(portfolioMessage.PFE004);
    }

    if(!stock.name) {
        return errorUtil.throw(portfolioMessage.PFE005);
    }

    if(!stock.quantity) {
        return errorUtil.throw(portfolioMessage.PFE006);
    }

    if(!stock.price) {
        return errorUtil.throw(portfolioMessage.PFE007);
    }

    if(!stock.trade_type) {
        return errorUtil.throw(portfolioMessage.PFE008);
    }

    if( ![portfolioConst.TRADE_TYPE.BUY, portfolioConst.TRADE_TYPE.SELL].includes(stock.trade_type) ) {
        return errorUtil.throw(portfolioMessage.PFE010);
    }

    if(!stock.trade_date) {
        return errorUtil.throw(portfolioMessage.PFE009);
    }

    return { customer_id, portfolio_id, stock_name: stock.name, stock_quantity: stock.quantity, stock_price: stock.price, trade_type: stock.trade_type, trade_date: stock.trade_date };
};

// validation-desc : validate update trade in portfolio
portfolioValidation.updateTrade= ({ customer_id, portfolio_id, stock }) => {
   
    if (!customer_id) {
        return errorUtil.throw(portfolioMessage.PFE002);
    }

    if (!portfolio_id) {
        return errorUtil.throw(portfolioMessage.PFE001);
    }

    if ( mastersUtil.isEmptyObject(stock) ) {
        return errorUtil.throw(portfolioMessage.PFE004);
    }

    if(!stock.trade_id) {
        return errorUtil.throw(portfolioMessage.PFE012);
    }

    if(!stock.name) {
        return errorUtil.throw(portfolioMessage.PFE005);
    }

    if(!stock.quantity) {
        return errorUtil.throw(portfolioMessage.PFE006);
    }

    if(!stock.price) {
        return errorUtil.throw(portfolioMessage.PFE007);
    }

    if(!stock.trade_type) {
        return errorUtil.throw(portfolioMessage.PFE008);
    }

    if( ![portfolioConst.TRADE_TYPE.BUY, portfolioConst.TRADE_TYPE.SELL].includes(stock.trade_type) ) {
        return errorUtil.throw(portfolioMessage.PFE010);
    }

    if(!stock.trade_date) {
        return errorUtil.throw(portfolioMessage.PFE009);
    }

    return { customer_id, portfolio_id, trade_id: stock.trade_id, stock_name: stock.name, stock_quantity: stock.quantity, stock_price: stock.price, trade_type: stock.trade_type, trade_date: stock.trade_date };
};

// validation-desc : validate delete trade request body
portfolioValidation.deleteTrade= ({ customer_id, stock_trade_id }) => {
   
    if (!customer_id) {
      return errorUtil.throw(portfolioMessage.PFE002);
    }
  
    if (!stock_trade_id) {
      return errorUtil.throw(portfolioMessage.PFE012);
    }
  
    return { customer_id, stock_trade_id };
};

// validation-desc : validate get portfolio request body
portfolioValidation.getPortfolio= ({ customer_id }) => {
   
    if (!customer_id) {
        return errorUtil.throw(portfolioMessage.PFE002);
    }

    return { customer_id };
};

portfolioValidation.getHolding= ({ customer_id, portfolio_id }) => {
   
    if (!customer_id) {
        return errorUtil.throw(portfolioMessage.PFE002);
    }

    if (!portfolio_id) {
        return errorUtil.throw(portfolioMessage.PFE001);
    }

    return { customer_id, portfolio_id };
};

module.exports = {
  portfolioValidation,
};