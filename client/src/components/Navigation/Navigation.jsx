import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ isMobile, onLinkClick }) => {
  const commonClasses = "font-medium transition-all duration-300 relative group";
  const mobileClasses = "text-white hover:text-[#ED0000] py-3 px-2 border-b border-white/20 last:border-b-0 block w-full text-left rounded-lg hover:bg-white/10";
  const desktopClasses = "text-white hover:text-white/90 whitespace-nowrap";

  const handleMobileClick = () => {
    if (isMobile && onLinkClick) {
      // Cerrar el menú móvil cuando se hace click en un enlace
      setTimeout(() => onLinkClick(), 150);
    }
  };

  const navItems = [
    { path: "/", label: "Inicio" },
    { path: "/productos", label: "Productos" },
    { path: "/servicios", label: "Servicios" },
    { path: "/acerca-de-nosotros", label: "Nosotros" },
    { path: "/contacto", label: "Contacto" }
  ];

  return (
    <nav className={isMobile ? "flex flex-col space-y-1" : "hidden lg:flex items-center space-x-6"}>
      {navItems.map(({ path, label }) => (
        <NavLink 
          key={path}
          to={path}
          onClick={handleMobileClick}
          className={({ isActive }) => 
            `${commonClasses} ${isMobile ? mobileClasses : desktopClasses} ${
              isActive 
                ? (isMobile 
                    ? 'text-[#ED0000] bg-white/10 border-[#ED0000]' 
                    : 'text-white font-semibold') 
                : ''
            }`
          }
        >
          {label}
          {!isMobile && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#ED0000] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
          )}
        </NavLink>
      ))}

      {/* Botones adicionales comentados - descomenta si los necesitas */}
      {/* 
      {isMobile && (
        <div className="mt-4 pt-4 border-t border-white/20 space-y-2">
          <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Industrial
          </button>
          <button className="w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium">
            Searte
          </button>
        </div>
      )}
      */}
    </nav>
  );
};

export default Navigation;