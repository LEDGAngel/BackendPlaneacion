import "dotenv/config"
import express from "express";
import indexRouter from "./routes/index_router.js"
import itemsRouter from "./routes/items.router.js"
import itemsRouter2 from "./routes/items2.routes.js"
import loginRouter from "./routes/login.router.js"
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./utils/mongodb.js";

const app = express();

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(indexRouter);
app.use(itemsRouter);
app.use(itemsRouter2);
app.use(loginRouter);



app.listen(5001, console.log("http://localhost:5001"));

