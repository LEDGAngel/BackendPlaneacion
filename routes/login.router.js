import { Router } from "express";
import { login } from "../controladores/login.controller.js";


const router = Router();

router.post("/login/", login);

export default router;