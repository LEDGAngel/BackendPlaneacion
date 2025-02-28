import { Router } from "express";
import { getItems, getItem, postItem, putItem, deleteItem } from "../controladores/items.controllers.js";

const router = Router();

router.get("/items/", getItems);
router.get("/items/:id", getItem);
router.post("/items/", postItem);
router.put("/items/:id", putItem);
router.delete("/items/:id", deleteItem);


export default router;