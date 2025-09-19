import React from 'react';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div 
      key={product.id} 
      className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 relative"
    >
      {/* Badge condicional para destacar el producto */}
      {product.badge && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
          {product.badge}
        </div>
      )}
      {/* Contenedor de la imagen con efecto al pasar el cursor */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      {/* Contenido de la tarjeta */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {product.name}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-2xl font-black text-blue-600">
            {product.price}
          </span>
          <button 
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105 group"
          >
            Añadir
            <ShoppingCart size={18} className="transform transition-transform duration-200 group-hover:scale-125" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
