import React from 'react';

const Navigation = ({ isMobile, setCurrentPage }) => {
  const commonClasses = "font-medium transition-all duration-300 relative group";
  const mobileClasses = "text-[#1C2E82] hover:text-[#ED0000] py-2 border-b border-slate-200 last:border-b-0";
  const desktopClasses = "text-white hover:text-white/90";

  return (
    <nav className={isMobile ? "flex flex-col space-y-4" : "hidden lg:flex items-center space-x-6"}>
      {/* Items de navegación */}
      <button onClick={() => setCurrentPage('home')} className={`${commonClasses} ${isMobile ? mobileClasses : desktopClasses}`}>
        Inicio
        {!isMobile && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>}
      </button>
      <button onClick={() => setCurrentPage('products')} className={`${commonClasses} ${isMobile ? mobileClasses : desktopClasses}`}>
        Productos
        {!isMobile && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>}
      </button>
      <button className={`${commonClasses} ${isMobile ? mobileClasses : desktopClasses}`}>
        Servicios
        {!isMobile && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>}
      </button>
      <button className={`${commonClasses} ${isMobile ? mobileClasses : desktopClasses}`}>
        Nosotros
        {!isMobile && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>}
      </button>
      <button className={`${commonClasses} ${isMobile ? mobileClasses : desktopClasses}`}>
        Contacto
        {!isMobile && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>}
      </button>
      
      {/* Botones adicionales */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Industrial</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">Searte</button>
    </nav>
  );
};

export default Navigation;
