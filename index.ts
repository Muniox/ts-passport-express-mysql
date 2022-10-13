import * as dotenv from "dotenv";
dotenv.config();
import express, {Express} from "express";
const app: Express = express();

app.use(express.json());
app.use(express.static('client'));

//zapytanie test
import pool from "./utility/db";
(async () => {
    try {
        const [data] = await pool.execute('SELECT * FROM `users`');
        console.log(data)
    } catch (error) {
        console.log(error);
    }
})();


app.listen(Number(process.env.PORT), () => {
    console.log(`server listening on http://localhost:${process.env.PORT}`);
});