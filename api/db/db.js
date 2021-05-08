module.exports = require("knex")({
    client: "pg",
    connection: {
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DATABASE_DB,
    },
});
