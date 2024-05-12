
const { mysqlManager, dbTablesNameConst } = require("shared");

const portfolioModel = {};

// model-desc : To insert data in portfolio table
portfolioModel.addPortfolio = async (
    {
        customer_id,
        customer_portfolio_name,
        is_active
    } = {},
    { connection } = {}
) => {
    const columns = [];
    const params = [];

    if (customer_id !== undefined) {
        columns.push("customer_id");
        params.push(customer_id);
    }

    if (customer_portfolio_name !== undefined) {
        columns.push("customer_portfolio_name");
        params.push(customer_portfolio_name);
    }

    if (is_active !== undefined) {
        columns.push("is_active");
        params.push(is_active);
    }

    const id = await mysqlManager.insertRecord(
        dbTablesNameConst.CUSTOMER_PORTFOLIO,
        { columns, params },
        { connection }
    );
    return id;
};

// model-desc: Fetch live stock details
portfolioModel.getLiveStocks = async (
    { live_stock_name, live_stock_id } = {},
    { connection } = {}
) => {
    const select = [
        "*"
    ];
    const where = [];
    const params = [];

    if (live_stock_name !== undefined) {
        where.push("ls.live_stock_name=?");
        params.push(live_stock_name);
    }

    if (live_stock_id !== undefined) {
        where.push("ls.live_stock_id=?");
        params.push(live_stock_id);
    }

    const rows = await mysqlManager.getRecords(
        `${dbTablesNameConst.LIVE_STOCK} as ls`,
        { select, where, params },
        { connection }
    );

    return rows;
};

// model-desc : To insert trade data in stock trade table
portfolioModel.addTrade = async (
    {
        customer_id,
        customer_portfolio_id,
        live_stock_id,
        stock_trade_quantity,
        stock_trade_price,
        stock_trade_type,
        stock_trade_date,
        is_deleted = 0,
    } = {},
    { connection } = {}
) => {
    const columns = [];
    const params = [];

    if (customer_id !== undefined) {
        columns.push("customer_id");
        params.push(customer_id);
    }

    if (customer_portfolio_id !== undefined) {
        columns.push("customer_portfolio_id");
        params.push(customer_portfolio_id);
    }

    if (live_stock_id !== undefined) {
        columns.push("live_stock_id");
        params.push(live_stock_id);
    }

    if (stock_trade_quantity !== undefined) {
        columns.push("stock_trade_quantity");
        params.push(stock_trade_quantity);
    }

    if (stock_trade_price !== undefined) {
        columns.push("stock_trade_price");
        params.push(stock_trade_price);
    }

    if (stock_trade_type !== undefined) {
        columns.push("stock_trade_type");
        params.push(stock_trade_type);
    }

    if (stock_trade_date !== undefined) {
        columns.push("stock_trade_date");
        params.push(stock_trade_date);
    }

    if (is_deleted !== undefined) {
        columns.push("is_deleted");
        params.push(is_deleted);
    }

    const id = await mysqlManager.insertRecord(
        dbTablesNameConst.STOCK_TRADE,
        { columns, params },
        { connection }
    );
    return id;
};


// model-desc: Fetch customers stock holdings
portfolioModel.getCustomerHoldings = async (
    { customer_holding_id, live_stock_id } = {},
    { connection } = {}
) => {
    const select = [
        "*"
    ];
    const where = [];
    const params = [];

    if (customer_holding_id !== undefined) {
        where.push("customer_holding_id=?");
        params.push(customer_holding_id);
    }

    if (live_stock_id !== undefined) {
        where.push("live_stock_id=?");
        params.push(live_stock_id);
    }

    const rows = await mysqlManager.getRecords(
        `${dbTablesNameConst.CUSTOMER_HOLDING}`,
        { select, where, params },
        { connection }
    );

    return rows;
};


// model-desc : To insert trade data in customer holding table
portfolioModel.addInCustomerHolding = async (
    {
        customer_id,
        customer_portfolio_id,
        live_stock_id,
        customer_holding_stock_quantity,
    } = {},
    { connection } = {}
) => {
    const columns = [];
    const params = [];

    if (customer_id !== undefined) {
        columns.push("customer_id");
        params.push(customer_id);
    }

    if (customer_portfolio_id !== undefined) {
        columns.push("customer_portfolio_id");
        params.push(customer_portfolio_id);
    }

    if (live_stock_id !== undefined) {
        columns.push("live_stock_id");
        params.push(live_stock_id);
    }

    if (customer_holding_stock_quantity !== undefined) {
        columns.push("customer_holding_stock_quantity");
        params.push(customer_holding_stock_quantity);
    }

    const id = await mysqlManager.insertRecord(
        dbTablesNameConst.CUSTOMER_HOLDING,
        { columns, params },
        { connection }
    );
    return id;
};

//model-desc: to update customer holdings table
portfolioModel.updateCustomerHolding = async (
    { customer_holding_id },
    {
        customer_holding_stock_quantity,
    },
    { connection } = {}
) => {
    const where = [];
    const whereParams = [];
    const set = [];
    const setParams = [];

    if (customer_holding_id !== undefined) {
        where.push("customer_holding_id = ?");
        whereParams.push(customer_holding_id);
    }

    if (customer_holding_stock_quantity !== undefined) {
        set.push("customer_holding_stock_quantity=?");
        setParams.push(customer_holding_stock_quantity);
    }
    const rows = await mysqlManager.updateRecords(
        dbTablesNameConst.CUSTOMER_HOLDING,
        { set, setParams, where, whereParams },
        { connection }
    );

    return rows;
};

//model-desc: to update customer holdings table
portfolioModel.updateStockTrade = async (
    { stock_trade_id },
    {        
        live_stock_id,
        stock_trade_quantity,
        stock_trade_price,
        stock_trade_type,
        stock_trade_date,
        is_deleted,

    },
    { connection } = {}
) => {
    const where = [];
    const whereParams = [];
    const set = [];
    const setParams = [];

    if (stock_trade_id !== undefined) {
        where.push("stock_trade_id = ?");
        whereParams.push(stock_trade_id);
    }

    if (live_stock_id !== undefined) {
        set.push("live_stock_id=?");
        setParams.push(live_stock_id);
    }

    if (stock_trade_quantity !== undefined) {
        set.push("stock_trade_quantity=?");
        setParams.push(stock_trade_quantity);
    }

    if (stock_trade_price !== undefined) {
        set.push("stock_trade_price=?");
        setParams.push(stock_trade_price);
    }

    if (stock_trade_type !== undefined) {
        set.push("stock_trade_type=?");
        setParams.push(stock_trade_type);
    }

    if (stock_trade_date !== undefined) {
        set.push("stock_trade_date=?");
        setParams.push(stock_trade_date);
    }

    if (is_deleted !== undefined) {
        set.push("is_deleted=?");
        setParams.push(is_deleted);
    }

    const rows = await mysqlManager.updateRecords(
        dbTablesNameConst.STOCK_TRADE,
        { set, setParams, where, whereParams },
        { connection }
    );

    return rows;
};

// model-desc: get portfolio details
portfolioModel.getPortfolio = async (
    { customer_id } = {},
    { connection } = {}
) => {
    const select = [
        "*"
    ];
    const where = [];
    const params = [];
    const join = [
        `join ${dbTablesNameConst.STOCK_TRADE} as st on st.customer_portfolio_id = cp.customer_portfolio_id`,
        `join ${dbTablesNameConst.LIVE_STOCK} as lt on lt.live_stock_id = st.live_stock_id`,
    ];

    if (customer_id !== undefined) {
        where.push("cp.customer_id=?");
        params.push(customer_id);
    }

    const rows = await mysqlManager.getRecords(
        `${dbTablesNameConst.CUSTOMER_PORTFOLIO} as cp`,
        { select, where, params, join },
        { connection }
    );

    return rows;
};

// model-desc: get portfolio wise customer holdings
portfolioModel.getHolding = async (
    { customer_id, customer_portfolio_id } = {},
    { connection } = {}
) => {
    const select = [
        "st.stock_trade_id",
        "ls.live_stock_name as stock_name",
        `SUM(
            CASE WHEN st.stock_trade_type = 'BUY' THEN st.stock_trade_quantity ELSE - st.stock_trade_quantity END
        ) AS totalQuantity`,
        "ls.live_stock_price as stock_price"

    ];
    const where = [];
    const params = [];
    const join = [
        `join ${dbTablesNameConst.LIVE_STOCK} as ls on ls.live_stock_id = st.live_stock_id`,
    ];

    if (customer_id !== undefined) {
        where.push("customer_id=?");
        params.push(customer_id);
    }

    if (customer_portfolio_id !== undefined) {
        where.push("customer_portfolio_id=?");
        params.push(customer_portfolio_id);
    }

    const rows = await mysqlManager.getRecords(
        `${dbTablesNameConst.STOCK_TRADE} as st`,
        { select, where, params, join },
        { connection }
    );

    return rows;
};

// model-desc: get portfolio wise customer holdings
portfolioModel.getReturns = async (
    { customer_id, customer_portfolio_id } = {},
    { connection } = {}
) => {
    const select = [
        "st.stock_trade_id",
        "ls.live_stock_name as stock_name",
        `AVG(
            CASE WHEN st.stock_trade_type = 'BUY' THEN st.stock_trade_price END
        ) AS totalBuyPrice`,
        `AVG(
            CASE WHEN st.stock_trade_type = 'SELL' THEN st.stock_trade_price END
        ) AS totalSellPrice`,
        "ls.live_stock_price as stock_price"

    ];
    const where = [];
    const params = [];
    const join = [
        `join ${dbTablesNameConst.LIVE_STOCK} as ls on ls.live_stock_id = st.live_stock_id`,
    ];

    if (customer_id !== undefined) {
        where.push("customer_id=?");
        params.push(customer_id);
    }

    if (customer_portfolio_id !== undefined) {
        where.push("customer_portfolio_id=?");
        params.push(customer_portfolio_id);
    }

    const rows = await mysqlManager.getRecords(
        `${dbTablesNameConst.STOCK_TRADE} as st`,
        { select, where, params, join },
        { connection }
    );

    return rows;
};

module.exports = {
    portfolioModel,
};
