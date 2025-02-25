import express from "express";
import indexRouter from "./routes/index_router.js"

const app = express();

app.use(indexRouter);


app.listen(5001, console.log("http://localhost:5001"));

