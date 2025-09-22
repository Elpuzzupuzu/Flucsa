import React, { useState, useEffect } from 'react';
import { ShoppingCart as ShoppingCartIcon, X, Plus, Minus, Trash2 } from 'lucide-react';

const ShoppingCart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) => {
  const [newlyAddedItems, setNewlyAddedItems] = useState(new Set());
  const [previousItemIds, setPreviousItemIds] = useState(new Set());

  // Detectar nuevos productos añadidos
  useEffect(() => {
    const currentItemIds = new Set(cartItems.map(item => item.id));
    const newItems = new Set();
    
    currentItemIds.forEach(id => {
      if (!previousItemIds.has(id)) {
        newItems.add(id);
      }
    });

    if (newItems.size > 0) {
      setNewlyAddedItems(newItems);
      // Quitar la clase de "nuevo" después de 2 segundos
      setTimeout(() => {
        setNewlyAddedItems(new Set());
      }, 2000);
    }

    setPreviousItemIds(currentItemIds);
  }, [cartItems]); // Solo depende de cartItems

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      return sum + (price * item.quantity);
    }, 0);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      onRemoveItem(itemId);
    } else {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
    return `$${numericPrice.toFixed(2)}`;
  };

  return (
    <>
      {/* Overlay con animación mejorada */}
      {isOpen && (
        <div 
          className={`fixed inset-0 bg-black/50 z-40 transition-all duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose} 
        />
      )}
      
      {/* Cart Sidebar con animación mejorada */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-all duration-300 ease-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 h-full flex flex-col">
          {/* Header con animación del contador */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <ShoppingCartIcon className="w-5 h-5" />
              <span className="transition-all duration-300">
                Carrito (<span className={`${totalItems > 0 ? 'text-blue-600 font-bold' : ''}`}>{totalItems}</span>)
              </span>
            </h3>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="animate-bounce">
                  <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                </div>
                <p className="text-gray-600 mb-2">Tu carrito está vacío</p>
                <p className="text-gray-500 text-sm">Agrega productos para comenzar tu compra</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => {
                  const itemTotal = parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity;
                  const isNewItem = newlyAddedItems.has(item.id);
                  
                  return (
                    <div 
                      key={item.id} 
                      className={`bg-gray-50 rounded-lg p-4 transform transition-all duration-500 hover:shadow-md ${
                        isNewItem 
                          ? 'animate-slide-in-right bg-green-50 border-2 border-green-200 shadow-lg' 
                          : 'animate-fade-in'
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      {/* Badge de "¡Nuevo!" para productos recién añadidos */}
                      {isNewItem && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-bounce">
                          ¡Nuevo!
                        </div>
                      )}
                      
                      <div className="flex gap-3 relative">
                        <div className="relative">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className={`w-16 h-16 object-cover rounded-lg transition-all duration-300 ${
                              isNewItem ? 'ring-2 ring-green-400 ring-offset-1' : ''
                            }`} 
                          />
                          {/* Efecto de brillo para productos nuevos */}
                          {isNewItem && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-lg animate-shine"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-medium text-gray-900 mb-1 transition-colors duration-300 ${
                            isNewItem ? 'text-green-800 font-semibold' : ''
                          }`}>
                            {item.name}
                          </h4>
                          
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-semibold transition-colors duration-300 ${
                              isNewItem ? 'text-green-600' : 'text-blue-600'
                            }`}>
                              {formatPrice(item.price)}
                            </span>
                            <span className={`text-xs transition-colors duration-300 ${
                              isNewItem ? 'text-green-600 font-semibold' : 'text-gray-500'
                            }`}>
                              Total: ${itemTotal.toFixed(2)}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-1 rounded bg-white border hover:bg-gray-50 transition-all duration-200 hover:scale-110 active:scale-95"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className={`text-sm font-medium w-8 text-center transition-all duration-300 ${
                                isNewItem ? 'text-green-700 font-bold scale-110' : ''
                              }`}>
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-1 rounded bg-white border hover:bg-gray-50 transition-all duration-200 hover:scale-110 active:scale-95"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button 
                              onClick={() => onRemoveItem(item.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition-all duration-200 hover:scale-110 active:scale-95"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart Footer con animaciones */}
          {cartItems.length > 0 && (
            <div className="border-t pt-4 mt-4 space-y-4 animate-slide-up">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium transition-all duration-300">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-medium text-green-600 animate-pulse">Gratis</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-blue-600 transition-all duration-300 hover:scale-105">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onProceedToCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Proceder al Pago
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Estilos CSS personalizados para las animaciones */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
        
        .animate-shine {
          animation: shine 1s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ShoppingCart;