import { Router } from "express";
import { GetAddBook, CreateBook, GetDeleteBook, DeleteBook, GetUpdateBook, UpdateBook } from "../services/books.services.js";

const router = Router();

router.get('/ping', (req, res) => {
    console.log("Hello")
    res.send("PONG");
});

router.get('/addBook', GetAddBook);
router.post('/addBook', CreateBook);

router.get('/deleteBook/:id', GetDeleteBook);
router.post('/deleteBook/:id', DeleteBook);

router.get('/updateBook/:id', GetUpdateBook);
router.post('/updateBook/:id', UpdateBook);

export default router;