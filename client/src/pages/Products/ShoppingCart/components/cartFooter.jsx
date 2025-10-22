import React from 'react';

const CartFooter = ({ total, onProceedToCheckout }) => (
  <div className="border-t pt-4 mt-4 space-y-4 animate-slide-up">
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Subtotal:</span>
        <span className="font-medium">${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Envío:</span>
        <span className="font-medium text-green-600 animate-pulse">Gratis</span>
      </div>
      <div className="border-t pt-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">Total:</span>
          <span className="text-xl font-bold text-blue-600 hover:scale-105 transition-transform">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>

    <button
      onClick={onProceedToCheckout}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
    >
      Solicitar Cotización
    </button>
  </div>
);

export default CartFooter;
