// src/routes/pdfRoutes.js
import express from "express";
import { pdfController } from "../controllers/pdfController.js";

const router = express.Router();

router.get("/:fileName", pdfController.descargarPdf);

export default router;
