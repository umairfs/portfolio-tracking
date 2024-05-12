const dotenv = require("dotenv");
const mysql = require("mysql2/promise");
dotenv.config();

let globalConnection = null;

const MysqlManager = ({
    host,
    port,
    user,
    password,
    database,
    waitForConnections = true,
    connectionLimit = 10,
    queueLimit = 0,
    debug = false,
  }) => {
    const getConnection = async () => {
      if(globalConnection){
        let isOpen = !globalConnection?.connection?._closing;
        if(isOpen){
          return globalConnection;
        }
        console.log("DB: connection expired ", globalConnection);
        console.log("DB: going for new connection.");
      }
  
      globalConnection = await mysql.createConnection({
        host,
        port,
        user,
        password,
        database,
        waitForConnections,
        connectionLimit,
        queueLimit,
        debug
      });
  
      return globalConnection;
    };
  
    const getTransactionalConnection = async () => {
      const pool = await getConnection();
      return pool; //.getConnection();
    };
  
    const getRecords = async (
      table,
      {
        select = [],
        where = [],
        params = [],
        groupBy = [],
        multiSortBy = [],
        sortBy,
        sortDirection = "desc",
        limit = 10,
        page = 0,
        join = [],
      } = {},
      { connection } = {}
    ) => {
      const conn = await getConnection();
      const whereString = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
      const groupByString =
        groupBy.length > 0 ? `GROUP BY ${groupBy.join(", ")}` : "";
      const sortingString =
        sortBy && sortDirection ? `ORDER BY ${sortBy} ${sortDirection}` : "";
      const multiSortingString = multiSortBy.length
        ? `ORDER BY ${multiSortBy.join(", ")}`
        : "";
      const pagingString =
        page > 0 ? `LIMIT ${limit} OFFSET ${(page - 1) * limit}` : "";
  
      const query = `
      SELECT ${
        select.length > 0 ? select.join(", ") : "*"
      } FROM ${table} ${join.join(" ")}
      ${whereString} ${groupByString} ${sortingString} ${multiSortingString} ${pagingString}
    `
        .replace(/\n/g, " ")
        .trim();
  
      const [rows] = await conn.execute(query, params);
  
      return rows;
    };
  
    const insertRecord = async (
      table,
      { columns = [], params = [] } = {},
      { connection, } = {}
    ) => {
      const conn = connection || (await getConnection());
  
      const query = `INSERT INTO ${table}(${columns.join(", ")}) VALUES(${columns
        .map((c) => "?")
        .join(", ")})`;
      const [result] = await conn.execute(query, params);
      return result.insertId;
    };

    const updateRecords = async (
      table,
      { set = [], setParams = [], where = [], whereParams = [] } = {},
      { connection, } = {}
    ) => {
      if (set.length == 0 || where.length == 0) {
        throw new Error("Invalid update db operation trying to perform");
      }
      if (setParams.length == 0 || whereParams.length == 0) {
        throw new Error(
          "Invalid update db operation with empty params trying to perform"
        );
      }
  
      const conn = connection || (await getConnection());
      const whereString = ` ${where.join(" AND ")}`;
      const setString = ` ${set.join(", ")} `;
  
      const query = `UPDATE ${table} SET ${setString} WHERE ${whereString}`;
  
      const params = [...setParams, ...whereParams];
      const [result] = await conn.execute(query, params);
      return result.affectedRows;
    };
  
    const deleteRecords = async (
      table,
      { where = [], params = [] } = {},
      { connection, } = {}
    ) => {
      if (where.length == 0) {
        throw new Error("Invalid delete db operation trying to perform");
      }
  
      const conn = connection || (await getConnection());
      const whereString = ` ${where.join(" AND ")}`;
  
      const query = `DELETE FROM ${table}  WHERE ${whereString}`
        .replace(/\n/g, " ")
        .trim();
  
      const [result] = await conn.execute(query, params);
      return result.affectedRows;
    };
  
    return {
      getConnection,
      getTransactionalConnection,
      getRecords,
      updateRecords,
      deleteRecords,
      insertRecord,
    };
  };
  
module.exports = {
    MysqlManager,
};
  
