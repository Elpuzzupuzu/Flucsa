import { CarritoRepository } from '../repositories/cartRepository.js';

export const CarritoService = {

    /**
     * Obtiene el carrito completo del usuario (Maestro y Detalle).
     * @param {string} usuarioId - El UUID del usuario.
     * @returns {Promise<Array>} Lista de artículos del carrito con producto anidado.
     */
    getCarrito: async (usuarioId) => {
        // 1. Obtener el ID del carrito activo (o crearlo si no existe)
        const carritoId = await CarritoRepository.getOrCreateActiveCartId(usuarioId);
        
        // 2. Usar el ID para obtener todos los ítems con JOIN a productos.
        return await CarritoRepository.getCartItemsByCartId(carritoId);
    },

    /**
     * Agrega un producto al carrito o incrementa su cantidad si ya existe.
     * @param {string} usuarioId - El UUID del usuario.
     * @param {string} productoId - El UUID del producto.
     * @param {number} cantidad - Cantidad a agregar.
     * @returns {Promise<Object>} El artículo del carrito actualizado o insertado (con producto anidado).
     */
    addItem: async (usuarioId, productoId, cantidad = 1) => {
        if (cantidad <= 0) {
            // Ya que 'addItem' está diseñado para agregar, una cantidad inválida es un error.
            throw new Error('La cantidad a agregar debe ser mayor que cero.');
        }

        // 1. Asegurar que tenemos el ID del carrito principal (Maestro)
        const carritoId = await CarritoRepository.getOrCreateActiveCartId(usuarioId);

        // 2. Verificar si el producto ya está en la tabla carrito_items (Detalle)
        const existingItem = await CarritoRepository.findItemInCart(carritoId, productoId);
        
        let resultItem;

        if (existingItem) {
            // 3. Si existe, actualizar la cantidad
            const nuevaCantidad = existingItem.cantidad + cantidad;
            
            // El repositorio devuelve el ítem actualizado con el producto anidado.
            resultItem = await CarritoRepository.updateItemQuantity(existingItem.id, nuevaCantidad);
        } else {
            // 4. Si no existe, agregarlo
            // El repositorio inserta y devuelve el nuevo ítem con el producto anidado.
            resultItem = await CarritoRepository.insertNewCartItem(carritoId, productoId, cantidad);
        }
        
        return resultItem;
    },

    /**
     * Actualiza la cantidad de un artículo existente.
     * @param {string} usuarioId - El UUID del usuario (para validación de propiedad).
     * @param {string} itemId - El ID del artículo en el carrito (de carrito_items).
     * @param {number} nuevaCantidad - La nueva cantidad.
     * @returns {Promise<Object | {id: string, deleted: boolean}>} El artículo actualizado o un indicador de eliminación.
     */
    updateItem: async (usuarioId, itemId, nuevaCantidad) => {
        if (nuevaCantidad <= 0) {
            // Si la cantidad es 0 o menos, lo eliminamos.
            await CarritoService.removeItem(usuarioId, itemId);
            return { id: itemId, deleted: true };
        }

        // 2. Actualizar la cantidad. El repo devolverá el ítem con producto anidado.
        const updatedItem = await CarritoRepository.updateItemQuantity(itemId, nuevaCantidad);
        
        if (!updatedItem) {
            throw new Error('Artículo de carrito no encontrado para actualizar.');
        }

        return updatedItem;
    },

    /**
     * Elimina un artículo del carrito.
     * @param {string} usuarioId - El UUID del usuario.
     * @param {string} itemId - El ID del artículo en el carrito (de carrito_items).
     * @returns {Promise<boolean>} Éxito de la eliminación.
     */
    removeItem: async (usuarioId, itemId) => {
        // En una implementación con RLS en Supabase, la política de seguridad
        // se encargaría de verificar que el usuario sea dueño del item antes de la eliminación.
        await CarritoRepository.removeItemFromCarrito(itemId);
        return true;
    },

    /**
     * Vacía el carrito del usuario.
     * @param {string} usuarioId - El UUID del usuario.
     * @returns {Promise<boolean>} Éxito de la operación.
     */
    clearCarrito: async (usuarioId) => {
        // 1. Obtener el ID del carrito principal
        const carritoId = await CarritoRepository.getOrCreateActiveCartId(usuarioId);
        
        // 2. Eliminar todos los ítems asociados a ese carrito ID
        await CarritoRepository.clearCarritoItems(carritoId);
        
        return true;
    }
};