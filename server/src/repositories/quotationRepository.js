//quotationRepository.js
import { supabase } from '../config/supabaseClient.js';

const TABLA_COTIZACIONES = 'cotizaciones';
const TABLA_COTIZACION_ITEMS = 'cotizaciones_items';
const ESTADOS_VALIDOS = ['GENERADA', 'ACEPTADA', 'RECHAZADA', 'COMPLETADA', 'CANCELADA'];
const TABLA_PRODUCTOS = 'productos';
const TABLA_USUARIOS = 'usuarios'
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




//     // 1. OBTENER LA COTIZACIÓN Y LOS ÍTEMS
//     const { data: quotation, error: quotationError } = await supabase
//         .from(TABLA_COTIZACIONES)
//         .select(`
//             *,
//             ${TABLA_COTIZACION_ITEMS} (*)
//         `) // Mantenemos la selección simple de ítems
//         .eq('id', id)
//         .single();

//     if (quotationError && quotationError.code !== 'PGRST116') {
//         console.error('Error al leer la cotización:', quotationError);
//         throw new Error(`Error al leer la cotización: ${quotationError.message}`);
//     }
    
//     if (!quotation) {
//         return null; // Cotización no encontrada
//     }

//     const items = quotation[TABLA_COTIZACION_ITEMS];

//     // 2. EXTRAER IDs DE PRODUCTOS
//     const productIds = items
//         .map(item => item.producto_id)
//         .filter((value, index, self) => self.indexOf(value) === index); // Obtener IDs únicos

//     if (productIds.length === 0) {
//         return quotation; // No hay ítems, retornar la cotización tal cual
//     }

//     // 3. OBTENER LAS IMÁGENES DE LOS PRODUCTOS
//     const { data: products, error: productError } = await supabase
//         .from(TABLA_PRODUCTOS)
//         .select('id, imagen') // Solo necesitamos el ID y la imagen
//         .in('id', productIds); // Usamos .in() para buscar múltiples IDs

//     if (productError) {
//         console.error('Error al leer productos:', productError);
//         // Podrías lanzar un error o simplemente continuar sin las imágenes
//     }

//     // Crear un mapa (diccionario) para acceso rápido {id: imagen}
//     const productMap = (products || []).reduce((map, product) => {
//         map[product.id] = product.imagen;
//         return map;
//     }, {});

//     // 4. FUSIONAR DATOS (Merge)
//     const mergedItems = items.map(item => ({
//         ...item,
//         // Añadir la imagen directamente al ítem de la cotización
//         imagen_producto: productMap[item.producto_id] || null 
//     }));

//     // Reemplazar los ítems antiguos con los ítems fusionados
//     quotation[TABLA_COTIZACION_ITEMS] = mergedItems;
    
//     return quotation;
// }
///testing
/// BUSCAR UNA COTIZACION POR ID ESPECIFICA 

async function getQuotationById(id) {
    // 1. OBTENER LA COTIZACIÓN Y LOS ÍTEMS
    const { data: quotation, error: quotationError } = await supabase
        .from(TABLA_COTIZACIONES)
        .select(`
            *,
            ${TABLA_COTIZACION_ITEMS} (*)
        `)
        .eq('id', id)
        .single();

    if (quotationError && quotationError.code !== 'PGRST116') {
        console.error('Error al leer la cotización:', quotationError);
        throw new Error(`Error al leer la cotización: ${quotationError.message}`);
    }
    
    if (!quotation) {
        return null; // Cotización no encontrada
    }

    // 2. EXTRAER ID DEL USUARIO Y OBTENER SUS DATOS (NOMBRE Y CORREO)
    const userId = quotation.usuario_id;

    if (userId) {
        const { data: userData, error: userError } = await supabase
            .from(TABLA_USUARIOS)
            .select('nombre, correo')
            .eq('id', userId)
            .single();

        if (userError) {
            console.error('Error al leer datos del usuario:', userError);
            // Si hay un error, aún podemos continuar con la cotización
        }
        
        // FUSIONAR DATOS DEL USUARIO
        if (userData) {
            // Se anida la información del usuario en la clave 'usuario'
            quotation.usuario = {
                nombre: userData.nombre || 'N/A',
                correo: userData.correo || 'N/A',
            };
        } else {
            // Si no se encuentra, se añade un objeto vacío para evitar errores en el frontend
             quotation.usuario = { nombre: 'Desconocido', correo: 'N/A' };
        }
    } else {
        // Caso en que ni siquiera hay un usuario_id
        quotation.usuario = { nombre: 'N/A', correo: 'N/A' };
    }
    
    // 3. PROCESAR ÍTEMS DE PRODUCTOS
    const items = quotation[TABLA_COTIZACION_ITEMS];

    // Extraer IDs de productos
    const productIds = items
        .map(item => item.producto_id)
        .filter((value, index, self) => self.indexOf(value) === index); // Obtener IDs únicos

    if (productIds.length === 0) {
        // Retorna la cotización con los datos de usuario recién fusionados
        return quotation;
    }

    // 4. OBTENER LAS IMÁGENES DE LOS PRODUCTOS
    const { data: products, error: productError } = await supabase
        .from(TABLA_PRODUCTOS)
        .select('id, imagen') // Solo necesitamos el ID y la imagen
        .in('id', productIds);

    if (productError) {
        console.error('Error al leer productos:', productError);
    }

    // Crear un mapa para acceso rápido {id: imagen}
    const productMap = (products || []).reduce((map, product) => {
        map[product.id] = product.imagen;
        return map;
    }, {});

    // 5. FUSIONAR DATOS DE PRODUCTOS
    const mergedItems = items.map(item => ({
        ...item,
        // Añadir la imagen al ítem de la cotización
        imagen_producto: productMap[item.producto_id] || null 
    }));

    // Reemplazar los ítems antiguos con los ítems fusionados
    quotation[TABLA_COTIZACION_ITEMS] = mergedItems;
    
    return quotation;
}

///// METODO PARA RETORNAR SOLO LAS DEL USAURIO 

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

/// METODO PARA OBTENER TODAS LAS COTIZACIONES (ADMIN)
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

    // 1. Filtro por Estado
    if (status && status !== 'ALL') {
        query = query.eq('estado_cotizacion', status);
    }

    // 2. Filtro de Búsqueda
    if (searchTerm && searchTerm.trim() !== '') {
        const searchTerms = searchTerm.toLowerCase();

        query = query.or(`estado_cotizacion.ilike.%${searchTerms}%`);

        const userFilter = `nombre.ilike.%${searchTerms}%,apellido.ilike.%${searchTerms}%`;
        query = query.or(userFilter, { foreignTable: 'usuario_id' });
    }

    // 3. Ejecutar consulta con orden y paginación
    const { data, error, count } = await query
        .order('fecha_creacion', { ascending: false })
        .range(offset, offset + pageSize - 1);

    if (error) {
        console.error('Error en getAllQuotations:', error);
        throw new Error(`Error al listar cotizaciones: ${error.message}`);
    }

    const quotations = data || [];

    // =============================
    // 🔥 4. EXTRAER TODOS LOS PRODUCT IDs
    // =============================
    const allItems = quotations.flatMap(q => q[TABLA_COTIZACION_ITEMS] || []);
    const productIds = [...new Set(allItems.map(item => item.producto_id))];

    if (productIds.length === 0) {
        return { data: quotations, count };
    }

    // =============================
    // 🔥 5. OBTENER TODAS LAS IMÁGENES
    // =============================
    const { data: products, error: prodError } = await supabase
        .from(TABLA_PRODUCTOS)
        .select('id, imagen')
        .in('id', productIds);

    if (prodError) {
        console.error('Error al leer productos:', prodError);
    }

    // Diccionario: { product_id: imagen }
    const productMap = (products || []).reduce((acc, p) => {
        acc[p.id] = p.imagen;
        return acc;
    }, {});

    // =============================
    // 🔥 6. FUSIONAR: añadir imagen a cada ítem
    // =============================
    const mergedQuotations = quotations.map(q => ({
        ...q,
        [TABLA_COTIZACION_ITEMS]: q[TABLA_COTIZACION_ITEMS].map(item => ({
            ...item,
            imagen_producto: productMap[item.producto_id] || null
        }))
    }));

    return { data: mergedQuotations, count };
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