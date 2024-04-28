import {Router} from "express";
import {GetViewAuthors, GetAddAuthors, AddAuthors, GetDeleteAuthors, DeleteAuthors} from "../services/authors.services.js"

const router = Router();

router.get('/viewAuthors', GetViewAuthors);

router.get('/addAuthor', GetAddAuthors);
router.post('/addAuthors', AddAuthors);

router.get('/deleteAuthors/:id', GetDeleteAuthors);
router.post('/deleteAuthors/:id', DeleteAuthors);


export default router;