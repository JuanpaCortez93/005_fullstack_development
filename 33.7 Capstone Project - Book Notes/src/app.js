import express from "express";
import indexRouter from "./routes/index.routes.js"
import booksRouter from "./routes/books.routes.js"
import authorsRouter from "./routes/authors.routes.js"
import searchRouter from "./routes/search.routes.js"

const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('./src/public'));

app.use(indexRouter);
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/search', searchRouter);


export default app;