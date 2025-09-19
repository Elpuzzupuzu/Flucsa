import React from 'react';

const Navigation = () => {
  return (
    <nav className="hidden md:flex items-center space-x-6 text-gray-700 font-semibold">
      <a href="#" className="hover:text-blue-600 transition-colors">Inicio</a>
      <a href="#" className="hover:text-blue-600 transition-colors">Catálogo</a>
      <a href="#" className="hover:text-blue-600 transition-colors">Productos</a>
      <a href="#" className="hover:text-blue-600 transition-colors">Sobre nosotros</a>
      <a href="#" className="hover:text-blue-600 transition-colors">Contacto</a>
      <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Industrial</a>
      <a href="#" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">Searte</a>
    </nav>
  );
}

export default Navigation;