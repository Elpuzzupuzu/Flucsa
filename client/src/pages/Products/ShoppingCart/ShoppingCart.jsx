import React, { useState, useEffect } from 'react';
import { ShoppingCart as ShoppingCartIcon, Loader2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import CartHeader from '../../../pages/Products/ShoppingCart/components/cartHeader';
import CartItem from '../../../pages/Products/ShoppingCart/components/cartItem';
import CartFooter from '../../../pages/Products/ShoppingCart/components/cartFooter';
import { fetchCart } from '../../../features/cart/cartSlice';
import '../../../pages/Products/ShoppingCart/cartAnimations.css';

const ShoppingCart = ({ isOpen, onClose, onProceedToCheckout }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.user);
  const cartItems = useSelector((state) => state.cart.items);
  const cartLoading = useSelector((state) => state.cart.loading);

  // CORRECCIÓN: Recuperar carrito al montar o cuando se abre
  useEffect(() => {
    if (isOpen && user) {
      dispatch(fetchCart());
    }
  }, [isOpen, user, dispatch]);

  // ✅ Cálculo del total
  const calculateTotal = () =>
    cartItems.reduce((sum, item) => {
      const { precio = 0 } = item.producto || {};
      const price = parseFloat(precio) || 0;
      const quantity = item.cantidad || 0;
      return sum + price * quantity;
    }, 0);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.cantidad || 0),
    0
  );

  const formatPrice = (price) => {
    const numeric = parseFloat(price) || 0;
    return `$${numeric.toFixed(2)}`;
  };

  const isLoadingInitialData = cartLoading && cartItems.length === 0;

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-all duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
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
            {isLoadingInitialData ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 text-gray-400 mx-auto animate-spin" />
                <p className="text-gray-500 mt-2">Cargando carrito...</p>
              </div>
            ) : cartItems.length === 0 ? (
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
                {cartItems.map((item, index) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    index={index}
                    formatPrice={formatPrice}
                  />
                ))}
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