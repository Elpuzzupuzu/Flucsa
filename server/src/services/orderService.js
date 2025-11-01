import * as OrderRepo from '../repositories/orderRepository.js';
import { CarritoRepository as CartRepo } from '../repositories/cartRepository.js';

// ==========================================================
// LÓGICA DE NEGOCIO: CHECKOUT (Operación Crítica)
// ==========================================================

/**
 * Procesa el checkout: convierte el carrito activo del usuario en un pedido.
 * Garantiza la validación de stock, la creación del pedido y la actualización de inventario.
 * @param {string} usuarioId - ID del usuario.
 * @param {object} shippingInfo - Dirección de envío y detalles de pago (ya validados por el controlador).
 * @returns {Promise<object>} El pedido creado y completo.
 */
async function createOrderFromCart(usuarioId, shippingInfo) {
    let orderId = null; // Para rastrear el pedido si hay un fallo y marcarlo como FALLIDO

    try {
        // 1. OBTENER Y VALIDAR EL CARRITO
        const carritoId = await CartRepo.getOrCreateActiveCartId(usuarioId);
        if (!carritoId) {
            throw new Error("No se encontró un carrito activo para el usuario.");
        }
        
        // Obtener ítems del carrito CON datos de producto (incluyendo existencias y precio)
        // Se asume que CartRepo.getCartItemsByCartId es el nombre correcto (confirmado antes)
        const carritoItems = await CartRepo.getCartItemsByCartId(carritoId); 

        if (!carritoItems || carritoItems.length === 0) {
            throw new Error("El carrito está vacío. No se puede crear el pedido.");
        }

        let totalFinal = 0;
        const itemsPedido = [];
        const stockUpdates = [];

        // 2. VALIDAR EXISTENCIAS Y PREPARAR DATOS (Congelamiento)
        for (const item of carritoItems) {
            const producto = item.producto;
            const cantidad = item.cantidad;
            
            // 💡 AJUSTE DE ESTABILIDAD: Trata null/undefined como 0 para la comparación. 
            // Esto asegura que la comparación numérica sea segura.
            const existenciasDisponibles = producto.existencias || 0; 
            
            if (existenciasDisponibles === undefined || producto.precio === undefined) {
                 throw new Error(`Datos incompletos para el producto ID ${item.producto_id}.`);
            }

            if (existenciasDisponibles < cantidad) { // Usa el valor ajustado
                // Lanza un error controlado, que será capturado por el 'catch' de la función
                throw new Error(`Stock insuficiente para el producto: ${producto.nombre}. Disponible: ${existenciasDisponibles}. Solicitado: ${cantidad}.`);
            }
            
            totalFinal += producto.precio * cantidad;

            // Congelamiento de datos para orders_items
            itemsPedido.push({
                producto_id: item.producto_id,
                nombre_producto: producto.nombre,
                precio_unitario: producto.precio,
                cantidad: cantidad,
            });

            stockUpdates.push({
                producto_id: item.producto_id,
                cantidad: cantidad,
            });
        }
        
        // 3. CREAR LA CABECERA DEL PEDIDO
        const orderData = {
            usuario_id: usuarioId,
            total_final: totalFinal,
            estado_pedido: 'PENDIENTE', // Estado inicial
            ...shippingInfo, // dirección, método_pago, etc.
        };

        const { id: newOrderId } = await OrderRepo.createOrder(orderData);
        orderId = newOrderId; 
        
        // 4. CREAR LOS ÍTEMS DEL PEDIDO
        const itemsConOrderId = itemsPedido.map(item => ({
            ...item,
            pedido_id: orderId 
        }));
        await OrderRepo.addOrderItems(itemsConOrderId);

        // 5. ACTUALIZAR INVENTARIO (CRÍTICO)
        for (const update of stockUpdates) {
            // Se asume que updateProductStock usa una RPC o un método atómico.
            await OrderRepo.updateProductStock(update.producto_id, update.cantidad);
        }
        
        // 6. LIMPIAR CARRITO
        // Desactivar el carrito para que no se use de nuevo
        await CartRepo.deactivateCart(carritoId); 

        // 7. FINALIZAR: Retornar el pedido completo
        return OrderRepo.getOrderById(orderId); 

    } catch (error) {
        // Este catch asegura que la promesa no falle de forma no controlada.
        console.error("Error en createOrderFromCart Service:", error);
        
        // Lógica de Fallo/Rollback
        if (orderId) {
             // Si el pedido se creó antes de fallar el inventario, marcar como FALLIDO_SISTEMA
             // await OrderRepo.updateOrderStatus(orderId, 'FALLIDO_SISTEMA');
             console.warn(`[CHECKOUT FALLIDO] Pedido ${orderId} creado, pero falló la operación posterior (inventario/limpieza).`);
        }
        
        // 🛑 Lanza el error al controlador para que responda con HTTP 400/500
        throw new Error(`Fallo en el proceso de Checkout: ${error.message}`);
    }
}

// ==========================================================
// MÉTODOS CRUD (Delegación + RBAC)
// ==========================================================

/**
 * Obtiene la lista de pedidos, filtrando por usuario a menos que sea admin.
 */
async function getOrders(usuarioId, rolUsuario) {
    if (rolUsuario === 'admin') {
        // ADMIN: Obtiene TODOS los pedidos
        return OrderRepo.getAllOrders(); 
    } else {
        // USER: Obtiene SOLO los suyos
        return OrderRepo.getOrdersByUserId(usuarioId);
    }
}

async function getOrderDetails(id) {
    return OrderRepo.getOrderById(id);
}


export {
    createOrderFromCart,
    getOrders,
    getOrderDetails
};