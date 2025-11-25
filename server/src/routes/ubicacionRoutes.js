// ubicacion.routes.js
import { Router } from "express";
import { UbicacionController } from "../controllers/ubicacionController.js";

const router = Router();

router.get("/", UbicacionController.getAll);
router.get("/:id", UbicacionController.getById);
router.post("/", UbicacionController.create);
router.put("/:id", UbicacionController.update);
router.delete("/:id", UbicacionController.delete);

export default router;
