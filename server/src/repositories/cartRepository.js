import { supabase } from '../config/supabaseClient.js';

export const CarritoRepository = {

    /**
     * Obtiene todos los artículos activos en el carrito de un usuario.
     * Realiza un JOIN con la tabla de productos para obtener detalles.
     * @param {string} usuarioId - El UUID del usuario.
     * @returns {Promise<Array>} Lista de artículos del carrito con detalles de producto.
     */
    getCarritoByUserId: async (usuarioId) => {
        // Seleccionamos los campos del carrito y todos los campos del producto
        const { data, error } = await supabase
            .from('carrito_compras')
            .select(`
                id,
                cantidad,
                agregado_en,
                producto_id,
                productos (
                    id,
                    nombre,
                    precio,
                    stock,
                    url_imagen // Suponiendo que tienes un campo url_imagen
                )
            `)
            .eq('usuario_id', usuarioId)
            .eq('activo', true) // Solo elementos activos en el carrito
            .order('agregado_en', { ascending: false });

        if (error) throw error;
        return data;
    },

    /**
     * Busca un artículo activo específico en el carrito del usuario.
     * @param {string} usuarioId - El UUID del usuario.
     * @param {string} productoId - El UUID del producto.
     * @returns {Promise<Object | null>} El artículo del carrito o null si no existe.
     */
    findActiveItem: async (usuarioId, productoId) => {
        const { data, error } = await supabase
            .from('carrito_compras')
            .select('*')
            .match({ usuario_id: usuarioId, producto_id: productoId, activo: true })
            .maybeSingle();

        if (error) throw error;
        return data;
    },

    /**
     * Agrega un nuevo producto al carrito o lo inserta si ya existe.
     * NOTA: La lógica de la UNICIDAD del producto en el carrito se maneja en el servicio.
     * @param {string} usuarioId - El UUID del usuario.
     * @param {string} productoId - El UUID del producto.
     * @param {number} cantidad - La cantidad inicial.
     * @returns {Promise<Object>} El nuevo registro del carrito.
     */
    addItemToCarrito: async (usuarioId, productoId, cantidad = 1) => {
        const { data, error } = await supabase
            .from('carrito_compras')
            .insert([
                { 
                    usuario_id: usuarioId, 
                    producto_id: productoId, 
                    cantidad: cantidad 
                }
            ])
            .select();
        
        if (error) throw error;

        // Por si se usa `ON CONFLICT` en la base de datos, aunque el servicio lo gestionará
        if (data.length === 0) { 
             throw new Error('El artículo no pudo ser insertado.');
        }

        return data[0];
    },

    /**
     * Actualiza la cantidad de un artículo existente en el carrito.
     * @param {string} itemId - El ID (UUID) del artículo del carrito.
     * @param {number} nuevaCantidad - La nueva cantidad.
     * @returns {Promise<Object>} El registro actualizado del carrito.
     */
    updateItemQuantity: async (itemId, nuevaCantidad) => {
        const { data, error } = await supabase
            .from('carrito_compras')
            .update({ cantidad: nuevaCantidad })
            .eq('id', itemId)
            .select();

        if (error) throw error;
        return data[0];
    },

    /**
     * Elimina un artículo (o establece 'activo' a false) del carrito por su ID.
     * Usaremos DELETE para simplicidad y consistencia con un carrito que aún no es un 'pedido'.
     * @param {string} itemId - El ID (UUID) del artículo del carrito a eliminar.
     */
    removeItemFromCarrito: async (itemId) => {
        // Alternativa: .update({ activo: false })...
        const { error } = await supabase
            .from('carrito_compras')
            .delete()
            .eq('id', itemId);

        if (error) throw error;
        return true;
    },

    /**
     * Vacía todo el carrito de un usuario.
     * @param {string} usuarioId - El UUID del usuario.
     */
    clearCarrito: async (usuarioId) => {
        const { error } = await supabase
            .from('carrito_compras')
            .delete()
            .eq('usuario_id', usuarioId)
            .eq('activo', true);

        if (error) throw error;
        return true;
    }
};