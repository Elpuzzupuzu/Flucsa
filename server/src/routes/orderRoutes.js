import { Router } from 'express';
// Importamos tus middlewares, renombrando authMiddleware a protect para claridad
import { authMiddleware as protect, authRole } from '../middleware/authMiddleware.js'; 
import { 
    createOrder, 
    getOrders, 
    getOrderDetails
    // ... aquí se añadirían updateOrderStatus, etc.
} from '../controllers/orderController.js'; 

const router = Router();
const ONLY_ADMIN = ['admin']; // Definición del rol de administrador

// ==========================================================
// RUTAS DE PEDIDOS (Órdenes)
// ==========================================================

// 📝 RUTA 1: CREAR PEDIDO (CHECKOUT)
// Todos los usuarios logueados pueden crear un pedido (checkout).
router.post('/', protect, createOrder); 
// Ejemplo: POST /api/orders

// 📝 RUTA 2: LEER (Listar Pedidos)
// La lógica de filtrado (todos vs. solo los propios) se maneja en el Servicio.
router.get('/', protect, getOrders); 
// Ejemplo: GET /api/orders

// 📝 RUTA 3: LEER (Detalle por ID)
// La lógica de autorización (dueño vs. admin) se maneja en el Controlador.
router.get('/:id', protect, getOrderDetails);
// Ejemplo: GET /api/orders/e9f8a7d6...

// 📝 RUTA 4 (OPCIONAL): Actualizar Estado del Pedido (Solo Admin)
// router.patch('/:id/status', protect, authRole(ONLY_ADMIN), updateOrderStatus);


export default router;