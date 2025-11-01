import { Router } from 'express';
// 💡 Importamos tus middlewares, renombrando authMiddleware a protect para claridad.
// Asegúrate que la ruta a tu authMiddleware sea correcta.
import { authMiddleware as protect, authRole } from '../middleware/authMiddleware.js'; 
import { 
    createQuotation, 
    getQuotationDetails,
    getQuotationsByUser,
    updateQuotationStatus, 
    deleteQuotation 
} from '../controllers/quotationController.js'; 

const router = Router();
const ONLY_ADMIN = ['admin']; // Definición del rol de administrador

// ==========================================================
// RUTAS DE COTIZACIÓN PROTEGIDAS
// ==========================================================

// 📝 RUTA 1: CREAR (Generate)
router.post('/', protect, createQuotation); 
// Ejemplo: POST /api/quotations

// 📝 RUTA 2: LEER (Listar por Usuario/Admin)
// La ruta es la misma, la lógica de filtrado se maneja en el Servicio.
router.get('/', protect, getQuotationsByUser); 
// Ejemplo: GET /api/quotations

// 📝 RUTA 3: LEER (Detalle por ID)
router.get('/:id', protect, getQuotationDetails);
// Ejemplo: GET /api/quotations/a1b2c3d4...

// 📝 RUTA 4: ACTUALIZAR (Cambiar Estado)
// Restringido a usuarios logueados (el servicio debe verificar la propiedad/rol).
router.patch('/:id/status', protect, updateQuotationStatus);
// Ejemplo: PATCH /api/quotations/a1b2c3d4.../status con { "estado": "ACEPTADA" }

// 📝 RUTA 5: BORRAR / CANCELAR
// Restringido a usuarios logueados (el servicio decide si es DELETE o PATCH a CANCELADA).
router.delete('/:id', protect, deleteQuotation);
// Ejemplo: DELETE /api/quotations/a1b2c3d4...


export default router;