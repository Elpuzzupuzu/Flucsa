 // Ruta sugerida: src/hooks/Cart/useCartActions.js

import { useDispatch, useSelector } from 'react-redux';
// Asegúrate de que estas rutas sean correctas en tu proyecto
import { 
    addItemToCart, 
    updateCartItemQuantity, 
    removeCartItem 
} from '../../features/cart/cartSlice';
import useNotification from '../Notify/useNotification'; // Tu hook de notificación

export function useCartActions() {
    const dispatch = useDispatch();
    const { notify } = useNotification();
    // Obtener isAuthenticated del estado para la verificación
    const isAuthenticated = !!useSelector((state) => state.user.user); 

    /**
     * Agrega un producto al carrito.
     * @param {object} product - El objeto del producto a agregar (debe tener 'id' y 'nombre').
     */
    const addToCart = (product) => {
        if (!isAuthenticated) {
            notify('Debes iniciar sesión para agregar productos al carrito. 🛒', 'error');
            return;
        }

        dispatch(addItemToCart({ producto_id: product.id, cantidad: 1 }))
            .unwrap()
            .then(() => {
                notify(`✔️ "${product.nombre}" agregado al carrito`, 'success');
            })
            .catch((error) => {
                console.error("Error al agregar al carrito:", error);
                notify('❌ Error al agregar el producto al carrito', 'error');
            });
    };

    /**
     * Actualiza la cantidad de un artículo específico en el carrito.
     * @param {string|number} id - El ID del artículo del carrito.
     * @param {number} quantity - La nueva cantidad.
     */
    const updateCartQuantity = (id, quantity) => {
        dispatch(updateCartItemQuantity({ itemId: id, cantidad: quantity }));
    };

    /**
     * Elimina un artículo del carrito.
     * @param {string|number} id - El ID del artículo del carrito a eliminar.
     */
    const removeFromCart = (id) => {
        dispatch(removeCartItem(id));
        // Opcional: añadir una notificación de éxito/confirmación.
        // notify('Artículo eliminado del carrito', 'info');
    };

    // Función placeholder para el checkout (la mantienes para la interfaz)
    const handleProceedToCheckout = () => {
        // Lógica de navegación o inicio del proceso de pago
        console.log("Proceder a la finalización de la compra.");
    };

    return {
        addToCart,
        updateCartQuantity,
        removeFromCart,
        handleProceedToCheckout
    };
}