const Pool = require("pg").Pool;
const user_db = process.env.USER_DB;
const password_db = process.env.PASSWORD_DB;
const host_db = process.env.HOST_DB;
const port_db = process.env.PORT_DB;
const database_db = process.env.DATABASE_DB;

const pool = new Pool({
    user: user_db,
    password: password_db,
    host: host_db,
    port: port_db,
    database: database_db
});

module.exports = pool;
