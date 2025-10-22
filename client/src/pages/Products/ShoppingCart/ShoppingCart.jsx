import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import CartHeader from '../../../pages/Products/ShoppingCart/components/cartHeader';
import CartItem from '../../../pages/Products/ShoppingCart/components/cartItem';
import CartFooter from '../../../pages/Products/ShoppingCart/components/cartFooter';
import {
  updateCartItemQuantity,
  removeCartItem,
} from '../../../features/cart/cartSlice';
import '../../../pages/Products/ShoppingCart/cartAnimations.css';

const ShoppingCart = ({ isOpen, onClose, onProceedToCheckout }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.items); // lista completa de productos

  const [newlyAddedItems, setNewlyAddedItems] = useState(new Set());
  const previousItemIds = useRef([]);

  // Detectar nuevos productos añadidos
  useEffect(() => {
    const currentItemIds = cartItems.map((item) => item.id);
    const newItems = currentItemIds.filter(
      (id) => !previousItemIds.current.includes(id)
    );

    if (newItems.length > 0) {
      console.log('🟢 Nuevos productos añadidos al carrito:', newItems);
      setNewlyAddedItems(new Set(newItems));
      setTimeout(() => setNewlyAddedItems(new Set()), 2000);
    }

    previousItemIds.current = currentItemIds;
  }, [cartItems]);

  // Calcular total basado en item.producto.precio
  const calculateTotal = () =>
    cartItems.reduce((sum, item) => {
      const product = item.producto || products.find((p) => p.id === item.producto_id) || {};
      const price = parseFloat(product.precio || 0) || 0;
      const quantity = item.cantidad || 0;
      return sum + price * quantity;
    }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + (item.cantidad || 0), 0);

  const handleQuantityChange = (itemId, newQuantity) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item) return;

    if (newQuantity < 1) {
      console.log(`🟠 Eliminando producto del carrito: ${item.producto?.nombre || 'Producto'} (ID: ${itemId})`);
      dispatch(removeCartItem(itemId));
    } else {
      console.log(`🔵 Actualizando cantidad de ${item.producto?.nombre || 'Producto'} a ${newQuantity}`);
      dispatch(updateCartItemQuantity({ itemId, cantidad: newQuantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (item) {
      console.log(`🟠 Eliminando producto del carrito: ${item.producto?.nombre || 'Producto'} (ID: ${itemId})`);
      dispatch(removeCartItem(itemId));
    }
  };

  const formatPrice = (price) => {
    const numeric = parseFloat(price) || 0;
    return `$${numeric.toFixed(2)}`;
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-all duration-300 ease-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <CartHeader totalItems={totalItems} onClose={onClose} />

          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="animate-bounce">
                  <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                </div>
                <p className="text-gray-600 mb-2">Tu carrito está vacío</p>
                <p className="text-gray-500 text-sm">
                  Agrega productos para comenzar tu compra
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => {
                  const product = item.producto || products.find((p) => p.id === item.producto_id) || {
                    nombre: 'Producto sin nombre',
                    precio: 0,
                    imagen: '/placeholder.png',
                  };

                  return (
                    <CartItem
                      key={item.id}
                      item={{
                        ...item,
                        producto: product,
                      }}
                      index={index}
                      isNewItem={newlyAddedItems.has(item.id)}
                      onQuantityChange={handleQuantityChange}
                      onRemoveItem={handleRemoveItem}
                      formatPrice={formatPrice}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <CartFooter
              total={calculateTotal()}
              onProceedToCheckout={onProceedToCheckout}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
