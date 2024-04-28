import { Router } from "express";
import { GetPong, GetIndex } from "../services/index.services.js";

const router = Router();

router.get('/ping', GetPong);
router.get('/', GetIndex);

export default router;