import "dotenv/config"
import express from "express";
import indexRouter from "./routes/index_router.js"
import itemsRouter from "./routes/items.router.js"
import loginRouter from "./routes/login.router.js"



const app = express();
app.use(express.json());

app.use(indexRouter);
app.use(itemsRouter);
app.use(loginRouter);



app.listen(5001, console.log("http://localhost:5001"));

