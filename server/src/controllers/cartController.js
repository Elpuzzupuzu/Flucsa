// src/controllers/cartController.js
import { CarritoService } from '../services/cartService.js';

export const CarritoController = {

    // ===============================
    // 1. GET /carrito
    // ===============================
    getCarrito: async (req, res) => {
        try {
            const userId = req.user.id; // Obtenido del authMiddleware
            
            // 💡 PUNTO DE DEPURACIÓN CRÍTICO: Muestra el ID recibido
            console.log('🛒 Controller - Intentando obtener carrito para User ID:', userId); 

            // El servicio ya devuelve el array de ítems con producto anidado
            const carrito = await CarritoService.getCarrito(userId);
            res.status(200).json(carrito);
        } catch (error) {
            console.error('Error al obtener el carrito:', error.message);
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

            const cant = cantidad ? parseInt(cantidad, 10) : 1;
            if (isNaN(cant) || cant <= 0) {
                // El servicio ya valida esto, pero es bueno tenerlo aquí
                return res.status(400).json({ error: 'Cantidad debe ser un número positivo.' });
            }

            // El servicio devuelve el ítem completo y anidado
            const item = await CarritoService.addItem(userId, producto_id, cant); 
            
            res.status(200).json({ 
                message: 'Producto agregado/actualizado en el carrito', 
                item: item // Asegúrate de devolver la clave 'item' si el frontend la usa
            });
        } catch (error) {
            console.error('Error al agregar artículo al carrito:', error);
            // Usar 500 o el código específico de error si se maneja (ej. 409 por stock)
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

            if (!itemId || isNaN(nuevaCantidad) || cantidad === undefined) {
                return res.status(400).json({ error: 'ID del artículo y Cantidad son requeridos y deben ser válidos.' });
            }

            // El servicio maneja la lógica de si la cantidad es <= 0 (eliminar o actualizar)
            const result = await CarritoService.updateItem(userId, itemId, nuevaCantidad);
            
            // Verificamos si el servicio indicó una eliminación
            if (result && result.deleted === true) {
                 return res.status(200).json({ 
                    message: 'Artículo eliminado del carrito (cantidad <= 0).',
                    item: result // Devuelve { id: itemId, deleted: true }
                 });
            }

            // Si no fue una eliminación, fue una actualización exitosa
            return res.status(200).json({ 
                message: 'Cantidad del artículo actualizada.', 
                item: result // Devuelve el ítem actualizado y anidado
            });

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

            // El servicio maneja la eliminación en carrito_items
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
            console.log('🗑️ Controller - Vaciando carrito para User ID:', userId);
            // El servicio vacía todos los ítems de carrito_items
            await CarritoService.clearCarrito(userId);
            res.status(200).json({ message: 'El carrito ha sido vaciado exitosamente.' });
        } catch (error) {
            console.error('Error al vaciar el carrito:', error.message);
            res.status(500).json({ error: 'Error al vaciar el carrito.' });
        }
    }
};