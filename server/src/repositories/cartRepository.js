// src/repositories/carritoRepository.js
import { supabase } from '../config/supabaseClient.js';

export const CarritoRepository = {
    // ==========================================================
    // 1. GESTIÓN DEL ENCABEZADO (La tabla carritos)
    // ==========================================================

    /**
     * Busca el ID del carrito ACTIVO de un usuario. Si no existe, lo crea.
     * @param {string} usuarioId - El UUID del usuario.
     * @returns {Promise<string>} El ID del carrito activo.
     */
    getOrCreateActiveCartId: async (usuarioId) => {
        // 1. Intenta encontrar el carrito activo existente
        let { data: cart, error } = await supabase
            .from('carritos')
            .select('id')
            .eq('usuario_id', usuarioId)
            .eq('activo', true)
            .maybeSingle();

        if (error) throw error;

        if (cart) {
            return cart.id;
        }

        // 2. Si no existe, crea un nuevo carrito activo
        const { data: newCart, error: insertError } = await supabase
            .from('carritos')
            .insert({ usuario_id: usuarioId, activo: true })
            .select('id')
            .single();

        if (insertError) throw insertError;

        return newCart.id;
    },

    // ==========================================================
    // 2. GESTIÓN DE LOS ITEMS (La tabla carrito_items)
    // ==========================================================

    /**
     * Obtiene todos los artículos activos en el carrito, haciendo el JOIN con productos.
     * @param {string} carritoId - El ID del carrito (obtenido de getOrCreateActiveCartId).
     * @returns {Promise<Array>} Lista de artículos del carrito con detalles de producto anidados.
     */
    getCartItemsByCartId: async (carritoId) => {
        const { data: items, error } = await supabase
            .from('carrito_items')
            .select(`
                id,
                cantidad,
                agregado_en,
                producto_id,
                producto:productos ( 
                    id,
                    nombre,
                    precio,
                    existencias,
                    url_imagen:imagen 
                )
            `)
            .eq('carrito_id', carritoId)
            .order('agregado_en', { ascending: false });

        if (error) throw error;
        return items;
    },

    /**
     * Busca un artículo específico en la tabla carrito_items.
     * @param {string} carritoId - El ID del carrito.
     * @param {string} productoId - El UUID del producto.
     * @returns {Promise<Object | null>} El artículo del carrito o null.
     */
    findItemInCart: async (carritoId, productoId) => {
        const { data, error } = await supabase
            .from('carrito_items')
            .select('*')
            .match({ carrito_id: carritoId, producto_id: productoId })
            .maybeSingle();

        if (error) throw error;
        return data;
    },

    /**
     * Inserta un nuevo producto en la tabla carrito_items.
     * @param {string} carritoId - El ID del carrito.
     * @param {string} productoId - El UUID del producto.
     * @param {number} cantidad - La cantidad inicial.
     * @returns {Promise<Object>} El nuevo item insertado, incluyendo datos de producto.
     */
    insertNewCartItem: async (carritoId, productoId, cantidad) => {
        const { data, error } = await supabase
            .from('carrito_items')
            .insert({
                carrito_id: carritoId,
                producto_id: productoId,
                cantidad: cantidad
            })
            .select(`
                id,
                cantidad,
                producto_id,
                producto:productos (
                    id, 
                    nombre, 
                    precio, 
                    existencias,        
                    url_imagen:imagen   
                ) 
            `)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Actualiza la cantidad de un artículo existente y devuelve el ítem con detalles de producto.
     * @param {string} itemId - El ID (UUID) del artículo del carrito.
     * @param {number} nuevaCantidad - La nueva cantidad.
     * @returns {Promise<Object>} El registro actualizado del carrito con datos de producto.
     */
    updateItemQuantity: async (itemId, nuevaCantidad) => {
        const { data, error } = await supabase
            .from('carrito_items')
            .update({ cantidad: nuevaCantidad })
            .eq('id', itemId)
            .select(`
                id,
                cantidad,
                producto_id,
                producto:productos (
                    id, 
                    nombre, 
                    precio, 
                    existencias,        
                    url_imagen:imagen   
                )
            `)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Elimina un artículo de la tabla carrito_items.
     */
    removeItemFromCarrito: async (itemId) => {
        const { error } = await supabase
            .from('carrito_items')
            .delete()
            .eq('id', itemId);

        if (error) throw error;
        return true;
    },

    /**
     * Elimina todos los ítems del carrito principal.
     */
    clearCarritoItems: async (carritoId) => {
        const { error } = await supabase
            .from('carrito_items')
            .delete()
            .eq('carrito_id', carritoId);

        if (error) throw error;
        return true;
    },
    deactivateCart: async (carritoId) => {
        const { error } = await supabase
            .from('carritos')
            .update({ activo: false, finalizado_en: new Date().toISOString() })
            .eq('id', carritoId);

        if (error) throw new Error(`Error al desactivar carrito: ${error.message}`);
        // No devuelve data
    },
};
