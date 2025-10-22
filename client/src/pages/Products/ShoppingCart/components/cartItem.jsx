import React from 'react';
import { useDispatch } from 'react-redux';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { updateCartItemQuantity, removeCartItem } from '../../../../features/cart/cartSlice';

const CartItem = ({ item, index, isNewItem, formatPrice }) => {
  const dispatch = useDispatch();

  // Verificar estructura de datos (Puedes comentar o eliminar este console.log en producción)
  console.log(`🧩 CartItem Rendered - index: ${index}`, item);

  // Extraer información desde item.producto
  const product = item.producto || {};
  const priceString = product.precio ? product.precio.toString() : '0';
  const priceValue = parseFloat(priceString.replace(/[^0-9.]/g, '')) || 0;

  // **CORRECCIÓN DE LÓGICA:** Usar SOLO item.cantidad para consistencia
  const quantity = item.cantidad || 1; 
  const itemTotal = priceValue * quantity;

  console.log(`💰 Item Total Calculated: ${itemTotal.toFixed(2)}`);

  const handleQuantityChange = (newQuantity) => {
    console.log(`↔ Quantity Change Requested for item ${item.id}: ${newQuantity}`);
    if (newQuantity < 1) {
      console.log(`🗑️ Dispatching removeCartItem for item ${item.id}`);
      dispatch(removeCartItem(item.id));
    } else {
      console.log(`🔄 Dispatching updateCartItemQuantity for item ${item.id} with cantidad ${newQuantity}`);
      dispatch(updateCartItemQuantity({ itemId: item.id, cantidad: newQuantity }));
    }
  };

  const handleRemove = () => {
    console.log(`❌ Remove Item Clicked: ${item.id}`);
    dispatch(removeCartItem(item.id));
  };

  return (
    <div
      className={`bg-gray-50 rounded-lg p-4 transform transition-all duration-500 hover:shadow-md relative ${
        isNewItem
          ? 'animate-slide-in-right bg-green-50 border-2 border-green-200 shadow-lg'
          : 'animate-fade-in'
      }`}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
    >
      {isNewItem && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-bounce">
          ¡Nuevo!
        </div>
      )}

      <div className="flex gap-3">
        <div className="relative">
          <img
            src={product.imagen || '/placeholder.png'}
            alt={product.nombre || 'Producto sin nombre'}
            className={`w-16 h-16 object-cover rounded-lg transition-all duration-300 ${
              isNewItem ? 'ring-2 ring-green-400 ring-offset-1' : ''
            }`}
          />
          {isNewItem && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-lg animate-shine"></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className={`text-sm font-medium text-gray-900 mb-1 ${
              isNewItem ? 'text-green-800 font-semibold' : ''
            }`}
          >
            {product.nombre || 'Producto sin nombre'}
          </h4>

          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-sm font-semibold ${
                isNewItem ? 'text-green-600' : 'text-blue-600'
              }`}
            >
              {formatPrice ? formatPrice(priceValue) : `$${priceValue.toFixed(2)}`}
            </span>
            <span
              className={`text-xs ${
                isNewItem ? 'text-green-600 font-semibold' : 'text-gray-500'
              }`}
            >
              Total: ${itemTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-1 rounded bg-white border hover:bg-gray-50 transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span
                className={`text-sm font-medium w-8 text-center ${
                  isNewItem ? 'text-green-700 font-bold scale-110' : ''
                }`}
              >
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-1 rounded bg-white border hover:bg-gray-50 transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={handleRemove}
              className="p-1 text-red-500 hover:bg-red-50 rounded transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;