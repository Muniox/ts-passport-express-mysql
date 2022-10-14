import session from "express-session";
import {createPool} from "mysql2/promise"
const MySQLStore = require('express-mysql-session')(session);

const pool = createPool({
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    pool: 10,
    namedPlaceholders: true,
    decimalNumbers: true,
});

const sessionStore = new MySQLStore({}, pool);

export {
    pool,
    sessionStore
}

