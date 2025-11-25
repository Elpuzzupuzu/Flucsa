import { Router } from "express";
import { categoriaPrincipalController } from "../controllers/categoriaPrincipalController.js";

const router = Router();

router.get("/", categoriaPrincipalController.getAll);
router.get("/:id", categoriaPrincipalController.getById);
router.post("/", categoriaPrincipalController.create);
router.put("/:id", categoriaPrincipalController.update);
router.delete("/:id", categoriaPrincipalController.delete);

export default router;
