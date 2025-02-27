import { Router } from "express";
import { getItems, getItem, postItem, putItem, deleteItem } from "../controladores/items.controllers.js";

const router = Router();

router.get("/items/", getItems);
router.get("/items/:id", getItem);
router.get("/items/", postItem);
router.get("/items/:id", putItem);
router.get("/items/:id", deleteItem);


export default router;