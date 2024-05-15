const { portfolioModel } = require("./portfolio.model");
const portfolioMessage = require("./portfolio.message");
const { portfolioConst } = require("shared");

const portfolioService = {};

// servic-desc: Add portfolio description in customer portfolio table
portfolioService.addPortfolio = async({ customer_id ,customer_portfolio_name }) => {
    
    // check customer exist or not
    await portfolioService.getCustomerDetails({ customer_id });

    // add portfolio details in db table
    await portfolioModel.addPortfolio({ customer_id, customer_portfolio_name, is_active: 1 });

    return portfolioMessage.PFS001;
};

// servic-desc: Add stock in customer stock trade table
portfolioService.addTrade = async({ customer_id, portfolio_id, stock_name, stock_quantity, stock_price, trade_type, trade_date }) => {
    
    // check customer exist or not
    await portfolioService.getCustomerDetails({ customer_id });

    // fetch stock details
    let stockDetails = await portfolioModel.getLiveStocks ({ live_stock_name: stock_name });

    if(!stockDetails.length) {
        return errorUtil.throw(portfolioMessage.PFE011);
    }

    stockDetails = stockDetails[0];

    await portfolioModel.addTrade({ 
        customer_id, 
        customer_portfolio_id: portfolio_id,    
        live_stock_id: stockDetails.live_stock_id,
        stock_trade_quantity: stock_quantity,
        stock_trade_price: stock_price,
        stock_trade_type: trade_type,
        stock_trade_date: trade_date
    });

    return portfolioMessage.PFS002;
};

// servic-desc: update customer stocks trade detail in stock trade table
portfolioService.updateTrade = async({ trade_id, stock_name, stock_quantity, stock_price, trade_type, trade_date }) => {

    // check customer exist or not
    await portfolioService.getCustomerDetails({ customer_id });

    // fetch stock details
    let stockDetails = await portfolioModel.getLiveStocks ({ live_stock_name: stock_name });

    if(!stockDetails.length) {
        return errorUtil.throw(portfolioMessage.PFE011);
    }

    stockDetails = stockDetails[0];

    await portfolioModel.updateStockTrade(
        {
            stock_trade_id: trade_id
        },
        {  
            live_stock_id: stockDetails.live_stock_id,
            stock_trade_quantity: stock_quantity,
            stock_trade_price: stock_price,
            stock_trade_type: trade_type,
            stock_trade_date: trade_date
        }
    );

    return portfolioMessage.PFS003;
};

// servic-desc: delete customers stock from stock trade
portfolioService.deleteTrade = async({ customer_id, stock_trade_id }) => {

    // check customer exist or not
    await portfolioService.getCustomerDetails({ customer_id });
    
    await portfolioModel.updateStockTrade(
        {
            stock_trade_id,
        },
        {  
            is_deleted: 1
        }
    );

    return portfolioMessage.PFS003;
};

// servic-desc: get customerwise portfolio details with stocks
portfolioService.getPortfolio = async({ customer_id }) => {
    
    // check customer exist or not
    await portfolioService.getCustomerDetails({ customer_id });

    // initializing response variable
    let response = [];

    // fetch stock details
    let portfolioDetails = await portfolioModel.getPortfolio({ customer_id });

    if(!portfolioDetails.length) {
        return errorUtil.throw(portfolioMessage.PFE013);
    }

    // parse response
    portfolioDetails.forEach(element => {

        let portfolioData = {
            portfolio_id: element.customer_portfolio_id,
            portfolio_name: element.customer_portfolio_name
        };

        let stockDetails = {
            stock_name : element.live_stock_name,
            stock_quantity :  element.stock_trade_quantity,
            stock_price : element.stock_trade_price,
            trade_type : element.stock_trade_type,
            trade_date : element.stock_trade_date
        };

        if(response.length > 0) {
            response.forEach((ele, i)=> {
                if(ele.portfolio_id === element.customer_portfolio_id) {
                    response[i].stock_details.push(stockDetails);
                } else {
                    portfolioData.stock_details = [stockDetails];
                    response.push(portfolioData);
                }
            });

        } else {
            portfolioData.stock_details = [stockDetails];
            response.push(portfolioData);    
        }

    });

    return finalResp = {
        success: true,
        data: response
    };
};

// servic-desc: get customerwise portfolio wise holdings
portfolioService.getHolding = async({ customer_id, portfolio_id }) => {

    // check customer exist or not
    await portfolioService.getCustomerDetails({ customer_id });

    // fetch stock details
    let holdingDetails = await portfolioModel.getHolding({ customer_id, customer_portfolio_id: portfolio_id });

    if(!holdingDetails.length) {
        return errorUtil.throw(portfolioMessage.PFE013);
    }

    return finalResp = {
        success: true,
        data: holdingDetails
    };

};

// servic-desc: get customerwise portfolio wise returns
portfolioService.getReturns = async({ customer_id, portfolio_id }) => {
   
    // check customer exist or not
    let customer = await portfolioService.getCustomerDetails({ customer_id });

    // fetch portfolio return
    let returns = await portfolioModel.getReturns({ customer_id, customer_portfolio_id: portfolio_id });

    if(!returns.length) {
        return errorUtil.throw(portfolioMessage.PFE014);
    }

    returns = returns[0];

    // fetch final holdings
    let holdingDetails = await portfolioModel.getHolding({ customer_id, customer_portfolio_id: portfolio_id });

    if(!holdingDetails.length) {
        return errorUtil.throw(portfolioMessage.PFE013);
    }

    holdingDetails = holdingDetails[0];

    // calculating absolute return, relative return, percentage return

    // initial portfolio value - as of now we are by default keeping it in customers table, for better approach we can create a functionality where we can store initial investment, based on that investment what was the initial portfolio in a seperate table.
    let initialPortfolio = customer.initial_portfolio_value;

    // final portfolio value
    let finalPortfolio = holdingDetails.totalQuantity * holdingDetails.stock_price + customer.cash;

    // absolute return value
    let absoluteReturn = (finalPortfolio - initialPortfolio );

    // relative return value
    let relativeReturn = ((finalPortfolio - initialPortfolio )/initialPortfolio) * 100;

    // percentage return value
    let percentageReturn = (absoluteReturn/initialPortfolio) * 100;



    // calculate portfolio return
    let portfolioReturns = ((returns.totalSellPrice - returns.totalBuyPrice)/returns.totalBuyPrice)*100;

    returns.current_portfolio_return = portfolioReturns;
    returns.absoluteReturn = absoluteReturn;
    returns.relativeReturn = relativeReturn;
    returns.percentageReturn = percentageReturn;


    return finalResp = {
        success: true,
        data: returns
    };

};

// servic-desc: get customer details
portfolioService.getCustomerDetails = async({ customer_id }) => {
    
    // fetch customer details
    let customer = await portfolioModel.getCustomerDetails({ customer_id });

    if(!customer.length) {
        return errorUtil.throw({code: "CSE001", status:200, message: "Customer not found"});
    }

    customer = customer[0];

    return customer;

};

// service-desc: update customer holding table
portfolioService.updateCustomerHoldings = async({live_stock_id, customer_id, customer_portfolio_id, stock_quantity, action_type}) => {

    let customerHolding = await portfolioModel.getCustomerHoldings({ live_stock_id })

    if(!customerHolding.length ) {
        await portfolioModel.addInCustomerHolding({ 
            customer_portfolio_id, 
            customer_id, 
            live_stock_id,
            customer_holding_stock_quantity: stock_quantity 
        })

        return true
    }

    let final_stock_quantity = 0;
    if(action_type === "add") {
        final_stock_quantity = customerHolding.customer_holding_stock_quantity + stock_quantity;
    } else if (action_type === "remove") {
        final_stock_quantity = customerHolding.customer_holding_stock_quantity - stock_quantity;
    }

    await portfolioModel.updateCustomerHolding(
        { 
            customer_holding_id: customerHolding.customer_holding_id,
        },
        { 
            customer_holding_stock_quantity: customerHolding.final_stock_quantity,
        }
    );


}; 

module.exports = {
    portfolioService
}

