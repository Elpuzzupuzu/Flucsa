import React from 'react';

const Navigation = ({ isMobile }) => {
  const baseClasses = "text-white font-semibold hover:text-black transition-colors py-2";
  const mobileClasses = "block border-b border-gray-200";

  return (
    <nav className={isMobile ? "flex flex-col space-y-2" : "hidden md:flex items-center space-x-6"}>
      <a href="#" className={isMobile ? `${baseClasses} ${mobileClasses}` : baseClasses}>Inicio</a>
      <a href="#" className={isMobile ? `${baseClasses} ${mobileClasses}` : baseClasses}>Catálogo</a>
      <a href="#" className={isMobile ? `${baseClasses} ${mobileClasses}` : baseClasses}>Productos</a>
      <a href="#" className={isMobile ? `${baseClasses} ${mobileClasses}` : baseClasses}>Sobre nosotros</a>
      <a href="#" className={isMobile ? `${baseClasses} ${mobileClasses}` : baseClasses}>Contacto</a>
      <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Industrial</a>
      <a href="#" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">Searte</a>
    </nav>
  );
};

export default Navigation;