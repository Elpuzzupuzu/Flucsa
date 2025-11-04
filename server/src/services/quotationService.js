///quotationService.js
import * as QuotationRepo from '../repositories/quotationRepository.js';
import { CarritoRepository } from '../repositories/cartRepository.js'; 

// ==========================================================
// MÉTODOS DE LÓGICA DE NEGOCIO
// ==========================================================

/**
 * Genera una cotización permanente a partir del carrito activo del usuario.
 */
// async function generateQuotation(usuarioId) {
//     try {
//         const carritoId = await CarritoRepository.getOrCreateActiveCartId(usuarioId);
//         const carritoItems = await CarritoRepository.getCartItemsByCartId(carritoId);

//         if (!carritoItems || carritoItems.length === 0) {
//             throw new Error("El carrito activo está vacío. No se puede generar la cotización.");
//         }

//         let totalCotizado = 0;
//         const itemsCotizacion = [];

//         for (const item of carritoItems) {
//             const producto = item.producto;
            
//             if (!producto || producto.precio === undefined) {
//                 throw new Error(`Producto ID ${item.producto_id} no tiene datos de precio válidos.`);
//             }

//             totalCotizado += producto.precio * item.cantidad;

//             itemsCotizacion.push({
//                 producto_id: item.producto_id,
//                 nombre_producto: producto.nombre,     
//                 precio_unitario: producto.precio,     
//                 cantidad: item.cantidad,
//             });
//         }
        
//         const { id: nuevaCotizacionId } = await QuotationRepo.createQuotation(
//             usuarioId, 
//             totalCotizado, 
//             carritoId
//         );
        
//         const itemsConCotizacionId = itemsCotizacion.map(item => ({
//             ...item,
//             cotizacion_id: nuevaCotizacionId 
//         }));
        
//         await QuotationRepo.addQuotationItems(itemsConCotizacionId);
        
//         return QuotationRepo.getQuotationById(nuevaCotizacionId); 

//     } catch (error) {
//         console.error("Error en generateQuotation Service:", error);
//         throw new Error(`Fallo en el proceso de cotización: ${error.message}`);
//     }
// }


// ==========================================================
// MÉTODOS CRUD (Delegación + RBAC)
// ==========================================================



/**
 * Genera una cotización permanente a partir del carrito activo del usuario,
 * y luego desactiva dicho carrito.
 */
async function generateQuotation(usuarioId) {
    try {
        const carritoId = await CarritoRepository.getOrCreateActiveCartId(usuarioId);
        const carritoItems = await CarritoRepository.getCartItemsByCartId(carritoId);

        if (!carritoItems || carritoItems.length === 0) {
            throw new Error("El carrito activo está vacío. No se puede generar la cotización.");
        }

        let totalCotizado = 0;
        const itemsCotizacion = [];

        for (const item of carritoItems) {
            const producto = item.producto;
            
            if (!producto || producto.precio === undefined) {
                // Se recomienda no cotizar productos inválidos o notificar al usuario
                throw new Error(`Producto ID ${item.producto_id} no tiene datos de precio válidos.`);
            }

            totalCotizado += producto.precio * item.cantidad;

            itemsCotizacion.push({
                producto_id: item.producto_id,
                nombre_producto: producto.nombre,
                precio_unitario: producto.precio,
                cantidad: item.cantidad,
            });
        }
        
        // 1. CREAR ENCABEZADO DE COTIZACIÓN
        const { id: nuevaCotizacionId } = await QuotationRepo.createQuotation(
            usuarioId, 
            totalCotizado, 
            carritoId
        );
        
        // 2. PREPARAR E INSERTAR ÍTEMS DE COTIZACIÓN
        const itemsConCotizacionId = itemsCotizacion.map(item => ({
            ...item,
            cotizacion_id: nuevaCotizacionId 
        }));
        
        await QuotationRepo.addQuotationItems(itemsConCotizacionId);
        
        // ----------------------------------------------------
        // 3. FINALIZACIÓN Y LIMPIEZA DEL CARRITO
        // ----------------------------------------------------
        
        // 3A. Desactivar el carrito (Regla de Negocio: solo uno activo)
        await CarritoRepository.deactivateCart(carritoId);
        
        // 3B. LIMPIEZA CLAVE: Eliminar los ítems del carrito.
        // Esto asegura que el carrito, si se reutiliza o se crea uno nuevo, 
        // no contenga productos cotizados anteriormente.
        await CarritoRepository.clearCarritoItems(carritoId); // <<-- ¡Línea añadida!
        
        // 4. DEVOLVER COTIZACIÓN FINALIZADA
        return QuotationRepo.getQuotationById(nuevaCotizacionId); 

    } catch (error) {
        console.error("Error en generateQuotation Service:", error);
        throw new Error(`Fallo en el proceso de cotización: ${error.message}`);
    }
}













//// end test
/**
 * Obtiene la lista de cotizaciones, filtrando por usuario a menos que sea admin.
 */
async function getQuotations(usuarioId, rolUsuario) {
    if (rolUsuario === 'admin') {
        // ADMIN: Obtiene TODAS las cotizaciones
        return QuotationRepo.getAllQuotations(); 
    } else {
        // USER: Obtiene SOLO las suyas
        return QuotationRepo.getQuotationsByUserId(usuarioId);
    }
}



async function getQuotationDetails(id) {
    return QuotationRepo.getQuotationById(id);
}

async function updateQuotationStatus(id, nuevoEstado) {
    // 💡 Lógica adicional podría ir aquí para restringir quién puede cambiar estados críticos.
    return QuotationRepo.updateQuotationStatus(id, nuevoEstado);
}


/**
 * Permite eliminar (admin) o cancelar (user) una cotización.
 */
async function deleteOrCancelQuotation(cotizacionId, usuarioId, rolUsuario) {
    const cotizacion = await QuotationRepo.getQuotationById(cotizacionId);

    if (!cotizacion) {
        throw new Error("Cotización no encontrada.");
    }
    
    const esPropietario = cotizacion.usuario_id === usuarioId;
    const esAdmin = rolUsuario === 'admin';

    if (esAdmin) {
        // ADMIN: Puede eliminar directamente del sistema
        await QuotationRepo.deleteQuotation(cotizacionId);
        return { message: "Cotización eliminada por administrador." };
    }

    if (esPropietario) {
        // USER: Solo puede "cancelar" si está en estado GENERADA
        if (cotizacion.estado_cotizacion !== 'GENERADA') {
            throw new Error("No tienes permiso para cancelar esta cotización en su estado actual.");
        }
        // El usuario cancela cambiando el estado a 'CANCELADA'
        await QuotationRepo.updateQuotationStatus(cotizacionId, 'CANCELADA');
        return { message: "Cotización cancelada por el usuario." };
    } 
    
    // Si no es ni Admin ni Propietario
    throw new Error("Acceso denegado. No tienes permiso para realizar esta acción.");
}


export {
    generateQuotation,
    getQuotations, // Nuevo para manejar listado por rol
    getQuotationDetails,
    updateQuotationStatus,
    deleteOrCancelQuotation // Nuevo para manejar eliminación/cancelación por rol
};