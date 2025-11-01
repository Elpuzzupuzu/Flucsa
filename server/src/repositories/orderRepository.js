// src/repositories/orderRepository.js (Anteriormente pedidoRepository.js)

import { supabase } from '../config/supabaseClient.js';

const TABLA_PEDIDOS = 'pedidos';
const TABLA_PEDIDO_ITEMS = 'pedidos_items';
const TABLA_PRODUCTOS = 'productos'; 

// ==========================================================
// MÉTODOS DE ESCRITURA (CREATE/UPDATE)
// ==========================================================

/**
 * 🚨 AJUSTE DE NOMBRE: Renombrada de createPedido a createOrder
 * Crea la cabecera de un nuevo pedido.
 */
async function createOrder(orderData) {
    const { data, error } = await supabase
        .from(TABLA_PEDIDOS)
        .insert(orderData)
        .select('id')
        .single();
    
    if (error) throw new Error(`Error al crear la cabecera del pedido: ${error.message}`);
    return data;
}

/**
 * 🚨 AJUSTE DE NOMBRE: Renombrada de addPedidoItems a addOrderItems
 * Inserta los ítems del pedido.
 */
async function addOrderItems(items) {
    const { error } = await supabase
        .from(TABLA_PEDIDO_ITEMS)
        .insert(items);

    if (error) throw new Error(`Error al agregar los ítems del pedido: ${error.message}`);
    // No devuelve data
}

/**
 * Actualiza el stock de los productos.
 */
async function updateProductStock(productoId, cantidadComprada) {
    // ⚠️ Se recomienda tener esta RPC implementada en Supabase para asegurar atomicidad.
    const { data, error } = await supabase
        .rpc('decrement_product_stock', {
            product_id_input: productoId,
            quantity_to_decrement: cantidadComprada
        });
        
    if (error) throw new Error(`Error al actualizar stock: ${error.message}`);
    return data;
}


// ==========================================================
// MÉTODOS DE LECTURA (READ)
// ==========================================================

/**
 * 🚨 AJUSTE DE NOMBRE: Renombrada de getPedidoById a getOrderById
 * Obtener el detalle de un pedido por ID (con JOIN de items).
 */
async function getOrderById(id) {
    const { data, error } = await supabase
        .from(TABLA_PEDIDOS)
        .select(`
            *,
            ${TABLA_PEDIDO_ITEMS} (*)
        `)
        .eq('id', id)
        .single();
    
    // El error PGRST116 es "No encontrado", lo manejamos silenciosamente
    if (error && error.code !== 'PGRST116') throw new Error(`Error al obtener pedido: ${error.message}`);
    return data;
}

/**
 * Obtiene todos los pedidos (Usado por el servicio para el rol 'admin').
 */
async function getAllOrders() {
    const { data, error } = await supabase
        .from(TABLA_PEDIDOS)
        .select('*')
        .order('fecha_pedido', { ascending: false });

    if (error) throw new Error(`Error al obtener todos los pedidos: ${error.message}`);
    return data;
}

/**
 * Obtiene pedidos por ID de usuario.
 */
async function getOrdersByUserId(userId) {
    const { data, error } = await supabase
        .from(TABLA_PEDIDOS)
        .select('*')
        .eq('usuario_id', userId)
        .order('fecha_pedido', { ascending: false });

    if (error) throw new Error(`Error al obtener pedidos por usuario: ${error.message}`);
    return data;
}

// ==========================================================
// EXPORTS
// ==========================================================
export {
    createOrder,       // Coincide con OrderRepo.createOrder
    addOrderItems,     // Coincide con OrderRepo.addOrderItems
    updateProductStock, // Coincide con OrderRepo.updateProductStock
    getOrderById,      // Coincide con OrderRepo.getOrderById
    getAllOrders,      // Requerido por el servicio
    getOrdersByUserId  // Requerido por el servicio
};
