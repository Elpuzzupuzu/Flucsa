import * as OrderService from '../services/orderService.js';

// ==========================================================
// 1. CREATE (Checkout) - RUTA: POST /api/orders
// ==========================================================

async function createOrder(req, res) {
    // 💡 Datos obtenidos del middleware de autenticación
    const usuarioId = req.user.id; 
    
    // 💡 Datos de envío y pago esperados del cuerpo de la petición
    const { 
        nombre_receptor, 
        direccion_linea1, 
        ciudad, 
        codigo_postal, 
        pais, 
        metodo_pago,
        referencia_pago // Opcional, si el pago se procesó antes del POST
    } = req.body; 

    // 1. Validación de Datos Mínimos
    if (!direccion_linea1 || !ciudad || !metodo_pago) {
        return res.status(400).json({ 
            message: "Faltan campos obligatorios de envío y/o pago (dirección, ciudad, método de pago)." 
        });
    }

    // 2. Agrupar la información de envío/pago
    const shippingInfo = {
        nombre_receptor, 
        direccion_linea1, 
        ciudad, 
        codigo_postal, 
        pais, 
        metodo_pago,
        referencia_pago
    };

    try {
        // 3. Llamar al servicio para iniciar la transacción de checkout
        const pedido = await OrderService.createOrderFromCart(usuarioId, shippingInfo);
        
        res.status(201).json({ 
            message: "Pedido generado y confirmado con éxito. Inventario actualizado.", 
            pedido 
        });

    } catch (error) {
        console.error("Error en orderController.createOrder:", error.message);
        
        // Manejo de errores de negocio específicos del servicio
        if (error.message.includes("carrito está vacío") || error.message.includes("Stock insuficiente")) {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Error interno al procesar el pedido." });
    }
}

// ==========================================================
// 2. READ (Listar) - RUTA: GET /api/orders
// ==========================================================

async function getOrders(req, res) {
    const usuarioId = req.user.id;
    const rolUsuario = req.user.rol;
    
    try {
        // El Servicio filtra automáticamente por rol (Admin vs. User)
        const pedidos = await OrderService.getOrders(usuarioId, rolUsuario); 

        res.status(200).json(pedidos);
    } catch (error) {
        console.error("Error en getOrders:", error.message);
        res.status(500).json({ message: "Error al listar los pedidos." });
    }
}

// ==========================================================
// 3. READ (Detalle por ID) - RUTA: GET /api/orders/:id
// ==========================================================

async function getOrderDetails(req, res) {
    const { id } = req.params;

    try {
        const pedido = await OrderService.getOrderDetails(id);

        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado." });
        }
        
        // 💡 LÓGICA DE AUTORIZACIÓN: Solo el ADMIN o el dueño pueden ver el detalle
        if (req.user.rol !== 'admin' && pedido.usuario_id !== req.user.id) {
            return res.status(403).json({ message: "Acceso denegado. Este pedido no te pertenece." });
        }

        res.status(200).json(pedido);
    } catch (error) {
        console.error("Error en getOrderDetails:", error.message);
        res.status(500).json({ message: "Error al obtener el pedido." });
    }
}


export {
    createOrder,
    getOrders,
    getOrderDetails
    // ... aquí se añadirán updateOrderStatus, etc.
};