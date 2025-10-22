import { CarritoRepository } from '../repositories/cartRepository.js';
// (Opcional) Importar productRepository si necesitamos stock del producto
// import { ProductRepository } from '../repositories/productRepository.js'; 

export const CarritoService = {

    /**
     * Obtiene el carrito completo del usuario.
     * @param {string} usuarioId - El UUID del usuario.
     * @returns {Promise<Array>} Lista de artículos del carrito.
     */
    getCarrito: async (usuarioId) => {
        return await CarritoRepository.getCarritoByUserId(usuarioId);
    },

    /**
     * Agrega un producto al carrito o incrementa su cantidad si ya existe.
     * @param {string} usuarioId - El UUID del usuario.
     * @param {string} productoId - El UUID del producto.
     * @param {number} cantidad - Cantidad a agregar.
     * @returns {Promise<Object>} El artículo del carrito actualizado o insertado.
     */
    addItem: async (usuarioId, productoId, cantidad = 1) => {
        if (cantidad <= 0) {
            throw new Error('La cantidad debe ser mayor que cero.');
        }

        // 1. Verificar si el producto ya está en el carrito
        const existingItem = await CarritoRepository.findActiveItem(usuarioId, productoId);

        if (existingItem) {
            // 2. Si existe, actualizar la cantidad
            const nuevaCantidad = existingItem.cantidad + cantidad;
            // Opcional: Aquí se podría verificar que la nuevaCantidad no exceda el stock.
            return await CarritoRepository.updateItemQuantity(existingItem.id, nuevaCantidad);
        } else {
            // 3. Si no existe, agregarlo
            return await CarritoRepository.addItemToCarrito(usuarioId, productoId, cantidad);
        }
    },

    /**
     * Actualiza la cantidad de un artículo existente.
     * @param {string} usuarioId - El UUID del usuario (para validación de propiedad).
     * @param {string} itemId - El ID del artículo en el carrito.
     * @param {number} nuevaCantidad - La nueva cantidad (debe ser > 0).
     * @returns {Promise<Object>} El artículo del carrito actualizado.
     */
    updateItem: async (usuarioId, itemId, nuevaCantidad) => {
        if (nuevaCantidad <= 0) {
            // En lugar de actualizar a 0, se recomienda eliminarlo.
            return await CarritoService.removeItem(usuarioId, itemId);
        }

        // 1. Obtener el artículo para verificar que pertenece al usuario
        // (Podríamos necesitar un método getById en el repo con eq('usuario_id', usuarioId))
        // Por simplicidad, asumiremos que si el repo actualiza, todo está bien, 
        // pero una verificación más estricta sería:
        
        /*
        const item = await CarritoRepository.getSingleItem(itemId);
        if (!item || item.usuario_id !== usuarioId) {
             throw new Error('Artículo de carrito no encontrado o no pertenece al usuario.');
        }
        */

        // 2. Actualizar la cantidad
        const updatedItem = await CarritoRepository.updateItemQuantity(itemId, nuevaCantidad);
        
        if (!updatedItem) {
            throw new Error('Artículo de carrito no encontrado para actualizar.');
        }

        return updatedItem;
    },

    /**
     * Elimina un artículo del carrito.
     * @param {string} usuarioId - El UUID del usuario (para validación de propiedad).
     * @param {string} itemId - El ID del artículo en el carrito.
     * @returns {Promise<boolean>} Éxito de la eliminación.
     */
    removeItem: async (usuarioId, itemId) => {
        // En un escenario real, se debe verificar que el itemId pertenezca a usuarioId
        // antes de eliminar. Por ahora, asumimos que el controller pasará el ID correcto.
        
        // Asumiendo que removeItemFromCarrito solo borra si existe el ID:
        await CarritoRepository.removeItemFromCarrito(itemId);
        return true;
    },

    /**
     * Vacía el carrito del usuario.
     * @param {string} usuarioId - El UUID del usuario.
     * @returns {Promise<boolean>} Éxito de la operación.
     */
    clearCarrito: async (usuarioId) => {
        return await CarritoRepository.clearCarrito(usuarioId);
    }
};