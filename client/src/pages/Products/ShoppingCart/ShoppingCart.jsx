// import React from 'react';
// import { ShoppingCart as CartIcon, X, Plus, Minus, Trash2 } from 'lucide-react';

// const ShoppingCart = ({ 
//   isOpen, 
//   onClose, 
//   cartItems = [], 
//   onUpdateQuantity, 
//   onRemoveItem,
//   onProceedToCheckout 
// }) => {
//   // Calculate total price
//   const calculateTotal = () => {
//     return cartItems.reduce((sum, item) => {
//       const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   };

//   // Calculate total items
//   const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   const handleQuantityChange = (itemId, newQuantity) => {
//     if (newQuantity < 1) {
//       onRemoveItem(itemId);
//     } else {
//       onUpdateQuantity(itemId, newQuantity);
//     }
//   };

//   const formatPrice = (price) => {
//     const numericPrice = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
//     return `$${numericPrice.toFixed(2)}`;
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" 
//           onClick={onClose} 
//         />
//       )}
      
//       {/* Cart Sidebar */}
//       <div className={`
//         fixed lg:sticky lg:top-24 right-0 h-full lg:h-[calc(100vh-6rem)] w-80 
//         bg-gray-100 border-l border-gray-100 shadow-lg lg:shadow-none 
//         transform transition-transform duration-300 z-50
//         ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
//       `}>
//         <div className="p-6 h-full flex flex-col">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6 lg:mb-4">
//             <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//               <CartIcon className="w-4 h-4" />
//               Carrito ({totalItems})
//             </h3>
//             <button 
//               onClick={onClose} 
//               className="p-1 rounded-md hover:bg-gray-100 lg:hidden transition-colors"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Cart Content */}
//           <div className="flex-1 overflow-y-auto">
//             {cartItems.length === 0 ? (
//               <div className="text-center py-8">
//                 <CartIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-black text-sm mb-2">Tu carrito está vacío</p>
//                 <p className="text-black text-xs">Agrega productos para comenzar tu compra</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {cartItems.map((item) => (
//                   <CartItem
//                     key={item.id}
//                     item={item}
//                     onQuantityChange={handleQuantityChange}
//                     onRemove={onRemoveItem}
//                     formatPrice={formatPrice}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Cart Footer */}
//           {cartItems.length > 0 && (
//             <CartFooter
//               total={calculateTotal()}
//               onProceedToCheckout={onProceedToCheckout}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// // Cart Item Component
// const CartItem = ({ item, onQuantityChange, onRemove, formatPrice }) => {
//   const itemTotal = parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity;

//   return (
//     <div className="bg-gray-50 rounded-lg p-4 transition-all hover:bg-gray-100">
//       <div className="flex gap-3">
//         {/* Product Image */}
//         <div className="flex-shrink-0">
//           <img 
//             src={item.image} 
//             alt={item.name} 
//             className="w-16 h-16 object-cover rounded-lg border border-gray-200" 
//           />
//         </div>

//         {/* Product Info */}
//         <div className="flex-1 min-w-0">
//           <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
//             {item.name}
//           </h4>
          
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-semibold text-blue-600">
//               {formatPrice(item.price)}
//             </span>
//             <span className="text-xs text-gray-500">
//               Total: ${itemTotal.toFixed(2)}
//             </span>
//           </div>

//           {/* Quantity Controls */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <button 
//                 onClick={() => onQuantityChange(item.id, item.quantity - 1)}
//                 className="p-1.5 rounded-md bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
//                 disabled={item.quantity <= 1}
//               >
//                 <Minus className="w-3 h-3" />
//               </button>
              
//               <span className="text-sm font-medium w-8 text-center bg-white px-2 py-1 rounded border border-gray-200">
//                 {item.quantity}
//               </span>
              
//               <button 
//                 onClick={() => onQuantityChange(item.id, item.quantity + 1)}
//                 className="p-1.5 rounded-md bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
//               >
//                 <Plus className="w-3 h-3" />
//               </button>
//             </div>

//             {/* Remove Button */}
//             <button 
//               onClick={() => onRemove(item.id)}
//               className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
//               title="Eliminar producto"
//             >
//               <Trash2 className="w-3 h-3" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Cart Footer Component
// const CartFooter = ({ total, onProceedToCheckout }) => {
//   return (
//     <div className="border-t border-gray-100 pt-4 mt-4 space-y-4">
//       {/* Subtotal */}
//       <div className="space-y-2">
//         <div className="flex justify-between items-center text-sm">
//           <span className="text-gray-600">Subtotal:</span>
//           <span className="font-medium">${total.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between items-center text-sm">
//           <span className="text-gray-600">Envío:</span>
//           <span className="font-medium text-green-600">Gratis</span>
//         </div>
//         <div className="border-t border-gray-200 pt-2">
//           <div className="flex justify-between items-center">
//             <span className="font-semibold text-gray-900">Total:</span>
//             <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
//           </div>
//         </div>
//       </div>

//       {/* Checkout Button */}
//       <button 
//         onClick={onProceedToCheckout}
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group"
//       >
//         <CartIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
//         Proceder al Pago
//       </button>

//       {/* Security Badge */}
//       <div className="text-center">
//         <div className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
//           <span>🔒</span>
//           <span>Compra 100% segura</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShoppingCart;


import React from 'react';
import { ShoppingCart as ShoppingCartIcon, X, Plus, Minus, Trash2 } from 'lucide-react';

const ShoppingCart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) => {
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
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={onClose} 
        />
      )}
      
      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <ShoppingCartIcon className="w-5 h-5" />
              Carrito ({totalItems})
            </h3>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Tu carrito está vacío</p>
                <p className="text-gray-500 text-sm">Agrega productos para comenzar tu compra</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const itemTotal = parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity;
                  return (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-lg" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">
                            {item.name}
                          </h4>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-blue-600">
                              {formatPrice(item.price)}
                            </span>
                            <span className="text-xs text-gray-500">
                              Total: ${itemTotal.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-1 rounded bg-white border hover:bg-gray-50"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-1 rounded bg-white border hover:bg-gray-50"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button 
                              onClick={() => onRemoveItem(item.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
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

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="border-t pt-4 mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-blue-600">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onProceedToCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Proceder al Pago
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;