import {createPool} from "mysql2"

const pool = createPool({
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DB,
    password: process.env.DBPASSWORD,
});

export default pool;

