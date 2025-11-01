// src/repositories/quotationRepository.js
import { supabase } from '../config/supabaseClient.js';

const TABLA_COTIZACIONES = 'cotizaciones';
const TABLA_COTIZACION_ITEMS = 'cotizaciones_items';

/**
 * Crea la cabecera de la cotización. (CREATE - Parte 1)
 * @param {string} usuarioId - UUID del usuario que cotiza.
 * @param {number} totalCotizado - Total de la cotización.
 * @param {string} carritoIdOrigen - ID del carrito original.
 * @returns {object} La nueva cotización creada (solo el ID).
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
 * Agrega los items congelados a la cotización. (CREATE - Parte 2)
 * @param {Array<object>} items - Lista de ítems de cotización a insertar.
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
 * Obtiene una cotización específica con todos sus ítems. (READ - Detalle)
 * @param {string} id - ID de la cotización.
 * @returns {object} La cotización completa.
 */
async function getQuotationById(id) {
    // PostgREST JOIN implícito para obtener ítems
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

// ==========================================================
// ⭐️ FUNCIÓN FALTANTE QUE CAUSABA EL ERROR ⭐️
// ==========================================================
/**
 * Obtiene todas las cotizaciones de un usuario específico. (READ - Lista)
 * @param {string} usuarioId - ID del usuario.
 * @returns {Promise<Array<object>>} Lista de cotizaciones con sus ítems.
 */
async function getQuotationsByUserId(usuarioId) {
    const { data, error } = await supabase
        .from(TABLA_COTIZACIONES)
        .select(`
            *,
            ${TABLA_COTIZACION_ITEMS} (*)
        `)
        .eq('usuario_id', usuarioId) // FILTRA por el ID del usuario
        .order('fecha_creacion', { ascending: false }); 

    if (error) {
        console.error('Error en getQuotationsByUserId:', error);
        throw new Error(`Error al listar cotizaciones: ${error.message}`);
    }
    return data || []; 
}
// ==========================================================

/**
 * Actualiza el estado de una cotización. (UPDATE)
 * @param {string} id - ID de la cotización a actualizar.
 * @param {string} nuevoEstado - Nuevo estado.
 * @returns {object} La cotización actualizada.
 */
async function updateQuotationStatus(id, nuevoEstado) {
    const { data, error } = await supabase
        .from(TABLA_COTIZACIONES)
        .update({ estado_cotizacion: nuevoEstado })
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
 * Elimina una cotización. (DELETE)
 * @param {string} id - ID de la cotización a eliminar.
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
    getQuotationsByUserId, // <<< ¡LA EXPORTACIÓN CRUCIAL!
    updateQuotationStatus,
    deleteQuotation
};