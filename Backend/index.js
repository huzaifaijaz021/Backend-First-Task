import "dotenv/config.js"
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from "morgan"
import setupDatabase from "./config/database.js";
import router from "./routes/route.js";
import startAgenda from "./agenda/agenda.js";

const app = express();

app.use(express.json());
app.use(cors());

setupDatabase()
startAgenda()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan(':date[iso] :method :url: http-version: user-agent :status (:response-time ms)'));

app.use(router);

app.use('*', (req, res) => {
    console.log("Not Found");
    return res.json('page is not found');
});

app.listen(4000, () => {
    console.log(`server is running on ${4000}`);
});