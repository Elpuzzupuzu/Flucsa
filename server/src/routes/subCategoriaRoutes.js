// subCategoriaRoutes.js
import { Router } from "express";
import { SubCategoriaController } from "../controllers/subCategoriaController.js";

const router = Router();

router.get("/", SubCategoriaController.getAll);
router.get("/:id", SubCategoriaController.getById);
router.post("/", SubCategoriaController.create);
router.put("/:id", SubCategoriaController.update);
router.delete("/:id", SubCategoriaController.delete);

export default router;
