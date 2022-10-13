import {createPool} from "mysql2/promise"

const pool = createPool({
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
});

export default pool;

