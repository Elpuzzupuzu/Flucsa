//quotationRepository.js
import { supabase } from '../config/supabaseClient.js';

const TABLA_COTIZACIONES = 'cotizaciones';
const TABLA_COTIZACION_ITEMS = 'cotizaciones_items';
const ESTADOS_VALIDOS = ['GENERADA', 'ACEPTADA', 'RECHAZADA', 'COMPLETADA', 'CANCELADA'];
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




// async function getQuotationsByUserId(usuarioId, params) {
//     // 💡 CAMBIO: Añadir 'status' a la desestructuración
//     const { page, pageSize, searchTerm, status } = params;
    
//     // 1. Calcular OFFSET (Cuántas filas saltar)
//     const offset = (page - 1) * pageSize; 
    
//     // 2. Definir la consulta base (filtrada por usuario)
//     let query = supabase
//         .from(TABLA_COTIZACIONES)
//         .select(`
//             *,
//             ${TABLA_COTIZACION_ITEMS} (*)
//         `, { count: 'exact' }) 
//         .eq('usuario_id', usuarioId); // Filtrado obligatorio por el ID del usuario

//     // 3. Aplicar Filtro de Estado (Nuevo)
//     if (status && status !== 'ALL') {
//         query = query.eq('estado_cotizacion', status);
//     }
    
//     // 4. Aplicar Filtro de Búsqueda
//     if (searchTerm) {
//         // La búsqueda aquí es más simple (por estado o total), pero sigue la lógica de OR.
//         // Nos aseguramos de NO pasar el segundo argumento de opciones para evitar problemas.
//         const isNumber = !isNaN(searchTerm);
        
//         query = query.or(
//             `estado_cotizacion.ilike.%${searchTerm}%,total_cotizado.eq.${isNumber ? parseFloat(searchTerm) : -1}` 
//         );
//         // Nota: Si solo buscas por estado o total, no necesitas el foreignTable.
//     }
    
//     // 5. Aplicar Orden, Paginación (RANGE) y Ejecutar
//     const { data, error, count } = await query
//         .order('fecha_creacion', { ascending: false })
//         .range(offset, offset + pageSize - 1);

//     if (error) {
//         console.error('Error en getQuotationsByUserId:', error);
//         throw new Error(`Error al listar cotizaciones: ${error.message}`);
//     }
    
//     return { data: data || [], count }; 
// }

// async function getAllQuotations(params) {
//     const { page, pageSize, searchTerm } = params;
//     const offset = (page - 1) * pageSize;
    
//     let query = supabase
//         .from(TABLA_COTIZACIONES)
//         .select(`
//             *,
//             ${TABLA_COTIZACION_ITEMS} (*),
//             usuario_id (nombre, apellido, correo)
//         `, { count: 'exact' }); // <<-- IMPORTANTE: Usar count: 'exact'
    
//     // Aplicar Filtro de Búsqueda
//     if (searchTerm) {
//         const isNumber = !isNaN(searchTerm);

//         // Ejemplo: Buscar por estado O por nombre/apellido del usuario
//         query = query.or(
//             `estado_cotizacion.ilike.%${searchTerm}%,usuario_id.nombre.ilike.%${searchTerm}%,usuario_id.apellido.ilike.%${searchTerm}%`,
//             { foreignTable: TABLA_COTIZACIONES }
//         );
//     }

//     // Aplicar Orden, Paginación (RANGE) y Ejecutar
//     const { data, error, count } = await query
//         .order('fecha_creacion', { ascending: false })
//         .range(offset, offset + pageSize - 1);

//     if (error) {
//         console.error('Error en getAllQuotations:', error);
//         throw new Error(`Error al listar todas las cotizaciones: ${error.message}`);
//     }
    
//     // Devolver los datos y el total de registros
//     return { data: data || [], count };
// }


async function getQuotationsByUserId(usuarioId, params) {
    const { page, pageSize, searchTerm, status } = params;
    
    // 1. Calcular OFFSET
    const offset = (page - 1) * pageSize; 
    
    // 2. Definir la consulta base
    let query = supabase
        .from(TABLA_COTIZACIONES)
        .select(`
            *,
            ${TABLA_COTIZACION_ITEMS} (*)
        `, { count: 'exact' }) 
        .eq('usuario_id', usuarioId);

    // 3. Aplicar Filtro de Estado (Filtro exacto por dropdown)
    if (status && status !== 'ALL' && ESTADOS_VALIDOS.includes(status)) {
        query = query.eq('estado_cotizacion', status);
    }
    
    // 4. Aplicar Filtro de Búsqueda (Búsqueda general por texto/número)
    if (searchTerm && searchTerm.trim() !== '') {
        const isNumber = !isNaN(searchTerm);
        const searchTerms = searchTerm.toUpperCase();

        if (isNumber) {
            const numericValue = parseFloat(searchTerm);
            
            //  CAMBIO CLAVE: Usar GTE (mayor o igual) para el intervalo numérico.
            // Si el usuario busca "100", verá todas las >= 100.
            query = query.or(
                `total_cotizado.gte.${numericValue}, estado_cotizacion.ilike.%${searchTerms}%`
            );
            
            // 💡 Alternativa para buscar un RANGO (entre X-10% y X+10% del valor)
            /*
            const low = numericValue * 0.9;
            const high = numericValue * 1.1;
            query = query.or(
                `total_cotizado.gte.${low},total_cotizado.lte.${high},estado_cotizacion.ilike.%${searchTerms}%`
            );
            */
            
        } else {
            // Si es texto, busca por 'estado_cotizacion' (búsqueda parcial)
            query = query.or(`estado_cotizacion.ilike.%${searchTerms}%`);
        }
    }
    
    // 5. Aplicar Orden, Paginación (RANGE) y Ejecutar
    const { data, error, count } = await query
        .order('fecha_creacion', { ascending: false })
        .range(offset, offset + pageSize - 1);

    if (error) {
        console.error('Error en getQuotationsByUserId:', error);
        throw new Error(`Error al listar cotizaciones: ${error.message}`);
    }
    
    return { data: data || [], count }; 
}



// async function getAllQuotations(params) {
//     // 💡 CAMBIO: Añadir 'status' a la desestructuración
//     const { page, pageSize, searchTerm, status } = params;
//     const offset = (page - 1) * pageSize;
    
//     let query = supabase
//         .from(TABLA_COTIZACIONES)
//         .select(`
//             *,
//             ${TABLA_COTIZACION_ITEMS} (*),
//             usuario_id (nombre, apellido, correo)
//         `, { count: 'exact' }); 
    
//     // 1. Aplicar Filtro de Estado (Nuevo)
//     if (status && status !== 'ALL') {
//         query = query.eq('estado_cotizacion', status);
//     }
    
//     // 2. Aplicar Filtro de Búsqueda (Texto, ID, Nombre/Apellido)
//     if (searchTerm) {
//         // CORRECCIÓN CLAVE: 
//         // 1. Nos aseguramos de que la cadena OR esté bien formateada.
//         // 2. Eliminamos el segundo argumento `{ foreignTable: ... }` del .or() que causaba el error de sintaxis.
//         const searchTerms = searchTerm.toLowerCase();

//         query = query.or(
//             `estado_cotizacion.ilike.%${searchTerms}%,usuario_id.nombre.ilike.%${searchTerms}%,usuario_id.apellido.ilike.%${searchTerms}%`
//         );
//     }

//     // 3. Aplicar Orden, Paginación (RANGE) y Ejecutar
//     const { data, error, count } = await query
//         .order('fecha_creacion', { ascending: false })
//         .range(offset, offset + pageSize - 1);

//     if (error) {
//         console.error('Error en getAllQuotations:', error);
//         throw new Error(`Error al listar todas las cotizaciones: ${error.message}`);
//     }
    
//     return { data: data || [], count };
// }
async function getAllQuotations(params) {
    const { page, pageSize, searchTerm, status } = params;
    const offset = (page - 1) * pageSize;

    let query = supabase
        .from(TABLA_COTIZACIONES)
        .select(`
            *,
            ${TABLA_COTIZACION_ITEMS} (*),
            usuario_id (nombre, apellido, correo)
        `, { count: 'exact' });

    // 1. Aplicar Filtro de Estado
    if (status && status !== 'ALL') {
        query = query.eq('estado_cotizacion', status);
    }

    // 2. Aplicar Filtro de Búsqueda (Texto, ID, Nombre/Apellido)
    if (searchTerm && searchTerm.trim() !== '') {
        const searchTerms = searchTerm.toLowerCase();

        // 🔑 CORRECCIÓN CLAVE: Dividir la cláusula OR para manejar la tabla foránea.

        // Filtro OR para la tabla principal (estado_cotizacion)
        query = query.or(`estado_cotizacion.ilike.%${searchTerms}%`);

        // Filtro OR para la relación del usuario, usando el parámetro foreignTable
        const userFilter = `nombre.ilike.%${searchTerms}%,apellido.ilike.%${searchTerms}%`;
        query = query.or(userFilter, { foreignTable: 'usuario_id' });
    }

    // 3. Aplicar Orden, Paginación (RANGE) y Ejecutar
    const { data, error, count } = await query
        .order('fecha_creacion', { ascending: false })
        .range(offset, offset + pageSize - 1);

    if (error) {
        console.error('Error en getAllQuotations:', error);
        throw new Error(`Error al listar todas las cotizaciones: ${error.message}`);
    }

    return { data: data || [], count };
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