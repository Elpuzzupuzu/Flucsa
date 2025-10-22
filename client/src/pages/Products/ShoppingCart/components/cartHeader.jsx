import React from 'react';
import { ShoppingCart as ShoppingCartIcon, X } from 'lucide-react';

const CartHeader = ({ totalItems, onClose }) => (
  <div className="flex items-center justify-between mb-6">
    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
      <ShoppingCartIcon className="w-5 h-5" />
      <span>
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
);

export default CartHeader;
