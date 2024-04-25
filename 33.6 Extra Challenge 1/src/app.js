import express from "express";
import indexRouter from "./routes/index.routes.js"
import employeesRouter from "./routes/employees.routes.js"

import './config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(indexRouter);
app.use('/api', employeesRouter);

export default app;