
const dotenv = require("dotenv");
dotenv.config();

const { MysqlManager } = require("./manager/mysql.manager");
const { errorUtil } = require("./utils/error.util");
const { responseUtil } = require("./utils/response.util");
const { dbTablesNameConst } = require("./const/dbTableNames");
const { portfolioConst } = require("./const/portfolio.const");
const { mastersUtil } = require("./utils/masters.util");

// call mysql manager function and pass required values from config
const mysqlManager = MysqlManager({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE,
    port : process.env.MYSQL_PORT,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    debug: false
});

module.exports = {
    mysqlManager,
    responseUtil,
    errorUtil,
    dbTablesNameConst,
    mastersUtil,
    portfolioConst
};