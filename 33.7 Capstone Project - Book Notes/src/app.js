import express from "express";
import indexRouter from "./routes/index.routes.js"

const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('./src/public'));

app.use(indexRouter);



export default app;