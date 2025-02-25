import { Router } from "express";
import { getIndex, getPing } from "../controladores/index_controler.js";

const router = Router();

router.get("/",getIndex);
router.get("/ping",getPing);

export default router;