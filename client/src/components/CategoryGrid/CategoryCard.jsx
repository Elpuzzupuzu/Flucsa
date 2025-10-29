import React from 'react';

// CategoryCard con diseño estilo Amazon - tarjetas con imagen
function CategoryCard({ title, bgColor, textColor, image }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col">
      {/* Imagen de la categoría */}
      <div className="relative h-48 md:h-64 overflow-hidden bg-gray-100">
        <div className={`absolute inset-0 ${bgColor} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Imagen real de la categoría */}
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Título de la categoría */}
      <div className="p-4 bg-white">
        <h3 className="text-gray-900 font-semibold text-lg group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default CategoryCard;