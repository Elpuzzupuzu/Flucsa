///quotationService.js
import * as QuotationRepo from '../repositories/quotationRepository.js';
import { CarritoRepository } from '../repositories/cartRepository.js'; 

// ==========================================================
// MÉTODOS DE LÓGICA DE NEGOCIO
// ==========================================================

// ==========================================================
// MÉTODOS CRUD (Delegación + RBAC)
// ==========================================================

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
                precio_unitario_aplicado: producto.precio,
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



async function getQuotations(usuarioId, rolUsuario, params) { // <<-- Aceptar params
    // Definir valores por defecto si no vienen en params
    const defaultParams = {
        page: 1,
        pageSize: 5,
        searchTerm: '',
        ...params // Sobreescribir con los valores provistos
    };

    if (rolUsuario === 'admin') {
        // ADMIN: Obtiene TODAS las cotizaciones
        // Retorna { data: [...], count: N }
        return QuotationRepo.getAllQuotations(defaultParams); 
    } else {
        // USER: Obtiene SOLO las suyas
        // Retorna { data: [...], count: N }
        return QuotationRepo.getQuotationsByUserId(usuarioId, defaultParams);
    }
}  //<----------------------------------------------


async function getQuotationDetails(id) {
    return QuotationRepo.getQuotationById(id);
}




async function updateQuotationStatus(id, nuevoEstado) {
    //  Lógica adicional podría ir aquí para restringir quién puede cambiar estados críticos.
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


////// test
async function updateQuotationItems(cotizacionId, itemsNuevos) {
    try {
        // 1️⃣ Cargar ítems actuales
        const itemsActuales = await QuotationRepo.getItemsByQuotationId(cotizacionId);

        const mapActuales = new Map(
            itemsActuales.map(item => [item.producto_id, item])
        );

        const productIdsNuevos = itemsNuevos.map(i => i.producto_id);

        // 2️⃣ Eliminar los que ya no están
        await QuotationRepo.deleteItemsNotInList(cotizacionId, productIdsNuevos);

        // 3️⃣ Procesar ítems uno por uno
        const itemsParaInsertar = [];

        for (const itemNuevo of itemsNuevos) {
            const { producto_id, cantidad, tipo_precio } = itemNuevo;

            // 🔥 Obtener el producto de BD para calcular el precio
            const producto = await QuotationRepo.getProductById(producto_id);

            if (!producto || !producto.precio) {
                throw new Error(`El producto ${producto_id} no tiene precio base.`);
            }

            // 🔥 Reglas TEMPORALES de precio aplicado
            let precioAplicado = producto.precio;

            if (tipo_precio === "mayorista") {
                precioAplicado = producto.precio * 0.9; // regla temporal
            } else if (tipo_precio === "liquidacion") {
                precioAplicado = producto.precio * 0.7; // ejemplo extendido
            }
            // público = precio base

            const existe = mapActuales.has(producto_id);

            if (existe) {
                // 3A - actualizar
                await QuotationRepo.updateQuotationItem(cotizacionId, producto_id, {
                    cantidad,
                    tipo_precio,
                    precio_unitario_aplicado: precioAplicado
                });
            } else {
                // 3B - insertar uno nuevo
                itemsParaInsertar.push({
                    cotizacion_id: cotizacionId,
                    producto_id,
                    nombre_producto: producto.nombre,
                    cantidad,
                    tipo_precio,
                    precio_unitario_aplicado: precioAplicado
                });
            }
        }

        // 4️⃣ Insertar los nuevos ítems
        if (itemsParaInsertar.length > 0) {
            await QuotationRepo.insertQuotationItems(itemsParaInsertar);
        }

        // 5️⃣ Recalcular total
        const cotizacionActualizada = await QuotationRepo.recalculateQuotationTotal(cotizacionId);

        return {
            message: "Ítems actualizados correctamente.",
            cotizacion: cotizacionActualizada
        };

    } catch (error) {
        console.error("Error en updateQuotationItems Service:", error);
        throw new Error(`No se pudo actualizar los ítems: ${error.message}`);
    }
}





export {
    generateQuotation,
    getQuotations,
    getQuotationDetails,
    updateQuotationStatus,
    deleteOrCancelQuotation,
    updateQuotationItems // 👈 nuevo
};
