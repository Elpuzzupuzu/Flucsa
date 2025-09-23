import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Settings, 
  Users, 
  Phone
} from 'lucide-react';

const Navigation = ({ isMobile, onLinkClick }) => {
  const commonClasses = "font-medium transition-all duration-300 relative group";
  const mobileClasses = "text-white hover:text-[#ED0000] flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-all duration-200";
  const desktopClasses = "text-white hover:text-white/90 whitespace-nowrap";

  const handleMobileClick = () => {
    if (isMobile && onLinkClick) {
      // Cerrar el menú móvil cuando se hace click en un enlace
      setTimeout(() => onLinkClick(), 150);
    }
  };

  const navItems = [
    { path: "/", label: "Inicio", icon: Home },
    { path: "/productos", label: "Productos", icon: Package },
    { path: "/servicios", label: "Servicios", icon: Settings },
    { path: "/acerca-de-nosotros", label: "Nosotros", icon: Users },
    { path: "/contacto", label: "Contacto", icon: Phone }
  ];

  if (isMobile) {
    return (
      <nav className="flex justify-around items-center py-3">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink 
            key={path}
            to={path}
            onClick={handleMobileClick}
            className={({ isActive }) => 
              `flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-[#ED0000] bg-white/10 scale-110' 
                  : 'text-white/70 hover:text-white hover:bg-white/5 hover:scale-105'
              }`
            }
            title={label}
          >
            <Icon size={18} className="drop-shadow-sm" />
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
          </NavLink>
        ))}
      </nav>
    );
  }

  // Desktop version (sin cambios)
  return (
    <nav className="hidden lg:flex items-center space-x-6">
      {navItems.map(({ path, label }) => (
        <NavLink 
          key={path}
          to={path}
          className={({ isActive }) => 
            `${commonClasses} ${desktopClasses} ${
              isActive ? 'text-white font-semibold' : ''
            }`
          }
        >
          {label}
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#ED0000] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;