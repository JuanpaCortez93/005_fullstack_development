import { Router } from "express";
import { GetPong } from "../services/index.services.js";

const router = Router();

router.get("/ping", GetPong);

export default router;