import { CarritoService } from '../services/cartService.js';

export const CarritoController = {

    // ===============================
    // 1. GET /carrito
    // ===============================
    getCarrito: async (req, res) => {
        try {
            const userId = req.user.id; // Obtenido del authMiddleware
            const carrito = await CarritoService.getCarrito(userId);
            res.status(200).json(carrito);
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener el carrito' });
        }
    },

    // ===============================
    // 2. POST /carrito/items (Agregar/Incrementar)
    // ===============================
    addItem: async (req, res) => {
        try {
            const userId = req.user.id;
            const { producto_id, cantidad } = req.body;

            if (!producto_id) {
                return res.status(400).json({ error: 'El producto_id es obligatorio.' });
            }

            // `cantidad` es opcional, si no viene, el servicio usará 1.
            const cant = cantidad ? parseInt(cantidad, 10) : 1;
            if (isNaN(cant) || cant <= 0) {
                 return res.status(400).json({ error: 'Cantidad debe ser un número positivo.' });
            }

            const item = await CarritoService.addItem(userId, producto_id, cant);
            // 201 Created es apropiado si se inserta, 200 OK si se actualiza. Usamos 200 por simplicidad
            res.status(200).json({ 
                message: 'Producto agregado/actualizado en el carrito', 
                item 
            });
        } catch (error) {
            console.error('Error al agregar artículo al carrito:', error);
            res.status(400).json({ error: error.message || 'Error al agregar el artículo.' });
        }
    },

    // ===============================
    // 3. PUT /carrito/items/:itemId (Actualizar cantidad)
    // ===============================
    updateItemQuantity: async (req, res) => {
        try {
            const userId = req.user.id;
            const { itemId } = req.params;
            const { cantidad } = req.body;

            const nuevaCantidad = parseInt(cantidad, 10);

            if (!itemId || !cantidad || isNaN(nuevaCantidad)) {
                return res.status(400).json({ error: 'ID del artículo y Cantidad son requeridos y deben ser válidos.' });
            }

            if (nuevaCantidad > 0) {
                const updatedItem = await CarritoService.updateItem(userId, itemId, nuevaCantidad);
                return res.status(200).json({ 
                    message: 'Cantidad del artículo actualizada.', 
                    item: updatedItem 
                });
            } else {
                 // Si la cantidad es 0 o menor, lo tratamos como una eliminación (se maneja en el servicio)
                 await CarritoService.removeItem(userId, itemId);
                 return res.status(200).json({ 
                    message: 'Artículo eliminado del carrito (cantidad <= 0).' 
                });
            }

        } catch (error) {
            console.error('Error al actualizar cantidad del carrito:', error);
            res.status(400).json({ error: error.message || 'Error al actualizar la cantidad.' });
        }
    },

    // ===============================
    // 4. DELETE /carrito/items/:itemId (Eliminar artículo)
    // ===============================
    removeItem: async (req, res) => {
        try {
            const userId = req.user.id;
            const { itemId } = req.params;

            if (!itemId) {
                return res.status(400).json({ error: 'ID del artículo es obligatorio.' });
            }

            await CarritoService.removeItem(userId, itemId);
            res.status(200).json({ message: 'Artículo eliminado del carrito exitosamente.' });
        } catch (error) {
            console.error('Error al eliminar artículo del carrito:', error);
            res.status(500).json({ error: 'Error al eliminar el artículo del carrito.' });
        }
    },

    // ===============================
    // 5. DELETE /carrito (Vaciar Carrito)
    // ===============================
    clearCarrito: async (req, res) => {
        try {
            const userId = req.user.id;
            await CarritoService.clearCarrito(userId);
            res.status(200).json({ message: 'El carrito ha sido vaciado exitosamente.' });
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
            res.status(500).json({ error: 'Error al vaciar el carrito.' });
        }
    }
};