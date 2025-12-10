// import express from 'express';
// import { FacturaController } from '../controllers/facturaController.js';
// import { authMiddleware } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.use(authMiddleware);

// // Crear factura
// router.post('/crear', FacturaController.crearFactura);

// // Obtener factura por ID
// router.get('/:id', FacturaController.getFactura);

// // Facturas del usuario autenticado
// router.get('/', FacturaController.getFacturasUser);

// export default router;


import express from 'express';
import { FacturaController } from '../controllers/facturaController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/admin/adminOnly.js';

const router = express.Router();

router.use(authMiddleware); // primero validar el JWT

// Solo admin puede crear facturas
router.post('/crear', adminOnly, FacturaController.crearFactura);

// Obtener factura por ID (admin o dueño de la factura)
router.get('/:id', FacturaController.getFactura);

// Facturas del usuario autenticado
router.get('/', FacturaController.getFacturasUser);

export default router;
