import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Settings, 
  Users, 
  Phone
} from 'lucide-react';

const navItems = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/productos", label: "Productos", icon: Package },
  { path: "/servicios", label: "Servicios", icon: Settings },
  { path: "/acerca-de-nosotros", label: "Nosotros", icon: Users },
  { path: "/contacto", label: "Contacto", icon: Phone }
];

const Navigation = ({ isMobile = false, onLinkClick }) => {
  const commonClasses = "font-medium transition-all duration-300 relative group";
  const desktopClasses = "text-white hover:text-white/90 whitespace-nowrap";

  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-4 mt-10">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-white/10 text-[#ED0000]"
                  : "text-white/80 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    );
  }

  // Desktop
  return (
    <nav className="hidden lg:flex items-center space-x-6">
      {navItems.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `${commonClasses} ${desktopClasses} ${
              isActive ? "text-white font-semibold" : ""
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
