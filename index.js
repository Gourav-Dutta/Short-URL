import express from 'express';
import { userRouter } from './routes/url.js';
import {  json, restrictToLoggedinUserOnly } from './middlewares/url.js';
import path from "path";
import { StaticRouter } from './routes/staticRoutes.js';
import { authRouter } from './routes/user.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false}));
app.use(json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use("/url" , restrictToLoggedinUserOnly,  userRouter);
app.use("/", StaticRouter);
app.use("/api/user", authRouter);

app.listen(PORT, console.log(`Server started at PORT :  ${PORT}`));