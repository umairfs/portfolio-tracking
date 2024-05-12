
const requestMiddleware = async (req, res, next) => {

    if(req.headers.customer_id) {
        let customer_id  = req.headers.customer_id;
        req.body.customer_id = customer_id;
    }

    if(req.query.portfolio_id) {
        req.body.portfolio_id = req.query.portfolio_id;
    }

    next();
};

module.exports = {
    requestMiddleware,
};
