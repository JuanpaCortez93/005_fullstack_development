import {Router} from "express";
import {GetSearchPage, SetSearchPage} from "../services/search.route.js"

const router = Router();

router.post("/main", GetSearchPage);

router.get("/addNewBook/:key", SetSearchPage);

export default router;