import { Router } from "express";
import { reviewController } from "../controllers/reviewController.js";

const router = Router();

// Obtener todas las reseñas
router.get("/", reviewController.getAll);

// Obtener reseña por ID
router.get("/:id", reviewController.getById);

// Obtener reseñas por producto
router.get("/producto/:producto_id", reviewController.getByProductId);

// Obtener reseñas por usuario
router.get("/usuario/:usuario_id", reviewController.getByUserId);

//
router.get("/promedio/:producto_id", reviewController.getAverageRating);
//
router.get("/has-reviewed/:usuario_id/:producto_id", reviewController.hasReviewed);


// Crear reseña
router.post("/", reviewController.create);

// Actualizar reseña
router.put("/:id", reviewController.update);

// Eliminar reseña
router.delete("/:id", reviewController.delete);

export default router;
