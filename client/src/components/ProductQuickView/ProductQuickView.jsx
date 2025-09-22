// components/ProductQuickView/ProductQuickView.jsx

import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';

const ProductQuickView = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 rounded-xl shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 z-20">
      <h3 className="text-base font-bold text-gray-900 text-center mb-1">{product.name}</h3>
      <p className="text-xs text-gray-600 text-center mb-2">{product.description}</p>
      <span className="text-xl font-bold text-blue-600 mb-4">{product.price}</span>

      <div className="flex gap-2 w-full">
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="flex-1 flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
        >
          <ShoppingCart size={16} className="mr-1" />
          Añadir
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
          className="flex-1 flex items-center justify-center p-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm"
        >
          <Eye size={16} className="mr-1" />
          Ver más
        </button>
      </div>
    </div>
  );
};

export default ProductQuickView;