// Ruta: src/hooks/Cart/useCartActions.js

import { useDispatch, useSelector } from 'react-redux';
import { 
  addItemToCart, 
  updateCartItemQuantity, 
  removeCartItem 
} from '../../features/cart/cartSlice';
import useNotification from '../Notify/useNotification'; 

export function useCartActions() {
  const dispatch = useDispatch();
  const { notify } = useNotification();

  // Verificación de autenticación
  const isAuthenticated = !!useSelector((state) => state.user.user); 

  /**
   * Agrega un producto al carrito.
   * @param {object} product - El objeto del producto a agregar (debe tener 'id' y 'name' o 'nombre').
   */
  const addToCart = (product) => {
    if (!isAuthenticated) {
      notify('Debes iniciar sesión para agregar productos al carrito. 🛒', 'error');
      return;
    }

    dispatch(addItemToCart({ producto_id: product.id, cantidad: 1 }))
      .unwrap()
      .then(() => {
        notify(`✔️ "${product.name || product.nombre}" agregado al carrito`, 'cart_added');
      })
      .catch(() => {
        notify('❌ Error al agregar el producto al carrito', 'error');
      });
  };

  /**
   * Actualiza la cantidad de un artículo específico en el carrito.
   */
  const updateCartQuantity = (id, quantity) => {
    dispatch(updateCartItemQuantity({ itemId: id, cantidad: quantity }));
  };

  /**
   * Elimina un artículo del carrito.
   */
  const removeFromCart = (id) => {
    dispatch(removeCartItem(id));
    notify('Artículo eliminado del carrito', 'cart_removed');
  };

  // Función placeholder para continuar al checkout
  const handleProceedToCheckout = () => {
    console.log('Proceder a la finalización de la compra.');
  };

  return {
    addToCart,
    updateCartQuantity,
    removeFromCart, // <-- CORREGIDO: devolvemos la función con el nombre correcto
    handleProceedToCheckout
  };
}
