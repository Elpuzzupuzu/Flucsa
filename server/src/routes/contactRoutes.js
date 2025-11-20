// src/routes/ContactRoutes.js

import { Router } from 'express';
import ContactController from '../controllers/contactController.js';

const router = Router();

// Definimos el endpoint: POST /api/contact/submit
// Se recomienda usar el prefijo /api/ si tu backend sirve otras cosas
router.post('/submit', ContactController.handleSubmission);

export default router;