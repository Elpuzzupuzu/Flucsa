import { Router } from "express";
import multer from "multer";
import { uploadProductImage } from "../controllers/imageController.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload-image", upload.single("imagen"), uploadProductImage);

export default router;
