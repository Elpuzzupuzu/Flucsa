//quotationRepository.js
import { supabase } from '../config/supabaseClient.js';

const TABLA_COTIZACIONES = 'cotizaciones';
const TABLA_COTIZACION_ITEMS = 'cotizaciones_items';
const TABLA_USUARIOS = 'usuarios';
/**
 * Crea la cabecera de la cotización.
 */
async function createQuotation(usuarioId, totalCotizado, carritoIdOrigen) {
    const { data, error } = await supabase
        .from(TABLA_COTIZACIONES)
        .insert({
            usuario_id: usuarioId,
            total_cotizado: totalCotizado,
            carrito_id_origen: carritoIdOrigen
        })
        .select('id') 
        .single(); 

    if (error) {
        console.error('Error en createQuotation:', error);
        throw new Error(`Error al crear la cabecera de la cotización: ${error.message}`);
    }
    return data;
}

/**
 * Agrega los items congelados a la cotización.
 */
async function addQuotationItems(items) {
    const { error } = await supabase
        .from(TABLA_COTIZACION_ITEMS)
        .insert(items);

    if (error) {
        console.error('Error en addQuotationItems:', error);
        throw new Error(`Error al agregar los ítems de la cotización: ${error.message}`);
    }
}

/**
 * Obtiene una cotización específica con todos sus ítems.
 */
async function getQuotationById(id) {
    const { data, error } = await supabase
        .from(TABLA_COTIZACIONES)
        .select(`
            *,
            ${TABLA_COTIZACION_ITEMS} (*)
        `)
        .eq('id', id)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Error en getQuotationById:', error);
        throw new Error(`Error al leer la cotización: ${error.message}`);
    }
    return data;
}

/**
 * Obtiene todas las cotizaciones de un usuario específico. (Para roles 'user')
 */
async function getQuotationsByUserId(usuarioId) {
    const { data, error } = await supabase
        .from(TABLA_COTIZACIONES)
        .select(`
            *,
            ${TABLA_COTIZACION_ITEMS} (*)
        `)
        .eq('usuario_id', usuarioId)
        .order('fecha_creacion', { ascending: false }); 

    if (error) {
        console.error('Error en getQuotationsByUserId:', error);
        throw new Error(`Error al listar cotizaciones: ${error.message}`);
    }
    return data || []; 
}

/**
 * Obtiene TODAS las cotizaciones (Solo para uso de Admin) ESTE SE VA A MODIFICAR.
 */

// async function getAllQuotations() {
//     const { data, error } = await supabase
//         .from(TABLA_COTIZACIONES)
//         .select(`
//             *,
//             ${TABLA_COTIZACION_ITEMS} (*)
//         `)
//         .order('fecha_creacion', { ascending: false });

//     if (error) {
//         console.error('Error en getAllQuotations:', error);
//         throw new Error(`Error al listar todas las cotizaciones: ${error.message}`);
//     }
//     return data || [];
// }

async function getAllQuotations() {
    const { data, error } = await supabase
        .from(TABLA_COTIZACIONES)
        .select(`
            *,
            ${TABLA_COTIZACION_ITEMS} (*),
            usuario_id (nombre, apellido, correo)  // <-- ¡USANDO EL NOMBRE DE LA FK!
        `)
        .order('fecha_creacion', { ascending: false });

    if (error) {
        console.error('Error en getAllQuotations:', error);
        throw new Error(`Error al listar todas las cotizaciones: ${error.message}`);
    }
    return data || [];
}







/**
 * Actualiza el estado de una cotización.
 */
async function updateQuotationStatus(id, nuevoEstado) {
    const { data, error } = await supabase
        .from(TABLA_COTIZACIONES)
        .update({ estado_cotizacion: nuevoEstado, fecha_actualizacion: new Date() })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error en updateQuotationStatus:', error);
        throw new Error(`Error al actualizar el estado de la cotización: ${error.message}`);
    }
    return data;
}

/**
 * Elimina una cotización. (Usado principalmente por el admin)
 */
async function deleteQuotation(id) {
    const { error } = await supabase
        .from(TABLA_COTIZACIONES)
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error en deleteQuotation:', error);
        throw new Error(`Error al eliminar la cotización: ${error.message}`);
    }
    return true;
}


export {
    createQuotation,
    addQuotationItems,
    getQuotationById,
    getQuotationsByUserId,
    getAllQuotations, // Exportado para uso admin
    updateQuotationStatus,
    deleteQuotation
};