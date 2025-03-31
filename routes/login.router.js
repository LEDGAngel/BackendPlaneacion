import { Router } from "express";
import { login, register, putlogin } from "../controladores/login.controller.js";


const router = Router();

router.post("/login/", login);
router.post("/register/", register);
router.put("/login/:password", putlogin);

export default router;