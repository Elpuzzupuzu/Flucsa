// quotationService.js

// Importaciones
// NOTA: Re-agregamos la importación de supabase, que aunque no se usa directamente aquí,
// es estándar si el archivo de configuración está en ese path. 
import { supabase } from '../config/supabaseClient.js'; 
import { CarritoRepository } from '../repositories/cartRepository.js'; 
import * as QuotationRepo from '../repositories/quotationRepository.js';

// ==========================================================
// MÉTODOS DE LÓGICA DE NEGOCIO
// ==========================================================

/**
 * Genera una cotización permanente a partir del carrito activo del usuario.
 * @param {string} usuarioId - UUID del usuario solicitante.
 * @returns {Promise<object>} La cotización generada, incluyendo sus ítems.
 */
async function generateQuotation(usuarioId) {
    try {
        // 1. Obtener el ID del carrito activo
        const carritoId = await CarritoRepository.getOrCreateActiveCartId(usuarioId);

        // 2. Obtener Ítems del Carrito con Detalles de Producto
        const carritoItems = await CarritoRepository.getCartItemsByCartId(carritoId);

        if (!carritoItems || carritoItems.length === 0) {
            throw new Error("El carrito activo está vacío. No se puede generar la cotización.");
        }

        let totalCotizado = 0;
        const itemsCotizacion = [];

        // 3. Preparar Datos (Congelar) y Calcular Total
        for (const item of carritoItems) {
            const producto = item.producto;
            
            if (!producto || producto.precio === undefined) {
                throw new Error(`Producto ID ${item.producto_id} no tiene datos de precio válidos.`);
            }

            const subtotal = producto.precio * item.cantidad;
            totalCotizado += subtotal;

            itemsCotizacion.push({
                producto_id: item.producto_id,
                nombre_producto: producto.nombre,     
                precio_unitario: producto.precio,     
                cantidad: item.cantidad,
            });
        }
        
        // --- INICIO DE LA TRANSACCIÓN LÓGICA ---
        
        // 4. Crear Cabecera de la Cotización
        const { id: nuevaCotizacionId } = await QuotationRepo.createQuotation(
            usuarioId, 
            totalCotizado, 
            carritoId
        );
        
        // 5. Vincular y Guardar Ítems Congelados
        const itemsConCotizacionId = itemsCotizacion.map(item => ({
            ...item,
            cotizacion_id: nuevaCotizacionId 
        }));
        
        await QuotationRepo.addQuotationItems(itemsConCotizacionId);
        
        // 6. Finalizar: obtener la cotización completa para la respuesta
        return QuotationRepo.getQuotationById(nuevaCotizacionId); 

    } catch (error) {
        console.error("Error en generateQuotation Service:", error);
        throw new Error(`Fallo en el proceso de cotización: ${error.message}`);
    }
}


// ==========================================================
// MÉTODOS CRUD (Delegación)
// ==========================================================

async function getQuotationDetails(id) {
    return QuotationRepo.getQuotationById(id);
}

/**
 * Obtiene la lista de cotizaciones para un usuario. (AGREGADO)
 */
async function getQuotationsByUserId(usuarioId) {
    if (!usuarioId) {
        throw new Error("Se requiere el ID de usuario para listar las cotizaciones.");
    }
    return QuotationRepo.getQuotationsByUserId(usuarioId);
}

async function updateQuotationStatus(id, nuevoEstado) {
    return QuotationRepo.updateQuotationStatus(id, nuevoEstado);
}

async function deleteQuotation(id) {
    return QuotationRepo.deleteQuotation(id);
}


export {
    generateQuotation,
    getQuotationDetails,
    getQuotationsByUserId, // <<< ¡AHORA SÍ EXPORTADO!
    updateQuotationStatus,
    deleteQuotation
};