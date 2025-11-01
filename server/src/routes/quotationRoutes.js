// src/routes/quotationRoutes.js
import { Router } from 'express';
// 💡 Asumimos que también has creado los métodos CRUD en el controlador
import { 
    createQuotation, 
    getQuotationDetails,
    getQuotationsByUser, // Nuevo para listar las cotizaciones de un usuario
    updateQuotationStatus, 
    deleteQuotation 
} from '../controllers/quotationController.js'; 

const router = Router();

// ==========================================================
// RUTAS DE COTIZACIÓN
// ==========================================================

// 📝 RUTA 1: CREAR (Generate)
// Genera una nueva cotización a partir del carrito activo.
// Se recomienda proteger esta ruta con un middleware de autenticación (authMiddleware).
router.post('/', createQuotation); 
// Ejemplo de uso: POST /api/quotations

// 📝 RUTA 2: LEER (Listar por Usuario)
// Obtiene todas las cotizaciones de un usuario específico.
// Idealmente, el ID del usuario se obtiene del token (req.user.id).
router.get('/', getQuotationsByUser); 
// Ejemplo de uso: GET /api/quotations

// 📝 RUTA 3: LEER (Detalle por ID)
// Obtiene los detalles de una cotización específica.
router.get('/:id', getQuotationDetails);
// Ejemplo de uso: GET /api/quotations/a1b2c3d4-e5f6-7890-abcd-ef0123456789

// 📝 RUTA 4: ACTUALIZAR (Cambiar Estado)
// Permite actualizar el estado de la cotización (ej: de GENERADA a ACEPTADA).
router.patch('/:id/status', updateQuotationStatus);
// Ejemplo de uso: PATCH /api/quotations/a1b2c3d4.../status con { "estado": "ACEPTADA" }

// 📝 RUTA 5: BORRAR
// Elimina permanentemente una cotización.
// Esta ruta debe estar restringida a administradores o al usuario creador.
router.delete('/:id', deleteQuotation);
// Ejemplo de uso: DELETE /api/quotations/a1b2c3d4-e5f6-7890-abcd-ef0123456789


export default router;