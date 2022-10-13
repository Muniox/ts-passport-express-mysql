import dotenv from "dotenv";
dotenv.config();
import express, {Express} from "express";
const app: Express = express();

app.listen(process.env.PORT, () => {
    console.log(`server listening on http://localhost:${process.env.PORT}`);
});