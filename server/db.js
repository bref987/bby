const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.dbuser,
    password: process.env.dbpass,
    database: process.env.dbname,
    host: process.env.dbhost,
    port: process.env.dbport
});

module.exports = pool;
