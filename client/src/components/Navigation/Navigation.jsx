import React from 'react';
import { NavLink } from 'react-router-dom'; // Usa NavLink en lugar de Link

const Navigation = ({ isMobile }) => {
  const commonClasses = "font-medium transition-all duration-300 relative group";
  const mobileClasses = "text-[#1C2E82] hover:text-[#ED0000] py-2 border-b border-slate-200 last:border-b-0";
  const desktopClasses = "text-white hover:text-white/90";

  return (
    <nav className={isMobile ? "flex flex-col space-y-4" : "hidden lg:flex items-center space-x-6"}>
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `${commonClasses} ${isMobile ? mobileClasses : desktopClasses} ${isActive ? (isMobile ? 'text-blue-500' : 'text-white/100') : ''}`
        }
      >
        Inicio
        {!isMobile && <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100`}></span>}
      </NavLink>

      <NavLink 
        to="/productos" 
        className={({ isActive }) => 
          `${commonClasses} ${isMobile ? mobileClasses : desktopClasses} ${isActive ? (isMobile ? 'text-blue-500' : 'text-white/100') : ''}`
        }
      >
        Productos
        {!isMobile && <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100`}></span>}
      </NavLink>
      
      <NavLink 
        to="/servicios" 
        className={({ isActive }) => 
          `${commonClasses} ${isMobile ? mobileClasses : desktopClasses} ${isActive ? (isMobile ? 'text-blue-500' : 'text-white/100') : ''}`
        }
      >
        Servicios
        {!isMobile && <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100`}></span>}
      </NavLink>

      <NavLink 
        to="/acerca-de-nosotros" // CAMBIO CLAVE: Usa la misma ruta que en App.jsx
        className={({ isActive }) => 
          `${commonClasses} ${isMobile ? mobileClasses : desktopClasses} ${isActive ? (isMobile ? 'text-blue-500' : 'text-white/100') : ''}`
        }
      >
        Nosotros
        {!isMobile && <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100`}></span>}
      </NavLink>
      
      <NavLink 
        to="/contacto" 
        className={({ isActive }) => 
          `${commonClasses} ${isMobile ? mobileClasses : desktopClasses} ${isActive ? (isMobile ? 'text-blue-500' : 'text-white/100') : ''}`
        }
      >
        Contacto
        {!isMobile && <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100`}></span>}
      </NavLink>

      {/* Botones adicionales */}
      {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Industrial</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">Searte</button> */}
    </nav>



  );
};

export default Navigation;

