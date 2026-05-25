import express from "express";
import { getItems } from "../controllers/getItemsController.js";
import { getItemById } from "../controllers/getItemByIdController.js";
import { addItem } from "../controllers/addItemController.js";
import { updateItem } from "../controllers/updateItemController.js";
import { deleteItem } from "../controllers/deleteItemController.js";
import { validateItem } from "../middleware/validateItem.js";
import { validateId } from "../middleware/validateId.js";

const router = express.Router();

router.get("/", getItems);
router.get("/:id", validateId, getItemById);
router.post("/", validateItem, addItem);
router.put("/:id", validateId, validateItem, updateItem);
router.delete("/:id", validateId, deleteItem);

export default router;
